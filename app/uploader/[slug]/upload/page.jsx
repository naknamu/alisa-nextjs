"use client";

import ImagePreview from "@/app/components/ImagePreview";
import style from "./page.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
const _ = require("lodash");
import toast from "react-hot-toast";

export default function Upload({ params }) {
  const router = useRouter();
  // preview image to be uploaded to B2B
  const [previewFile, setPreviewFile] = useState();

  const [caption, setCaption] = useState("");
  const [prompt, setPrompt] = useState("");
  const [categories, setCategories] = useState(null);
  const [chosenCategory, setChosenCategory] = useState([]);
  const [uploader, setUploader] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const uploadImage = async (e) => {
    const { file } = previewFile;

    // slugify the caption to be used as image filename
    const slugCaption = _.kebabCase(caption);

    // // Rename the file before sending if you want
    const fileExt = file.name.substring(file.name.lastIndexOf(".") + 1);
    const fileName = `${slugCaption}.${fileExt}`;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("x-filename", fileName);

    try {
      // Use fetch instead of axios.post
      const response = await fetch(`/api/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      // Assuming the response is JSON, parse it
      const data = await response.json();
      // use the image URL returned from the API response
      const { url } = data;

      return url;
    } catch (err) {
      console.error("Error:", err);
    }

    setPreviewFile();
  };

  useEffect(() => {
    const getCategories = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/`);

      const data = await res.json();

      setCategories(data);
    };

    // fetch uploader details from the API
    const getUploader = async (slug) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/uploaders/` + slug,
        {
          next: {
            revalidate: 0,
          },
        },
      );

      const data = await res.json();

      setUploader(data._id);
    };

    getCategories();
    getUploader(params.slug);
  }, []);

  const handleCaption = (e) => {
    setCaption(e.target.value);
  };

  const handlePrompt = (e) => {
    setPrompt(e.target.value);
  };

  const handleCheckbox = (e) => {
    if (e.target.checked) {
      setChosenCategory((category) => [...category, e.target.value]);
    } else {
      setChosenCategory(
        chosenCategory.filter((category) => category !== e.target.value),
      );
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    // Change uploading status
    setIsUploading(true);

    // Upload image to Backblaze B2
    const source = await uploadImage();

    const image = {
      source,
      caption,
      prompt,
      category: chosenCategory,
      uploader,
    };

    // console.log(image);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/image/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(image),
    });

    if (res.status === 200) {
      toast.success("Uploaded successfully!")
      router.push(`/uploader/${params.slug}`);
      router.refresh();
    }
  };

  return (
    <main>
      <form className={style.form}>
        <h2>Upload Image</h2>
        <ImagePreview
          previewFile={previewFile}
          setPreviewFile={setPreviewFile}
        />

        <div>
          <label className={style.label} htmlFor="caption">
            Caption:
          </label>
          <input
            type="text"
            id="caption"
            name="caption"
            placeholder="A beautiful sunset by the seashore"
            required
            className={style.input}
            onChange={handleCaption}
          />
        </div>

        <div>
          <label className={style.label} htmlFor="prompt">
            Prompt:
          </label>
          <textarea
            type="text"
            id="prompt"
            name="prompt"
            placeholder="A beautiful sunset by the seashore, realistic, cinematic, extremely detailed"
            rows={10}
            className={style.textarea}
            onChange={handlePrompt}
          />
        </div>

        <b>Chooose image category:</b>
        {categories?.map((category) => (
          <div key={category._id} className={style.checkbox}>
            <input
              type="checkbox"
              name={category.name}
              id={category._id}
              value={category._id}
              onChange={handleCheckbox}
            />
            <label htmlFor={category.name}>{category.name}</label>
          </div>
        ))}

        <button
          className={style.button}
          onClick={(e) => {
            handleUpload(e);
          }}
          disabled={
            !previewFile ||
            !caption ||
            !(chosenCategory.length > 0) ||
            isUploading
          }
        >
          {isUploading && <span>Uploading...</span>}
          {!isUploading && <span>Upload Image</span>}
        </button>
      </form>
    </main>
  );
}

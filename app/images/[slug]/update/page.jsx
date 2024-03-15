"use client";

import style from "./page.module.css";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function UpdateImage({ params }) {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [prompt, setPrompt] = useState("");
  const [categories, setCategories] = useState(null);
  const [chosenCategory, setChosenCategory] = useState([]);
  const [uploader, setUploader] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const { data } = useSession();
  const router = useRouter();

  const auth_token = getCookie("auth_token");

  useEffect(() => {
    const getImageDetail = async (slug) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/images/` + slug
      );
      const data = await res.json();
      // Assign inital values to the state
      setImage(data);
      setCaption(data.caption);
      setPrompt(data.prompt);
      // Copy only the category id
      const category_id = data.category.map((category) => category._id);
      setChosenCategory(category_id);
    };

    const getCategories = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/`);
      const data = await res.json();
      setCategories(data);
    };

    // fetch uploader details from the API
    const getUploader = async (slug) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/uploaders/` + slug
      );

      const data = await res.json();

      setUploader(data);
    };

    getImageDetail(params.slug);
    getCategories();
    getUploader(data.user.name);
  }, []);

  const handleCaption = async (e) => {
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
        chosenCategory.filter((category) => category !== e.target.value)
      );
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    const imageDetail = {
      caption,
      prompt,
      category: chosenCategory,
      uploader: uploader._id,
      source: image.source,
      _id: image._id,
    };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/image/${image._id}/update`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth_token}`,
        },
        body: JSON.stringify(imageDetail),
      }
    );

    if (res.status === 200) {
      router.push(`/images/${image.slug}`);
      router.refresh();
    }
  };

  const getImageSource = (image) => {
    if (image.source.includes("backblazeb2.com")) {
      const spliSource = image.source.split("v1/")[1];
      return process.env.NEXT_PUBLIC_IMAGE_CDN + spliSource;
    }
    return "";
  };

  return (
    <main>
      <form className={style.form}>
        <h2>Edit Upload</h2>
        {image && (
          <Image
            className={style.image}
            src={getImageSource(image)}
            alt={image.caption}
            width={"500"}
            height={"300"}
            sizes="100vw"
            priority={true}
          />
        )}
        <div>
          <label className={style.label} htmlFor="caption">
            Caption:
          </label>
          {image && (
            <input
              type="text"
              id="caption"
              name="caption"
              placeholder={image.caption}
              required
              className={style.input}
              onChange={handleCaption}
              defaultValue={image.caption}
            />
          )}
        </div>
        <div>
          <label className={style.label} htmlFor="prompt">
            Prompt:
          </label>
          {image && (
            <textarea
              type="text"
              id="prompt"
              name="prompt"
              placeholder="A beautiful sunset by the seashore, realistic, cinematic, extremely detailed"
              rows={10}
              className={style.textarea}
              onChange={handlePrompt}
              defaultValue={image.prompt}
            />
          )}
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
              checked={chosenCategory.includes(category._id)}
            />
            <label htmlFor={category.name}>{category.name}</label>
          </div>
        ))}
        <button
          className={style.button}
          onClick={(e) => {
            handleUpload(e);
          }}
          disabled={!caption || !(chosenCategory.length > 0) || isUploading}
        >
          {isUploading && <span>Uploading...</span>}
          {!isUploading && <span>Upload Image</span>}
        </button>
      </form>
    </main>
  );
}

"use client";

import ImageUpload from "@/app/components/ImageUpload";
import style from "./page.module.css";
import { useState, useEffect } from "react";

export default function Upload({ params }) {
  // preview image to be uploaded to B2B
  const [previewFile, setPreviewFile] = useState();

  const [source, setSource] = useState("");
  const [caption, setCaption] = useState("");
  const [prompt, setPrompt] = useState("");
  const [categories, setCategories] = useState(null);
  const [uploader, setUploader] = useState("");

  const uploadImage = async (e) => {
    const { file } = previewFile;

    // // Rename the file before sending if you want
    const fileExt = file.name.substring(file.name.lastIndexOf(".") + 1);
    const fileName = `image.${fileExt}`;

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
      // asign the URL to a react state to be sent to the Database
      setSource(url);
    } catch (err) {
      console.error("Error:", err);
    }

    setPreviewFile();
  };

  useEffect(() => {
    const getCategories = async () => {
      const res = await fetch("http://localhost:3000/api/categories/");

      const data = await res.json();

      setCategories(data);
    };

    getCategories();
  }, []);

  const handleUpload = (e) => {
    e.preventDefault();

    // Upload image to Backblaze B2
    uploadImage();
  };

  return (
    <main>
      <form className={style.form}>
        <h2>Upload Image</h2>
        <ImageUpload previewFile={previewFile} setPreviewFile={setPreviewFile} />
        <div>
          <label className={style.label} htmlFor="caption">Caption:</label>
          <input
            type="text"
            id="caption"
            name="caption"
            placeholder="A beautiful sunset by the seashore"
            required
            className={style.input}
          />
        </div>

        <div>
          <label className={style.label} htmlFor="prompt">Prompt:</label>
          <textarea
            type="text"
            id="prompt"
            name="prompt"
            placeholder="A beautiful sunset by the seashore, realistic, cinematic, extremely detailed"
            rows={10}
            className={style.textarea}
          />
        </div>
        
        <label className={style.label}>Chooose image category:</label>
        {categories?.map((category) => (
            <div key={category._id} className={style.checkbox}>
                <input type="checkbox" name={category.name} id={category.name} />
                <label htmlFor={category.name}>{category.name}</label>
            </div>
        ))}

        <button className={style.button}
          onClick={(e) => {
            handleUpload(e);
          }}
        >
          Upload
        </button>
      </form>
    </main>
  );
}

"use client";

import ImageUpload from "@/app/components/ImageUpload";
import style from "./page.module.css";
import { useState, useEffect } from "react";

export default function Upload({ params }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const [source, setSource] = useState("");
  const [caption, setCaption] = useState("");
  const [prompt, setPrompt] = useState("");
  const [categories, setCategories] = useState(null);
  const [uploader, setUploader] = useState("");

  useEffect(() => {
    const getCategories = async() => {
      const res = await fetch("http://localhost:3000/api/categories/");

      const data = await res.json();

      setCategories(data);
    }

    getCategories();
  
  }, [])

  const handleUpload = (e) => {
    e.preventDefault();

    // check URL 
    console.log(source);
  }

  return (
    <main>
      <h2>Upload Image</h2>

      <form className={style.form}>
        
        {/* <input type="text" name="username" className={style.input} /> */}

        {/* <div>
          {selectedImage && (
            <div>
              <img
                alt="no-found"
                width={"250px"}
                src={URL.createObjectURL(selectedImage)}
              />
              <br />
            </div>
          )}
          <input
            type="file"
            name="image"
            id="image"
            onChange={(event) => {
              console.log(event.target.files[0]);
              setSelectedImage(event.target.files[0]);
            }}
          />
        </div> */}

        <ImageUpload setSource={setSource} />

        {/* <div>
          <label htmlFor="caption">Caption:</label>
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
          <label htmlFor="prompt">Prompt:</label>
          <textarea
            type="text"
            id="prompt"
            name="prompt"
            placeholder="A beautiful sunset by the seashore, realistic, cinematic, extremely detailed"
            rows={10}
            className={style.textarea}
          />
        </div>
        
        <h3>Chooose image category:</h3>
        {categories?.map((category) => (
            <div key={category._id} className={style.checkbox}>
                <input type="checkbox" name={category.name} id={category.name} />
                <label htmlFor={category.name}>{category.name}</label>
            </div>
        ))} */}

        <button onClick={(e) => {handleUpload(e)}}>Upload</button>
      </form>

    </main>
  );
}

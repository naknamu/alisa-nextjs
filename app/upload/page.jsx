"use client";

import style from "./page.module.css";
import { useState } from "react";

export default function Upload() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <main>
      <h2>Upload Image</h2>

      <form className={style.form}>
        <div>
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
            name="source"
            id="source"
            onChange={(event) => {
              console.log(event.target.files[0]);
              setSelectedImage(event.target.files[0]);
            }}
          />
        </div>

        <div>
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
        {/* {categories?.map((category) => (
            <div key={category._id} className={style.checkbox}>
                <input type="checkbox" name={category.name} id={category.name} />
                <label htmlFor={category.name}>{category.name}</label>
            </div>
        ))} */}
      </form>

    </main>
  );
}

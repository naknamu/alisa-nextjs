"use client";

import React from "react";
import style from "./Panel.module.css";
import { useRouter } from "next/navigation";

export default function Panel({ image }) {
  const router = useRouter();

  const handleEditImage = () => {
    // CALL UPDATE IMAGE FORM
    router.push(`/images/${image.slug}/update`)
  }

  return (
    <div className={style.container}>
      <div className={style.edit} onClick={handleEditImage}>
        <span className="material-symbols-outlined">edit</span>
        <span>Edit</span>
      </div>
      <div className={style.delete}>
        <span className="material-symbols-outlined">delete</span>
        <span>Delete</span>
      </div>
    </div>
  );
}

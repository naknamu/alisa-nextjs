"use client";

import React, { useState } from "react";
import style from "./Panel.module.css";
import { useRouter } from "next/navigation";
import ConfirmDialog from "./ConfirmDialog";

export default function Panel({ image }) {
  const router = useRouter();
  const [isDialog, setIsDialog] = useState(false);

  const handleEditImage = () => {
    // CALL UPDATE IMAGE FORM
    router.push(`/images/${image.slug}/update`)
  }

  const handleDeleteImage = () => {
    // Enable a dialog confirmation
    setIsDialog(true);
    // Delete image logic
  }

  return (
    <div className={style.container}>
      <div className={style.edit} onClick={handleEditImage}>
        <span className="material-symbols-outlined">edit</span>
        <span>Edit</span>
      </div>
      <div className={style.delete} onClick={handleDeleteImage}>
        <span className="material-symbols-outlined">delete</span>
        <span>Delete</span>
      </div>
      {isDialog && <ConfirmDialog setIsDialog={setIsDialog} image={image} />}
    </div>
  );
}

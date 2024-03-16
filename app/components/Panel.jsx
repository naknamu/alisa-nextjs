"use client";

import React, { useState } from "react";
import style from "./Panel.module.css";
import { useRouter } from "next/navigation";
import ConfirmDialog from "./ConfirmDialog";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

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
        <MdOutlineEdit />
        <span>Edit</span>
      </div>
      <div className={style.delete} onClick={handleDeleteImage}>
        <RiDeleteBin6Line />
        <span>Delete</span>
      </div>
      {isDialog && <ConfirmDialog setIsDialog={setIsDialog} image={image} />}
    </div>
  );
}

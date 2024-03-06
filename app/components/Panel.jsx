import React from "react";
import style from "./Panel.module.css";

export default function Panel() {
  return (
    <div className={style.container}>
      <div className={style.edit}>
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

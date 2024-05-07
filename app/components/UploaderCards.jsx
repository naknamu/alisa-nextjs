import style from "./UploaderCards.module.css";
import Empty from "./Empty";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import ImageCard from "./ImageCard";

export default async function UploaderCards({ images }) {
  return (
    <div className={style.container}>
      <div
        className={
          getCookie("card_view", { cookies }) === "TRUE"
            ? style.card_view
            : style.container
        }
      >
        {images.map((image, index) => (
          <ImageCard key={image._id} image={image} index={index} />
        ))}
      </div>
      <Empty />
    </div>
  );
}

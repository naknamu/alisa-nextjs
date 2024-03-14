"use client";

import { useEffect, useState } from "react";
import style from "./Love.module.css";
import { incrementLove, removeLove, getUploader } from "@/app/actions";
import { useSession } from "next-auth/react";
import { getCookie } from "cookies-next";

export default function Love({ image }) {
  const [isLove, setIsLove] = useState(false);
  const [loveCount, setLoveCount] = useState(0);
  const { data } = useSession();
  const auth_token = getCookie("auth_token");

  useEffect(() => {
    setLoveCount(image.love.length);

    // Check if uploader loved the image
    if (image.love.includes(data.user.name)) {
      setIsLove(true);
    }
  }, []);

  const handleLove = async () => {
    if (!isLove) {
      setLoveCount(loveCount + 1);
      setIsLove(true);
      // POST request to add love
      await incrementLove(data.user.name, image._id, auth_token);
    } else {
      setLoveCount(loveCount - 1);
      setIsLove(false);
      // POST request to delete love
      await removeLove(data.user.name, image._id, auth_token);
    }
  };

  return (
    <div className={style.container}>
      <span
        className={`material-symbols-outlined ${
          isLove ? style.fill_love_icon : style.love_icon
        }`}
        onClick={handleLove}
      >
        favorite
      </span>
      <span>{loveCount}</span>
    </div>
  );
}

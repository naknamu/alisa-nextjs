"use client";

import { useState, useEffect } from "react";
import style from "./BlurToggle.module.css";
import { FaToggleOff, FaToggleOn } from "react-icons/fa6";
import { setCookie, getCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export default function BlurToggle() {
  const [isToogled, setIsToggled] = useState("OFF");
  const router = useRouter();

  useEffect(() => {
    if (getCookie("nsfw") === "ON") {
      setIsToggled(true);
    } else {
      setIsToggled(false);
      setCookie("nsfw", "OFF");
    }
  }, []);

  const handleToggle = () => {
    if (isToogled) {
      setIsToggled(false);
      setCookie("nsfw", "OFF");
    } else {
      setIsToggled(true);
      setCookie("nsfw", "ON");
    }

    router.refresh();
  };

  return (
    <div className={style.container} onClick={() => handleToggle()}>
      {!isToogled && <FaToggleOff className="icon" />}
      {isToogled && <FaToggleOn className="icon" />}
      <p>Display NSFW</p>
    </div>
  );
}

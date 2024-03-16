"use client";

import style from "./ShareBtn.module.css";
import { toast } from "react-hot-toast";
import { IoShareSocialOutline } from "react-icons/io5";

export default function ShareBtn({ image }) {
  const handleShare = () => {
    // Copy URL to Clipboard
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_URL}/images/${image.slug}`
    );
    toast.success("Link copied!");
  };
  return (
    <div className={style.container}>
      <span className="icon" onClick={() => handleShare()}>
       <IoShareSocialOutline />
      </span>
      <p className={style.share_text}>Share</p>
    </div>
  );
}

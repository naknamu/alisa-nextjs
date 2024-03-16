"use client";

import { useEffect, useState } from "react";
import style from "./LoveBtn.module.css";
import { incrementLove, removeLove } from "@/app/actions";
import { useSession } from "next-auth/react";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { toast } from "react-hot-toast";

export default function LoveBtn({ image }) {
  const [isLove, setIsLove] = useState(false);
  const [loveCount, setLoveCount] = useState(0);
  const session = useSession();
  const auth_token = getCookie("auth_token");
  const router = useRouter();

  let name;
  if (session?.data?.user) {
      name = session.data.user.name;
  }

  useEffect(() => {
    setLoveCount(image.love?.length);

    // Check if uploader loved the image
    if (image.love?.includes(name)) {
      setIsLove(true);
    }
  }, []);

  const handleLove = async () => {
    if (!isLove) {
      setLoveCount(loveCount + 1);
      setIsLove(true);
      toast.success("+1 Love");
      // POST request to add love
      await incrementLove(name, image._id, auth_token);
    } else {
      setLoveCount(loveCount - 1);
      setIsLove(false);
      // POST request to delete love
      await removeLove(name, image._id, auth_token);
    }
    router.refresh();
  };

  const handleRedirect = () => {
    // redirect user to sign up page
    router.push("/signup");
  }

  return (
    <div className={style.container}>
      <span className="icon" onClick={() => {name ? handleLove() : handleRedirect()}}>
        {isLove ? <FaHeart /> : <FaRegHeart />}
      </span>
      <span className={style.love_count}>{loveCount}</span>
    </div>
  );
}

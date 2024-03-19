import style from "./ImageCard.module.css";
import DateUploaded from "./DateUploaded";
import MoreHoriz from "./MoreHoriz";
import LoveBtn from "./LoveBtn";
import ShareBtn from "./ShareBtn";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function ImageCard({ image }) {
  const session = useSession();

  const getImageSource = (image) => {
    if (image.source.includes("backblazeb2.com")) {
      const spliSource = image.source.split("v1/")[1];
      return process.env.NEXT_PUBLIC_IMAGE_CDN + spliSource;
    }
    return "";
  };

  return (
    <div className={style.card}>
      <div className={style.header}>
        <div className={style.left_header}>
          <Link href={`/uploader/${image.uploader.slug}`} className="link">
            <p className={style.username}>{image.uploader.username}</p>
          </Link>
          <span>•</span>
          <div className={style.date}>
            <DateUploaded date={image.createdAt} />
          </div>
        </div>
        <div className={style.right_header}>
          {session && <MoreHoriz image={image} />}
        </div>
      </div>
      <h2 className={style.h2}>{image.caption}</h2>
      <Link href={`/images/${image.slug}`}>
        <Image
          className={style.img}
          src={getImageSource(image)}
          alt={image.caption}
          width={"500"}
          height={"300"}
          sizes="(max-width: 768px) 468px, 90.91vw, (max-width: 1200px) 100vw, 468px"
          priority={true}
        />
      </Link>
      <div className={style.footer}>
        <LoveBtn image={image} />
        <ShareBtn image={image} />
      </div>
    </div>
  );
}

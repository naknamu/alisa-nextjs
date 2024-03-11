import Link from "next/link";
import style from "./ImageCards.module.css";
import DateUploaded from "./DateUploaded";
import MoreHoriz from "./MoreHoriz";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function ImageCards({ images }) {
  const session = await getServerSession(authOptions);

  const getImageSource = (image) => {
    if (image.source.includes("backblazeb2.com")) {
      const spliSource = image.source.split("v1/")[1];
      return process.env.NEXT_PUBLIC_IMAGE_CDN + spliSource;
    }
    return "";
  };

  return (
    <div className={style.container}>
      {images.map((image) => (
        <div key={image._id} className={style.card}>
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
          <h3>{image.caption}</h3>
          <Link href={`/images/${image.slug}`}>
            <img
              className={style.img}
              src={getImageSource(image)}
              alt={image.caption}
            />
          </Link>
        </div>
      ))}
    </div>
  );
}

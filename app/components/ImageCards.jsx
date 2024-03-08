"use client"

import Link from "next/link";
import style from "./ImageCards.module.css";
import DateUploaded from "./DateUploaded";
import MoreHoriz from "./MoreHoriz";

import { useSession } from "next-auth/react";
import { useIntersectionObserver } from "@uidotdev/usehooks";

export default function ImageCards({ images }) {

  const { data } = useSession();

  const [ref, entry] = useIntersectionObserver({
    threshold: 0,
    root: null,
    rootMargin: "0px",
  });

  return (
    <div className={style.container} ref={ref}>
      {images.map((image) => (
        <div key={image._id} className={style.card}>
                  {entry?.isIntersecting && (
                    <>
          <div className={style.header}>
            <div className={style.left_header}>
              <Link href={`/uploader/${image.uploader.slug}`} className="link">
                <p className={style.username}>{image.uploader.username}</p>
              </Link>
              <span>•</span>
              <div className={style.date}>
                <DateUploaded date={image.createdAt} />
              </div>
            </div >
            <div className={style.right_header}>
              {data.user.name && <MoreHoriz image={image}/>}
            </div>
          </div>
          <h3>{image.caption}</h3>
          <Link href={`/images/${image.slug}`}>
            <img className={style.img} src={image.source} alt={image.caption} />
          </Link>
          </>)}
        </div>
      ))}
    </div>
  );
}

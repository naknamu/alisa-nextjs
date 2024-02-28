import Link from "next/link"
import style from "./ImageCards.module.css";
import DateUploaded from "./DateUploaded";

export default function ImageCards({ images }) {
  return (
    <div className={style.container}>
      {images.map((image) => (
          <div key={image._id} className={style.card}>
            <span className={style.header}>
              <Link href={`/uploader/${image.uploader.slug}`} className="link">
                <p className={style.username}>{image.uploader.username}</p>
              </Link>
              <span>•</span>
              <div className={style.date}>
                <DateUploaded date={image.createdAt}  />
              </div>
            </span>
            <h3>{image.caption}</h3>
            <Link href={`/images/${image.slug}`}>
              <img
                className={style.img}
                src={image.source}
                alt={image.caption}
              />
            </Link>
          </div>
      ))}
    </div>
  )
}

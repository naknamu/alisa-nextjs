import Link from "next/link"
import style from "./ImageCards.module.css"

export default function ImageCards({ images }) {
  return (
    <div className={style.container}>
      {images.map((image) => (
          <div key={image._id} className={style.card}>
            <Link href={`/uploader/${image.uploader.slug}`} className="link">
              <h3>{image.uploader.username}</h3>
            </Link>
            <p>{image.caption}</p>
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

import Link from "next/link";
import style from "./ImageCards.module.css";
import DateUploaded from "./DateUploaded";
import MoreHoriz from "./MoreHoriz";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// fetch images uploaded by the uploader
async function getUploaderImages(slug) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/images/`, {
    next: {
      revalidate: 0,
    },
  });

  const data = await res.json();

  // filter images uploaded by the uploader
  const images = data.filter((image) => slug === image.uploader.slug);

  return images;
}

export default async function ImageCards({ images }) {

  const session = await getServerSession(authOptions);
  const uploaderName = session?.user?.name;

  const uploaderImages = await getUploaderImages(uploaderName);

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
            </div >
            <div className={style.right_header}>
              {uploaderName && <MoreHoriz image={image}/>}
            </div>
          </div>
          <h3>{image.caption}</h3>
          <Link href={`/images/${image.slug}`}>
            <img className={style.img} src={image.source} alt={image.caption} />
          </Link>
        </div>
      ))}
    </div>
  );
}

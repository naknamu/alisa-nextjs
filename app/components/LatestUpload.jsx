import style from "./LatestUpload.module.css";
import Link from "next/link";
import { getLatestUpload } from "@/app/actions";

export default async function LatestUpload() {
  const latest = await getLatestUpload();

  // Return only five latest images uploaded
  const limitLatest = latest.slice(0, 5);

  return (
    <div className={style.container}>
      <div className={style.content}>
        <b>Latest Uploads</b>
        {limitLatest.map((image) => (
          <div key={image._id} className={style.wrap}>
            <Link href={`/uploader/${image.uploader.slug}`} className="link">
              <b>{image.uploader.username}</b>
            </Link>
            <Link href={`/images/${image.slug}`} className="link">
              <p>{image.caption}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

import ImageCards from "@/app/components/ImageCards";
import style from "@/app/column.module.css";
import styles from "./page.module.css";
import Link from "next/link";
import LatestUpload from "@/app/components/LatestUpload";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// fetch uploader details from the API
async function getUploader(slug) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/uploaders/` + slug,
    {
      next: {
        revalidate: 0,
      },
    }
  );

  return res.json();
}

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

export default async function UploaderDetails({ params }) {
  const uploader = await getUploader(params.slug);

  const uploaderImages = await getUploaderImages(params.slug);

  const session = await getServerSession(authOptions);
  console.log(session?.user?.email);

  return (
    <main className={style.main}>
      <div className={style.left_column}>
        <div className={style.column}>
          <div className={styles.uploader_details}>
            <h3>{uploader.username}</h3>
            <p>{uploader.email}</p>
            {((session?.user?.name === uploader.username) ||
            (session?.user?.name === uploader.email)) 
            && (
              <Link
                href={`/uploader/${uploader.slug}/upload`}
                className="btn_primary"
              >
                <b>Upload Image</b>
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className={style.middle_column}>
        <div className={`${style.middle}`}>
          <ImageCards images={uploaderImages} />
        </div>
      </div>
      <div className={style.right_column}>
        <div className={style.column}>
          <LatestUpload />
        </div>
      </div>
    </main>
  );
}

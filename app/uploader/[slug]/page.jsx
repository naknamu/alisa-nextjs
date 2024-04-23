import style from "@/app/column.module.css";
import styles from "./page.module.css";
import Link from "next/link";
import { getSession, getUploaderImages, getUploader } from "@/app/actions";
import UploaderCards from "@/app/components/UploaderCards";
import BlurToggle from "@/app/components/BlurToggle";
import CardView from "@/app/components/CardView";

export default async function UploaderDetails({ params }) {
  const uploader = await getUploader(params.slug);
  const images = await getUploaderImages(params.slug);
  const session = await getSession();

  return (
    <main className={style.main}>
      <div className={style.left_column}>
        <div className={style.column}>
          <div className={styles.uploader_details}>
            <h3>{uploader.username}</h3>
            {session?.user?.email === uploader.email && (
              <div className={styles.btn_group}>
                {" "}
                <Link
                  href={`/uploader/${uploader.slug}/upload`}
                  className={styles.uploadbtn}
                >
                  <b>Upload Image</b>
                </Link>
                <BlurToggle />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={style.middle_column}>
        <div className={`${style.middle}`}>

          <div className={styles.header}>
            {session?.user?.email === uploader.email && (
              <h3>My Uploads</h3>
            )}
            {session?.user?.email !== uploader.email && (
              <h3>{uploader.username}&#39;s Uploads</h3>
            )}

            <CardView />
          </div>

          {images && <UploaderCards images={images}/>}
        </div>
      </div>
    </main>
  );
}

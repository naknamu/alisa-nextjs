import style from "@/app/column.module.css";
import styles from "./page.module.css";
import Link from "next/link";
import {
  getSession,
  getUploaderImagesPaginated,
  getUploader,
} from "@/app/actions";
import UploaderCards from "@/app/components/UploaderCards";
import BlurToggle from "@/app/components/BlurToggle";

const INITIAL_NUMBER_OF_IMAGES = parseInt(
  process.env.NEXT_PUBLIC_INITIAL_NUMBER,
);

export default async function UploaderDetails({ params }) {
  const uploader = await getUploader(params.slug);

  const uploaderImages = await getUploaderImagesPaginated(
    params.slug,
    0,
    INITIAL_NUMBER_OF_IMAGES,
  );

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
          {session?.user?.email === uploader.email && (
            <h3 className="title">My Uploads</h3>
          )}
          {session?.user?.email !== uploader.email && (
            <h3 className="title">{uploader.username}&#39;s Uploads</h3>
          )}

          {uploaderImages && (
            <UploaderCards initialImages={uploaderImages} slug={params.slug} />
          )}
          {/* {uploaderImages.length === 0 && (
            <span className={styles.empty}>No images uploaded yet. 😢</span>
          )} */}
        </div>
      </div>
    </main>
  );
}

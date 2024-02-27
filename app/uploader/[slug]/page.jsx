import ImageCards from "@/app/components/ImageCards";
import style from "@/app/column.module.css"

// fetch uploader details from the API
async function getUploader(slug) {
  const res = await fetch("http://localhost:3000/api/uploaders/" + slug, {
    next: {
      revalidate: 0,
    },
  });

  return res.json();
}

// fetch images uploaded by the uploader
async function getUploaderImages(slug) {
  const res = await fetch("http://localhost:3000/api/images/", {
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

  return (
    <main className={style.main}>
      <div className={style.left_column}>
        <div className={style.column}>
          <h3>{uploader.username}</h3>
          <p>{uploader.email}</p>
        </div>
      </div>
      <div className={style.middle_column}>
        <div className={`${style.middle}`}>
          <ImageCards images={uploaderImages} />
        </div>
      </div>
      <div className={style.right_column}>
        <div className={style.column}>Column 2</div>
      </div>
    </main>
  );
}

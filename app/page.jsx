import api from "@/config";
import Categories from "./components/Categories";
import style from "./column.module.css";
import ImageCards from "./components/ImageCards";
import LatestUpload from "./components/LatestUpload";

// fetch images from the API
async function getImages() {

  const res = await fetch(`${api.url}/images`, {
    next: {
      revalidate: 10,
    },
  });

  return res.json();
}

export default async function Home() {
  const images = await getImages();

  return (
    <main className={style.main}>
      <div className={style.left_column}>
        <div className={style.column}>
          <Categories />
        </div>
      </div>
      <div className={style.middle_column}>
        <div className={`${style.middle}`}>
          <ImageCards images={images} />
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

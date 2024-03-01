import Categories from "./components/Categories";
import style from "./column.module.css";
import ImageCards from "./components/ImageCards";
import LatestUpload from "./components/LatestUpload";
import { getCookie, deleteCookie } from "cookies-next";
import { cookies } from 'next/headers';

// fetch images from the API
async function getImages() {

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/images`, {
    next: {
      revalidate: 60,
    },
  });

  return res.json();
}

export default async function Home() {
  const images = await getImages();

  // const cookie = getCookie('test', { cookies });

  // console.log("The cookie is: " + cookie);


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

import CategoryBtn from "./components/CategoryBtn";
import style from "./column.module.css";
import ImageCards from "./components/ImageCards";
import LatestUpload from "./components/LatestUpload";

// fetch images from the API
async function getImages() {

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/images`, {
    next: {
      revalidate: 60,
    },
  });

  return res.json();
}

// fetch categories from API
async function getCategories() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`);

  return res.json();
}


export default async function Home() {
  const images = await getImages();
  const categories = await getCategories();

  return (
    <main className={style.main}>
      <div className={style.left_column}>
        <div className={style.column}>
          <CategoryBtn categories={categories} />
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

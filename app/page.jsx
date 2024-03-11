import CategoryBtn from "./components/CategoryBtn";
import style from "./column.module.css";
import ImageCards from "./components/ImageCards";
import LatestUpload from "./components/LatestUpload";
import ProfileBtn from "./components/ProfileBtn";
import Footer from "./components/Footer";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// fetch images from the API
async function getImages() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/images`, {
    next: {
      revalidate: 60,
    },
  });

  // console.log(process.env.NEXT_PUBLIC_API_URL);

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

  const session = await getServerSession(authOptions);
  const uploaderName = session?.user?.name;

  return (
    <main className={style.main}>
      <div className={style.left_column}>
        <div className={style.column}>
          {uploaderName && <ProfileBtn uploaderName={uploaderName} />}
          <CategoryBtn categories={categories} />
          <Footer />
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

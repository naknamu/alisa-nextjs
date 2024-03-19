import CategoryBtn from "./components/CategoryBtn";
import style from "./column.module.css";
import ImageCards from "./components/ImageCards";
import LatestUpload from "./components/LatestUpload";
import ProfileBtn from "./components/ProfileBtn";
import Footer from "./components/Footer";
import { getCategories, getSession, getImagesPaginated } from "./actions";

const INITIAL_NUMBER_OF_IMAGES = parseInt(
  process.env.NEXT_PUBLIC_INITIAL_NUMBER
);

export default async function Home() {
  const initialImages = await getImagesPaginated(0, INITIAL_NUMBER_OF_IMAGES);
  const categories = await getCategories();
  const session = await getSession();
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
          <ImageCards initialImages={initialImages} />
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

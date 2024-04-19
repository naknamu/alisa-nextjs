import CategoryBtn from "@/app/components/CategoryBtn";
import style from "@/app/column.module.css";
import ProfileBtn from "@/app/components/ProfileBtn";
import Footer from "@/app/components/Footer";
import { getImagesByCategory, getSession, getCategories } from "@/app/actions";
import CategoryCards from "@/app/components/CategoryCards";

export default async function Category({ params }) {
  const images = await getImagesByCategory(params.slug);
  const categories = await getCategories();

  // Convert slug to category name
  const title = params.slug.replace(/-/g, " ").toUpperCase();

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
          <h2 className="title">{title}</h2>
          {images && (
            <CategoryCards images={images} />
          )}
        </div>
      </div>
    </main>
  );
}

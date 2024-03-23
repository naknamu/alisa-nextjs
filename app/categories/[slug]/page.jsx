import CategoryBtn from "@/app/components/CategoryBtn";
import style from "@/app/column.module.css";
import ProfileBtn from "@/app/components/ProfileBtn";
import Footer from "@/app/components/Footer";
import { getImagesByCategoryPaginated, getSession } from "@/app/actions";
import CategoryCards from "@/app/components/CategoryCards";

const INITIAL_NUMBER_OF_IMAGES = parseInt(
  process.env.NEXT_PUBLIC_INITIAL_NUMBER,
);

export async function generateStaticParams() {
  const categories = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/categories`,
  ).then((res) => res.json());

  return categories.map((category) => ({
    slug: category.slug,
  }));
}

// fetch categories from API
async function getCategories() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
    next: {
      revalidate: 60 * 60 * 24 * 7, // 1 week
    },
  });

  return res.json();
}

export default async function Category({ params }) {
  const images = await getImagesByCategoryPaginated(
    params.slug,
    0,
    INITIAL_NUMBER_OF_IMAGES,
  );
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
            <CategoryCards initialImages={images} slug={params.slug} />
          )}
        </div>
      </div>
    </main>
  );
}

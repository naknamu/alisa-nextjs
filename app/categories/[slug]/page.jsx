import CategoryBtn from "@/app/components/CategoryBtn";
import style from "@/app/column.module.css";
import styles from "./page.module.css";
import ImageCards from "@/app/components/ImageCards";
import LatestUpload from "@/app/components/LatestUpload";
import ProfileBtn from "@/app/components/ProfileBtn";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Footer from "@/app/components/Footer";

export async function generateStaticParams() {
  const categories = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`).then((res) => res.json())
 
  return categories.map((category) => ({
    slug: category.slug,
  }))
}

// fetch images uploaded by category
async function getImagesByCategory(slug) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/images/`, {
    next: {
      revalidate: 60,
    },
  });

  const data = await res.json();

  // filter images uploaded by category
  const images = data.filter((image) =>
    image.category.some((category) => slug === category.slug),
  );

  return images;
}

// fetch categories from API
async function getCategories() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
    next: {
      revalidate: 60,
    },
  });

  return res.json();
}

export default async function Category({ params }) {
  const images = await getImagesByCategory(params.slug);
  const categories = await getCategories();

  // Convert slug to category name
  const title = params.slug.replace(/-/g, " ").toUpperCase();

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
          <h2 className="title">{title}</h2>
          {images && <ImageCards images={images} />}
          {images.length === 0 && (
            <span className={styles.empty}>
              No images uploaded yet. 😢
              <br />
              <br />
              Please log in to upload an image. 🥺🙏
              </span>
          )}
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

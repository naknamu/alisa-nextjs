import CategoryBtn from "@/app/components/CategoryBtn";
import style from "@/app/column.module.css";
import styles from "./page.module.css"
import ImageCards from "@/app/components/ImageCards";
import LatestUpload from "@/app/components/LatestUpload";

// fetch images uploaded by category
async function getImagesByCategory(slug) {
    const res = await fetch("http://localhost:3000/api/images/", {
      next: {
        revalidate: 60 * 15,
      }
    });
  
    const data = await res.json();

    // filter images uploaded by category
    const images = data.filter((image) => 
        image.category.some((category) => slug === category.slug)
    );

    return images;
}

// fetch categories from API
async function getCategories() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`);

  return res.json();
}

export default async function Category({ params }) {

  const images = await getImagesByCategory(params.slug);
  const categories = await getCategories();

  // Convert slug to category name
  const title = params.slug.replace(/-/g, ' ').toUpperCase();;

  return (
    <main className={style.main}>
      <div className={style.left_column}>
        <div className={style.column}>
          <CategoryBtn categories={categories} />
        </div>
      </div>
      <div className={style.middle_column}>
        <div className={`${style.middle}`}>
            <h2>{title}</h2>
            {images && <ImageCards images={images} />}
            {images.length === 0 && <span className={styles.empty}>No images uploaded yet. 😢</span>}
        </div>
      </div>
      <div className={style.right_column}>
        <div className={style.column}>
            <LatestUpload />
        </div>
      </div>
    </main>
  )
}

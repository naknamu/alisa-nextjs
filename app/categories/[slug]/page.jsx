import Categories from "@/app/components/Categories";
import style from "@/app/column.module.css";
import ImageCards from "@/app/components/ImageCards";

// fetch images uploaded by category
async function getImagesByCategory(slug) {
    const res = await fetch("http://localhost:3000/api/images/", {
      next: {
        revalidate: 10,
      }
    });
  
    const data = await res.json();

    // filter images uploaded by category
    const images = data.filter((image) => 
        image.category.some((category) => slug === category.slug)
    );

    return images;
}

export default async function Category({ params }) {

    const images = await getImagesByCategory(params.slug);

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
            Right Column
        </div>
      </div>
    </main>
  )
}

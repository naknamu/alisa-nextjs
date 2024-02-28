import style from "./Categories.module.css";
import CategoryBtn from "./CategoryBtn";

export default async function Categories() {

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
    const categories = await res.json();

  return (
    <div>
      <div className={style.container}>
          <h3>Categories</h3>
          <CategoryBtn categories={categories} />
      </div>
    </div>
  )
}

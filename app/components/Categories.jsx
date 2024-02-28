import style from "./Categories.module.css";
import CategoryBtn from "./CategoryBtn";

export default async function Categories() {

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
    const categories = await res.json();

  return (
    <div>
      <div className={style.container}>
          <b>Categories</b>
          <CategoryBtn categories={categories} />
      </div>
    </div>
  )
}

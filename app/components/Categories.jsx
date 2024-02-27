import api from "@/config"
import style from "./Categories.module.css"
import Link from "next/link";

export default async function Categories() {

    const res = await fetch(`${api.url}/categories`);
    const categories = await res.json();

  return (
    <div>
      <div className={style.container}>
          <b>Categories</b>
          <div className={style.categories}>
              {categories.map((category) => 
                <button key={category._id}>
                  <Link href={`/categories/${category.slug}`}>{category.name}</Link>
                </button>
              )}
          </div>
      </div>
    </div>
  )
}

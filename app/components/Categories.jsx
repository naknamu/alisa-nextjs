import api from "@/config"
import style from "./Categories.module.css"
import Link from "next/link";
import CategoryBtn from "./CategoryBtn";

export default async function Categories() {

    const res = await fetch(`${api.url}/categories`);
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

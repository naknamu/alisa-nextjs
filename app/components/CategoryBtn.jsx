import style from "./CategoryBtn.module.css";
import Link from "next/link";

export default function CategoryBtn({ categories }) {
  return (
    <div className={style.container}>
      <b>Categories</b>
      <div className={style.categorybtn}>
        {categories.map((category) => 
          <button key={category._id} className="btn_primary">
            <Link href={`/categories/${category.slug}`}>{category.name}</Link>
          </button>
        )}
      </div>

    </div>
  )
}

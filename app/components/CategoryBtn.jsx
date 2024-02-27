import style from "./CategoryBtn.module.css";
import Link from "next/link";

export default function CategoryBtn({ categories }) {
  return (
    <div>
      <div className={style.categories}>
              {categories.map((category) => 
                <button key={category._id}>
                  <Link href={`/categories/${category.slug}`}>{category.name}</Link>
                </button>
              )}
      </div>
    </div>
  )
}

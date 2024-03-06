import style from "./CategoryBtn.module.css";
import Link from "next/link";

export default function CategoryBtn({ categories }) {
  return (
    <div className={style.container}>
      {/* <b>Categories</b> */}
      <div className={style.categorybtn}>
        {categories.map((category) => (
          <div key={category._id}>
            <Link
              href={`/categories/${category.slug}`}
              className={style.category}
            >
              <b>{category.name}</b>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

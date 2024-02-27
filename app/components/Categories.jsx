import api from "@/config"
import style from "./Categories.module.css"

export default async function Categories() {

    const res = await fetch(`${api.url}/api/categories`)
    const categories = await res.json();

  return (
    <div>
      <div className={style.container}>
          <b>Categories</b>
          <div className={style.categories}>
              {categories.map((category) => 
                <p key={category._id}>{category.name}</p>
              )}
          </div>
      </div>
    </div>
  )
}

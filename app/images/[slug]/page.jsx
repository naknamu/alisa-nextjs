import CategoryBtn from "@/app/components/CategoryBtn";
import style from "./page.module.css"
import Link from "next/link";

// fetch image detail from the API
async function getImageDetail(slug) {
    const res = await fetch("http://localhost:3000/api/images/" + slug, {
      next: {
        revalidate: 60,
      }
    });
  
    return res.json();
}
  

export default async function ImageDetail({ params }) {
    const image = await getImageDetail(params.slug);

    return (
        <div className={style.container}>
            <div className={style.image_wrap}>
             <img src={`${image.source}`} alt={`${image.slug}`} className={style.image} />
            </div>
            <div className={style.detail_wrap}>
                <Link href={`/uploader/${image.uploader.slug}`} className="link">
                    <h3>{image.uploader.username}</h3>
                </Link>
                <div>{image.caption}</div>
                <div className={style.prompt}>
                    <b>Prompt:</b>
                    <p>{image.prompt}</p>
                </div>
                <CategoryBtn categories={image.category} />
            </div>
        </div>
    )
}

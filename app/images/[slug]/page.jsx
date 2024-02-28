import CategoryBtn from "@/app/components/CategoryBtn";
import style from "./page.module.css"
import Link from "next/link";
import DateUploaded from "@/app/components/DateUploaded";

// fetch image detail from the API
async function getImageDetail(slug) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/images/` + slug, {
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
                <div className={style.header}>
                    <Link href={`/uploader/${image.uploader.slug}`} className="link">
                        <h3>{image.uploader.username}</h3>
                    </Link>
                    <span>•</span>
                    <div className={style.date}>
                        <DateUploaded date={image.createdAt}  />
                    </div>
                </div>
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

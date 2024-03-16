import style from "./page.module.css";
import Link from "next/link";
import DateUploaded from "@/app/components/DateUploaded";
import LoveBtn from "@/app/components/LoveBtn";
import ShareBtn from "@/app/components/ShareBtn";
import Image from "next/image";

export async function generateMetadata({ params, searchParams }, parent) {
  // read route params
  const slug = params.slug;

  // fetch data
  const image = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/images/` + slug
  ).then((res) => res.json());

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `Alisa | ${image.caption}`,
    openGraph: {
      images: [`${image.source}`, ...previousImages],
    },
  };
}

// fetch image detail from the API
async function getImageDetail(slug) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/images/` + slug, {
    next: {
      revalidate: 0,
    },
  });

  return res.json();
}

export default async function ImageDetail({ params }) {
  const image = await getImageDetail(params.slug);

  const getImageSource = (image) => {
    if (image.source.includes("backblazeb2.com")) {
      const spliSource = image.source.split("v1/")[1];
      return process.env.NEXT_PUBLIC_IMAGE_CDN + spliSource;
    }
    return "";
  };

  return (
    <div className={style.container}>
      <div className={style.image_wrap}>
        <Image
          className={style.img}
          src={getImageSource(image)}
          alt={image.caption}
          width={"500"}
          height={"300"}
          sizes="100vw"
          priority={true}
        />
      </div>
      <div className={style.detail_wrap}>
        <div className={style.header}>
          <Link href={`/uploader/${image.uploader.slug}`} className="link">
            <h3>{image.uploader.username}</h3>
          </Link>
          <span>•</span>
          <div className={style.date}>
            <DateUploaded date={image.createdAt} />
          </div>
        </div>
        <div>{image.caption}</div>
        <div className={style.prompt}>
          <b>Prompt:</b>
          <p>{image.prompt}</p>
        </div>
        <div className={style.category}>
          <b>Category:</b>
          <div className={style.categorybtn}>
            {image.category.map((category) => (
              <div key={category._id}>
                <Link
                  href={`/categories/${category.slug}`}
                  className="btn_primary"
                >
                  <b>{category.name}</b>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className={style.footer}>
            <LoveBtn image={image} />
            <ShareBtn image={image} />
        </div>
      </div>
    </div>
  );
}

import style from "./page.module.css"

// fetch images from the API
async function getImages() {
  const res = await fetch("http://localhost:3001/api/images", {
    next: {
      revalidate: 60 * 60,
    }
  });

  return res.json();
}

export default async function Home() {

  const images = await getImages();

  return (
    <main className={style.main}>
      {images.map((image) => (
        <div key={image._id} className={style.card}>
        <h3>{image.caption}</h3>
        <img className={style.img} src={image.source} alt={image.caption} />
        </div>
      ))}
    </main>
  )
}

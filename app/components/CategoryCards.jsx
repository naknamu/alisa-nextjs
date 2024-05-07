import style from "./CategoryCards.module.css";
import Empty from "./Empty";
import ImageCard from "./ImageCard";

export default function CategoryCards({ images}) {
  return (
    <div className={style.container}>
      {images.map((image, index) => (
        <ImageCard key={image._id} image={image} index={index} />
      ))}
      <Empty />
    </div>
  );
}

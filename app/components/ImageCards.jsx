import style from "./ImageCards.module.css";
import Empty from "./Empty";
import ImageCard from "./ImageCard";

export default function ImageCards({ images }) {

  return (
    <div className={style.container}>
      {images.map((image, index) => (
        <ImageCard key={image._id} image={image} index={index}/>
      ))}
      <Empty />
    </div>
  );
}

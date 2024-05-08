import style from "./ImageCards.module.css";
import Empty from "./Empty";
import dynamic from "next/dynamic";
import SkeletonLoader from "./SkeletonLoader";

const ImageCard = dynamic(() => import("./ImageCard"), {
  ssr: false,
  loading: () => <SkeletonLoader />,
});

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

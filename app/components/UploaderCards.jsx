import style from "./ImageCards.module.css";
import dynamic from "next/dynamic";
import SkeletonLoader from "./SkeletonLoader";
import Empty from "./Empty";

const ImageCard = dynamic(() => import("./ImageCard"), {
  ssr: false,
  loading: () => <SkeletonLoader />,
});

export default function UploaderCards({ images }) {
  return (
    <div className={style.container}>
      {images.map((image) => (
        <ImageCard key={image._id} image={image} />
      ))}
      <Empty />
    </div>
  );
}

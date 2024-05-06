import style from "./CategoryCards.module.css";
import dynamic from "next/dynamic";
import SkeletonLoader from "./SkeletonLoader";
import Empty from "./Empty";

const ImageCard = dynamic(() => import("./ImageCard"), {
  ssr: false,
  loading: () => <SkeletonLoader />,
});

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

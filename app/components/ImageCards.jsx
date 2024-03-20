"use client";

import style from "./ImageCards.module.css";
import { getImagesPaginated } from "../actions";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import LoaderUI from "./LoaderUI";
import dynamic from "next/dynamic";
import SkeletonLoader from "./SkeletonLoader";
import Empty from "./Empty";

const ImageCard = dynamic(() => import("./ImageCard"), {
  ssr: false,
  loading: () => <SkeletonLoader />,
});

const NUMBER_OF_IMAGES_TO_FETCH = parseInt(
  process.env.NEXT_PUBLIC_INITIAL_NUMBER
);

export default function ImageCards({ initialImages }) {
  const [offset, setOffset] = useState(NUMBER_OF_IMAGES_TO_FETCH);
  const [images, setImages] = useState(initialImages);
  const [isFetching, setIsFetching] = useState(true);
  const { ref, inView } = useInView();

  const loadMoreImages = async () => {
    const apiImages = await getImagesPaginated(
      offset,
      NUMBER_OF_IMAGES_TO_FETCH
    );

    if (apiImages.length === 0) {
      setIsFetching(false);
    } else {
      setIsFetching(true);
    }
    
    setImages([...images, ...apiImages]);
    setOffset(offset + NUMBER_OF_IMAGES_TO_FETCH);
  };

  useEffect(() => {
    if (inView) {
      loadMoreImages();
    }
  }, [inView]);

  return (
    <div className={style.container}>
      {images.map((image) => (
        <ImageCard key={image._id} image={image} />
      ))}
      <div ref={ref} className={style.loader}>
        {isFetching && <LoaderUI />}
        {!isFetching && <Empty />}
      </div>
    </div>
  );
}

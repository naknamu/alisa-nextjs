"use client";

import style from "./ImageCards.module.css";
import { getUploaderImagesPaginated } from "../actions";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import LoaderUI from "./LoaderUI";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import dynamic from "next/dynamic";

const ImageCard = dynamic(() => import("./ImageCard"), {
  ssr: false,
  loading: () => <Skeleton />,
});

const NUMBER_OF_IMAGES_TO_FETCH = parseInt(
  process.env.NEXT_PUBLIC_INITIAL_NUMBER
);

export default function UploaderCards({ initialImages, slug }) {
  const [offset, setOffset] = useState(NUMBER_OF_IMAGES_TO_FETCH);
  const [images, setImages] = useState(initialImages);
  const { ref, inView } = useInView();

  const loadMoreImages = async () => {
    const apiImages = await getUploaderImagesPaginated(
      slug,
      offset,
      NUMBER_OF_IMAGES_TO_FETCH
    );
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
        <LoaderUI />
      </div>
    </div>
  );
}

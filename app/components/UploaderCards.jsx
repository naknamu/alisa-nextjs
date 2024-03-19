"use client";

import style from "./ImageCards.module.css";
import { getUploaderImagesPaginated } from "../actions";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import ImageCard from "./ImageCard";
import LoaderUI from "./LoaderUI";

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

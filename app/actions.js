"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function incrementLove(uploaderslug, imageid, auth_token) {
  const imagelove = {
    love: uploaderslug,
  };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/image/${imageid}/love/update`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth_token}`,
      },
      body: JSON.stringify(imagelove),
    },
  );

  return res.json();
}

export async function removeLove(uploaderslug, imageid, auth_token) {
  const imagelove = {
    love: uploaderslug,
  };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/image/${imageid}/love/delete`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth_token}`,
      },
      body: JSON.stringify(imagelove),
    },
  );

  return res.json();
}

// fetch categories from API
export async function getCategories() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
  return res.json();
}

// fetch all images from API
export async function getImages() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/images`, {
    next: {
      revalidate: 60 * 15,
    },
  });
  return res.json();
}

// fetch user session
export async function getSession() {
  const session = await getServerSession(authOptions);
  return session;
}

// fetch latest uploaded images
export async function getLatestUpload() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/images`, {
    next: {
      revalidate: 60,
    },
  });

  return res.json();
}

// test fetching for infinite scroll
export async function getImagesPaginated(startIndex, size) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/images`, {
    next: {
      revalidate: 60,
    },
  });
  const data = await res.json();
  const endIndex = startIndex + size;
  const paginated = data.slice(startIndex, endIndex);

  return paginated;
}

export async function getImagesByCategoryPaginated(slug, startIndex, size) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/images/`, {
    next: {
      revalidate: 60 * 15,
    },
  });

  const data = await res.json();

  // filter images uploaded by category
  const images = data.filter((image) =>
    image.category.some((category) => slug === category.slug),
  );

  const endIndex = startIndex + size;
  const paginated = images.slice(startIndex, endIndex);

  return paginated;
}

export async function getUploaderImagesPaginated(slug, startIndex, size) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/images/`, {
    next: {
      revalidate: 0,
    },
  });

  const data = await res.json();

  // filter images uploaded by the uploader
  const images = data.filter((image) => slug === image.uploader.slug);

  const endIndex = startIndex + size;
  const paginated = images.slice(startIndex, endIndex);

  return paginated;
}

// fetch image detail from the API
export async function getImageDetail(slug) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/images/` + slug, {
    next: {
      revalidate: 0,
    },
  });

  return res.json();
}

// fetch uploader details from the API
export async function getUploader(slug) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/uploaders/` + slug,
    {
      next: {
        revalidate: 60,
      },
    },
  );

  return res.json();
}

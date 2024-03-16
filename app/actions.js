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
    }
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
    }
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
      revalidate: 0,
    },
  });
  // console.log(process.env.NEXT_PUBLIC_API_URL);
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
      revalidate: 0,
    },
  });

  return res.json();
}
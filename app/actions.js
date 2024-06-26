"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { cookies } from "next/headers";
import { getCookie } from "cookies-next";

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

// fetch all categories from API
export async function getCategories() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
    next: {
      revalidate: 60 * 15,
    },
  });
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

export async function getImagesByCategory(slug) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/images/`, {
    next: {
      revalidate: 60 * 15,
    },
  });

  const data = await res.json();

  // filter images uploaded by category
  const images = data.filter((image) =>
    image.category.some((category) => slug === category.slug)
  );

  return images;
}

export async function getUploaderImages(slug) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/images/`, {
    next: {
      revalidate: 0,
    },
  });

  const data = await res.json();

  // filter images uploaded by the uploader
  const images = data.filter((image) => slug === image.uploader.slug);

  return images;
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
    }
  );

  return res.json();
}

import { Knock } from "@knocklabs/node";
const knockClient = new Knock(process.env.KNOCK_SECRET_API_KEY);

// NOTIFY LOVED IMAGE
export async function notifyLove(image, actor) {
  await knockClient.notify("love", {
    recipients: [image.uploader.slug],
    actor: actor,
    data: {
      image: {
        caption: image.caption,
        slug: image.slug,
      },
    },
  });
}

// NOTIFY Welcome message
export async function notifyWelcome(new_uploader) {
  await knockClient.notify("welcome", {
    recipients: [new_uploader],
  });
}

// NOTIFY NEW COMMENT ON IMAGE
export async function notifyNewComment(image, uploader, value) {
  await knockClient.notify("new-comment", {
    recipients: [image.uploader.username],
    actor: uploader,
    data: {
      image: {
        slug: image.slug,
      },
      comment: {
        message: value,
      },
    },
  });
}

// NOTIFY NEW REPLY
export async function notifyNewReply(comment, uploader, value) {
  await knockClient.notify("new-reply", {
    recipients: [comment.uploader.slug],
    actor: uploader,
    data: {
      image: {
        slug: comment.image.slug,
      },
      comment: {
        message: value,
      },
    },
  });
}

// DELETE COMMENT PERMANENTLY
export async function deleteComment(comment) {
  const auth_token = getCookie("auth_token", { cookies });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/${comment.image}/${comment.uploader._id}/comment/${comment._id}/delete`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth_token}`,
      },
      body: JSON.stringify({ isDeleted: false }),
    }
  );

  return res.json();
}

// CHANGE COMMENT FLAG
export async function updateCommentFlag(comment) {
  const auth_token = getCookie("auth_token", { cookies });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/${comment.image}/${comment.uploader._id}/comment/${comment._id}/delete`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth_token}`,
      },
      body: JSON.stringify({ isDeleted: true }),
    }
  );

  return res.json();
}

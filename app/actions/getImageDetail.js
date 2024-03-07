"use server";

// fetch image detail from the API
export default async function getImageDetail(slug) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/images/` + slug, {
    next: {
      revalidate: 0,
    },
  });

  return res.json();
}

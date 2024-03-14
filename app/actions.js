"use server";

export async function incrementLove(uploaderslug, imageid, auth_token) {

    const imagelove = {
        love : uploaderslug,
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/image/${imageid}/love/update`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth_token}`
        },
        body: JSON.stringify(imagelove),
    });
    
    return res.json();
}

export async function removeLove(uploaderslug, imageid, auth_token) {
    const imagelove = {
        love : uploaderslug,
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/image/${imageid}/love/delete`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth_token}`
        },
        body: JSON.stringify(imagelove),
    });
    
    return res.json();
}

// fetch categories from API
export async function getCategories() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
    return res.json();
}
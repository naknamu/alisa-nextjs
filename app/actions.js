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
    
    if (res.status === 200) {
        console.log("Successfully added love.");
    } else {
        console.log("Error!");
        return null;
    }
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
    
    if (res.status === 200) {
        console.log("Successfully removed love.");
    } else {
        console.log("Error!");
        return null;
    }
}
// fetch uploader details from the API
async function getUploader(slug) {
    const res = await fetch("http://localhost:3000/api/uploaders/" + slug, {
      next: {
        revalidate: 0,
      }
    });
  
    return res.json();
}

// fetch images uploaded by the uploader
async function getUploaderImages(slug) {
  const res = await fetch("http://localhost:3000/api/images/", {
    next: {
      revalidate: 0,
    }
  });

  const data = await res.json();

  // filter images uploaded by the uploader
  const images = data.filter((image) => 
    slug === image.uploader.slug
  )

  return images;
}

export default async function UploaderDetails({ params }) {
    const uploader = await getUploader(params.slug);

    const uploaderImages = await getUploaderImages(params.slug);

    return (
    <main>
        <h2>{uploader?.username}</h2>
        <p>{uploader?.email}</p>
        <h3>Uploaded Images</h3>
        {uploaderImages.map((image) => (
          <div key={image._id} className="card">
            <p>{image.caption}</p>
            <img src={`${image.source}`} alt="" />
          </div>
        ))}
    </main>
    )
}


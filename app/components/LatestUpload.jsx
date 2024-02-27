import React from 'react';
import api from '@/config';
import style from "./LatestUpload.module.css"

async function getLatestUpload() {
    const res = await fetch(`${api.url}/images`);
    const data = await res.json();

    return data;
}

export default async function LatestUpload() {

  const latest = await getLatestUpload();

  return (
    <div className={style.container}>
        <div className={style.content}>
          <h3>Latest Upload</h3>
          {latest.map((image) => (
            <button key={image._id} className="btn_primary">
              <div>{image.uploader.username}</div>
              <p>{image.caption}</p>
            </button>
          ))}
        </div>

    </div>
  )
}

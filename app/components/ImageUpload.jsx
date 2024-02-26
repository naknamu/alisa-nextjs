import { useState } from "react";

export default function ImageUpload({ previewFile, setPreviewFile}) {

  const handleChange = (e) => {
    const files = e.target.files;
    const file = files[files.length - 1];

    if (file) {
      // construct data uri for previewing the image
      // before sending it to the server
      const fileReader = new FileReader();

      fileReader.readAsDataURL(file);
      fileReader.addEventListener("load", () => {
        setPreviewFile({
          file,
          base64: fileReader.result,
        });
      });
    } else {
      setPreviewFile(null);
    }
  };

  return (
    <main>
      <div>
        {previewFile && (
          <img style={{ width: "300px" }} src={previewFile.base64} />
        )}
      </div>
      <input
        type="file"
        id="my-image-id"
        name="my-image-id"
        onChange={handleChange}
        // accept="image/png, image/jpeg"
      />
    </main>
  );
}

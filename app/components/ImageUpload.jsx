import { useState } from 'react';

export default function ImageUpload({ setSource }) {
    const [previewFile, setPreviewFile] = useState();

    const handleChange = (e) => {
        const files = e.target.files;
        const file = files[files.length - 1];

        if (file) {
            // construct data uri for previewing the image
            // before sending it to the server
            const fileReader = new FileReader();

            fileReader.readAsDataURL(file);
            fileReader.addEventListener('load', () => {
              setPreviewFile({
                file,
                base64: fileReader.result,
            });
        });
        } else {
            setPreviewFile(null);
        }
    };

    const upload = async (e) => {
        e.preventDefault();

        const { file } = previewFile;

        // // Rename the file before sending if you want
        const fileExt = file.name.substring(file.name.lastIndexOf('.') + 1);
        const fileName = `image.${fileExt}`;

        const formData = new FormData();
        formData.append('file', file);
        formData.append('x-filename', fileName);

        try {
          // Use fetch instead of axios.post
          const response = await fetch(`/api/upload`, {
            method: 'POST',
            body: formData
          });

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          // Assuming the response is JSON, parse it
          const data = await response.json();
          // use the image URL returned from the API response
          const { url } = data;

          // asign the URL to a react state to be sent to the Database
          setSource(url);

        } catch (err) {
          console.error('Error:', err);
        }

        setPreviewFile();
    };

    return (
        <main>
            <div>
                {previewFile && <img style={{width: "300px"}} src={previewFile.base64} />}
            </div>
            <input
                type="file"
                id="my-image-id"
                name="my-image-id"
                onChange={handleChange}
                // accept="image/png, image/jpeg"
            />
            <button onClick={e => upload(e)}>Submit</button>
        </main>
    )
}

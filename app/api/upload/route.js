import B2 from "backblaze-b2";

export async function POST(request) {
  const formData = await request.formData();
  const file = formData.get("file");
  const fileName = formData.get("x-filename");

  // Convert to buffer data to enable upload to Backblaze B2
  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);

  const b2 = new B2({
    applicationKeyId: process.env.BACKBLAZE_KEY_ID,
    applicationKey: process.env.BACKBLAZE_APP_KEY,
  });

  // b2 auth tokens are valid for 24 hours
  // .authorize returns the download url,
  // .getUploadUrl returns the upload url and auth token
  const { data: authData } = await b2.authorize();
  const { data: uploadData } = await b2.getUploadUrl({
    bucketId: process.env.BACKBLAZE_BUCKET_ID,
  });

  const { data } = await b2.uploadFile({
    uploadUrl: uploadData.uploadUrl,
    uploadAuthToken: uploadData.authorizationToken,
    data: buffer,
    // there are no real directories in b2, if you want to place
    // your file in a folder structure, do so with slashes. ex:
    //   fileName: `/my-subfolder/uploads/${fileName}`
    fileName: `images/uploads/${fileName}`,
    // info: {}, // store optional info, like original file name
  });

  // Return image url from Blackblaze b2
  return Response.json({
    status: 200,
    url: `https://f005.backblazeb2.com/b2api/v1/b2_download_file_by_id?fileId=${data.fileId}`,
  });
}

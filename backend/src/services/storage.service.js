
import { ImageKit, toFile } from "@imagekit/nodejs";

const iamgekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URLENDPOINT,
});

export const uploadFile = async (buffer, fileName) => {
  //console.log("buffer -->", buffer, "fileName -->", fileName);
  try {
    const result = await iamgekit.files.upload({
      file: await toFile(buffer, fileName),
      fileName: fileName,
    });
    return result;
  } catch (err) {
    console.error("ImageKit upload error:", err);
    return null;
  }
};

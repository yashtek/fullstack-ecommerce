// Require the cloudinary library
import 'dotenv/config';
import { v2 as cloudinary, UploadApiErrorResponse, UploadApiResponse } from "cloudinary";

// Return "https" URLs by setting secure: true
cloudinary.config({
  api_key: process.env.Cloud_API_KEY,
  cloud_name: process.env.Cloud_name,
  api_secret: process.env.CLOUD_SCERET_KEY,
  secure: true
});


export const uploadImage = async (
  file: File | Buffer,
  productId?: string
) => {
  let buffer: Buffer;

  if (file instanceof File) {
    const arrayBuffer = await file.arrayBuffer();
    buffer = Buffer.from(arrayBuffer);
  } else {
    buffer = file;
  }

  return new Promise<{
    url: string;
    public_id: string;
  }>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: `products/${productId || "general"}`,
    
      },
      (error, result) => {
        if (error) return reject(error);
        if (!result) return reject(new Error("Upload failed"));

        resolve({
          url: result.secure_url,
          public_id: result.public_id,
        });
      }
    );

    stream.end(buffer);
  });
};

export const deleteImage = async(publicId:string)=>{
  try{
    return await cloudinary.uploader.destroy(publicId);
  }catch(error){
    console.error("Delete Failed",error);
    throw error;
  }
};

export const deleteMultipleImages = async (
  images: { public_id: string }[]
) => {
  try {
    const results = await Promise.all(
      images.map((img) => deleteImage(img.public_id))
    );

    return results;
  } catch (error) {
    console.error("Multiple delete failed", error);
    throw error;
  }
};
// const createImageTag = (publicId) => {

  

//     // Create an image tag with transformations applied to the src URL
//     let imageTag = cloudinary.image(publicId, {
//       transformation: [
        
//         { quality: 'auto:best' },
//         {fetch_format:"auto"},
//       ],
//     });

//     return imageTag;
// };

// const getAssetInfo = async (publicId) => {

//     // Return colors in the response
//     const options = {
//       colors: true,
//     };

//     try {
//         // Get details about the asset
//         const result = await cloudinary.api.resource(publicId, options);
//         console.log(result);
//         return result.colors;
//         } catch (error) {
//         console.error(error);
//     }
// };

// (async () => {

//     // Set the image to upload
//     const imagePath = 'https://images.pexels.com/photos/1525041/pexels-photo-1525041.jpeg?cs=srgb&dl=pexels-francesco-ungaro-1525041.jpg&fm=jpg';

//     // Upload the image
//     const publicId = await uploadImage(imagePath);

//     // Get the colors in the image
//     // const colors = await getAssetInfo(publicId);


// })();
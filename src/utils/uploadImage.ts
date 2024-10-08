import { v2 as cloudinary } from "cloudinary";

export const uploadImage = async (
  imageFile: Express.Multer.File | undefined
): Promise<string> => {
  if (!imageFile) {
    return "";
  }

  const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
    resource_type: "image",
  });
  return imageUpload.secure_url; 
};

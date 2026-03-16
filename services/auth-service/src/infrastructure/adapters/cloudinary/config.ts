import { v2 as cloudinary, ConfigOptions } from 'cloudinary';

export function getCloudinary() {
  const cloudName = process.env.CLOUDINARY_NAME;
  const apiKey    = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error('Cloudinary: faltan variables de entorno');
  }

  cloudinary.config({
    cloud_name: cloudName,
    api_key:    apiKey,
    api_secret: apiSecret,
    secure:     true,
  } satisfies ConfigOptions);

  return cloudinary;
}
import { getCloudinary } from './config';
import { Readable } from 'stream';

function bufferToStream(buffer: Buffer): Readable {
  const stream = new Readable();
  stream.push(buffer);
  stream.push(null);
  return stream;
}

export async function uploadImage(fileBuffer: Buffer, folder: string): Promise<string> {
  const cloudinary = getCloudinary();
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder, resource_type: 'image' },
      (error, result) => {
        if (error || !result) return reject(error ?? new Error('Upload sin resultado'));
        resolve(result.secure_url);
      }
    );
    bufferToStream(fileBuffer).pipe(uploadStream);
  });
}

export async function uploadAvatar(fileBuffer: Buffer): Promise<string> {
  return uploadImage(fileBuffer, 'petcare/avatars');
}

export async function uploadPetImage(fileBuffer: Buffer): Promise<string> {
  return uploadImage(fileBuffer, 'petcare/pets');
}

export async function deleteImage(imageUrl: string): Promise<void> {
  const cloudinary = getCloudinary();
  const publicId = extractPublicId(imageUrl);
  if (!publicId) throw new Error('No se pudo extraer el publicId de la URL');
  await cloudinary.uploader.destroy(publicId, { resource_type: 'image' });
}

export function extractPublicId(imageUrl: string): string | null {
  const match = imageUrl.match(/\/upload\/(?:v\d+\/)?(.+)\.[a-z]+$/i);
  return match ? match[1] : null;
}
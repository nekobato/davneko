import { Storage } from '@google-cloud/storage';
import path from 'path';

export const storage = new Storage({ keyFilename: './nnn1004.json' });

export const getPublicUrl = (bucketName: string, fileName: string) => {
  return `https://storage.googleapis.com/${bucketName}/${fileName}`;
};

export const bucketName =
  process.env.NODE_ENV === 'production' ? 'nnn1004' : 'nnn1004-dev';

// upload file
export const uploadFile = async (
  fileType: StorageDirectories,
  fileName: string,
  content: string | Buffer,
) => {
  const filePath = path.join(fileType, fileName);
  const file = storage.bucket(bucketName).file(filePath);
  await file.save(content);
  return getPublicUrl(bucketName, filePath);
};

// get file url
export const getFileUrl = (fileType: StorageDirectories, fileName: string) => {
  const filePath = path.join(fileType, fileName);
  return getPublicUrl(bucketName, filePath);
};

export type StorageDirectories =
  | 'audio'
  | 'audio-manifest'
  | 'audio-segment'
  | 'audio-cover'
  | 'audio-cover-thumbnail'
  | 'audio-ref'
  | 'user-image'
  | 'user-cover'
  | 'album-cover'
  | 'album-cover-thumbnail';

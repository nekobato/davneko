import bcrypt from 'bcrypt';
import { customAlphabet } from 'nanoid';

const createCustomNanoid = (length: number) =>
  customAlphabet(
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
    length,
  )();

export const generateUserId = () => {
  return createCustomNanoid(16);
};

export const generateId = () => {
  return createCustomNanoid(16);
};

export const generateToken = () => {
  return createCustomNanoid(32);
};

export const generateAudioId = () => {
  return createCustomNanoid(16);
};

export const generateFileId = () => {
  return createCustomNanoid(16);
};

export const generateQueueId = () => {
  return createCustomNanoid(16);
};

export const hashPassword = (password: string) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

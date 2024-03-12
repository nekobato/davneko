import { nanoid, customAlphabet } from 'nanoid';

export const generateUserId = () => {
  const customNanoid = customAlphabet(
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
    16,
  );
  return customNanoid();
};

export const generateId = () => {
  return nanoid(16);
};

export const generateToken = () => {
  return nanoid(32);
};

export const generateFileId = () => {
  return nanoid(16);
};

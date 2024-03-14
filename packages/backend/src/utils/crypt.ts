import bcrypt from 'bcrypt';
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

export const hashPassword = (password: string) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

import { ulid } from "ulid";
import sha1 from "crypto-js/sha256";
import hmacSHA512 from "crypto-js/hmac-sha512";
import Base64 from "crypto-js/enc-base64";

export const createId = () => {
  return ulid().toLocaleLowerCase();
};

export const createNonce = () => {
  return ulid().toLocaleLowerCase();
};

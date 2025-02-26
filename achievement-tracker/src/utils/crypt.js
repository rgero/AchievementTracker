import CryptoJS from "crypto-js";

const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;

export const encryptField = (text) => {
  if (!text) return "";
  return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
};

export const decryptField = (ciphertext) => {
  if (!ciphertext) return "";
  const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};

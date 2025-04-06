import { AES, enc } from 'crypto-js';

// Encrypt sensitive data
export const encrypt = (data: string, password: string): string => {
  return AES.encrypt(data, password).toString();
};

// Decrypt sensitive data
export const decrypt = (encryptedData: string, password: string): string => {
  const bytes = AES.decrypt(encryptedData, password);
  return bytes.toString(enc.Utf8);
};

import { alphabet, generateRandomString } from 'oslo/crypto';

export const hashSettings = {
  memoryCost: 19456,
  timeCost: 2,
  outputLen: 32,
  parallelism: 1,
};

export const TOKEN_LENGTH = 32;
export const TOKEN_TTL = 1000 * 60 * 5; // 5 min

export const generateRandomToken = async (length: number) => {
  return generateRandomString(length, alphabet('0-9', 'a-z', 'A-Z'));
};

export const generateNumericToken = async (length: number) => {
  return generateRandomString(length, alphabet('0-9'));
};

export const generateAlphanumericToken = async (length: number) => {
  return generateRandomString(length, alphabet('0-9', 'a-z', 'A-Z'));
};

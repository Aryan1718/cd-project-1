import { Caesar } from './modules/cipher.js';
import Encrypter, { encrypt } from './modules/encrypt.js';
import Decrypter, { decrypt } from './modules/decrypt.js';
import Mailer from './email/email.js';

const { 
    getRandomShift ,
    getRandomMultiShift,
    checkForEmptyShift,
    isLetter,
    isNegative
} = Caesar;

// Global Object - Contains All Functions
export const Cipher = { 
    Mailer: Mailer,
    Encrypter: Encrypter,
    Decrypter: Decrypter,
    encrypt: encrypt,
    decrypt: decrypt,
    getRandomShift: getRandomShift,
    getRandomMultiShift: getRandomMultiShift,
    checkForEmptyShift: checkForEmptyShift,
    isLetter: isLetter,
    isNegative: isNegative
};

// Individually Accessible Functions
export { encrypt } from './modules/encrypt.js';
export { decrypt } from './modules/decrypt.js';
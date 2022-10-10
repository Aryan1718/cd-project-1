import { Caesar } from './cipher.js';
import Mailer from '../email/email.js';

export const encrypt = (text, shift, msgOnly) => {
    const shifts = [];
    let multishift = false;

    let letters = text.toUpperCase().split("");
    let result = [];
    let startingShiftPos = -1;

    Caesar.checkForEmptyShift(shift, text);
    Caesar.checkIfShiftIsNotNumber(shift);

    if (shift === 'RANDOM') {
        shift = Caesar.getRandomShift();
    } 
    if (shift.toString().includes(",")) {
        multishift = true;
        const nums = shift.split(",");
        for (let i = 0; i < nums.length; i++) {
            shifts.push(parseInt(nums[i]));
        }
        return Caesar.getResult(letters, result, startingShiftPos, multishift, shift, shifts, "encryption", [""], msgOnly);
    }

    return Caesar.getResult(letters, result, startingShiftPos, multishift, shift, shifts, "encryption", [""], msgOnly);
}

const encryptRandom = (text) => {
    const shift = Caesar.getRandomShift();
    return encrypt(text, shift);
}

const encryptRandomMultiShift = (text, length) => {
    const shift = Caesar.getRandomMultiShift(length);
    return encrypt(text, shift);
}

const encryptMany = (texts, shifts) => {
    if (!texts || texts.length < 1 || !shifts || shifts.length < 1) { return texts }
    if (!Array.isArray(shifts) && Number.isInteger(shifts)) {
        let tmp = shifts;
        shifts = [];
        for (let i = 0; i < texts.length; i++) {
            shifts.push(tmp);
        }
    }
    const results = [];
    for (let i = 0; i < texts.length; i++) {
        const result = encrypt(texts[i], shifts[i]);
        result.msgID = i + 1;
        results.push(result);
    }
    return results;
}

const encryptShowMessageOnly = (text, shift) => {
    return encrypt(text, shift, true);
}

const Encrypter = {
    encrypt: encrypt,
    encryptMany: encryptMany,
    encryptShowMessageOnly: encryptShowMessageOnly,
    encryptRandom: encryptRandom,
    encryptRandomMultiShift: encryptRandomMultiShift
}
export default Encrypter;
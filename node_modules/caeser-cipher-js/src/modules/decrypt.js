import { Caesar } from './cipher.js';

export const decrypt = (text, shift, numberIndexes, msgOnly) => {
    const shifts = [];
    let multishift = false;

    let letters = text.toUpperCase().split("");
    let result = [];
    let startingShiftPos = -1;

    if (!numberIndexes) { numberIndexes = [""]; }

    Caesar.checkForEmptyShift(shift, text);
    Caesar.checkIfShiftIsNotNumber(shift);

    if (shift.toString().includes(",")) {
        multishift = true;
        const nums = shift.split(",");
        for (let i = 0; i < nums.length; i++) {
            shifts.push(parseInt(nums[i]));
        }
        return Caesar.getResult(letters, result, startingShiftPos, multishift, shift, shifts, "decryption", numberIndexes, msgOnly);
    }

    if (shift.toString() === 'BRUTE FORCE') {
        let possibilities = [];
        for (let i = 0; i < Caesar.alphabet.length; i++) {
            const p = Caesar.getResult(letters, result, startingShiftPos, multishift, i, null, "decryption", numberIndexes, msgOnly);
            possibilities.push(p);
        }
        return possibilities;
    }

    return Caesar.getResult(letters, result, startingShiftPos, multishift, shift, shifts, "decryption", numberIndexes, msgOnly);
}

export const decryptMany = (texts, shifts, numIndexes) => {
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
        const result = decrypt(texts[i], shifts[i], numIndexes[i]);
        result.msgID = i + 1;
        results.push(result);
    }
    console.log(results);
    return results;
}

const decryptShowMessageOnly = (text, shift, numberIndexes) => {
    return decrypt(text, shift, numberIndexes, true);
}

const Decrypter = {
    decrypt: decrypt,
    decryptMany: decryptMany,
    decryptShowMessageOnly: decryptShowMessageOnly
}
export default Decrypter;
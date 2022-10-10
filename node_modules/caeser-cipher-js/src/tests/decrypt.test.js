import Decrypter from '../modules/decrypt.js'
import { decryption_tests as de } from './test_cases/test_cases.js';

const { decrypt, decryptMany, decryptShowMessageOnly } = Decrypter;
const { test1, test2, test3, test4, manyTexts1, manyTexts2 } = de;

// <-- TESTS -->
test('decrypts ' + test1.text, () => {
    expect(decrypt(test1.text, test1.shift, test1.indexes)).toStrictEqual(test1.result);
    expect(decrypt(test2.text, test2.shift, test2.indexes)).toStrictEqual(test2.result);
    expect(decrypt(test3.text, test3.shift, test3.indexes)).toStrictEqual(test3.result);
    expect(decrypt(test4.text, test4.shift, test4.indexes)).toStrictEqual(test4.result);
});
test('decrypts many ', () => {
    expect(decryptMany(manyTexts1.texts, manyTexts1.shifts, manyTexts1.numIndexes)).toStrictEqual(manyTexts1.result);
    expect(decryptMany(manyTexts2.texts, manyTexts2.shifts, manyTexts2.numIndexes)).toStrictEqual(manyTexts2.result);
});
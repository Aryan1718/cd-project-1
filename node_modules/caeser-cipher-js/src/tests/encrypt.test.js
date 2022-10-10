import Encrypter from '../modules/encrypt.js';
import { encryption_tests as en } from './test_cases/test_cases.js'

const { encrypt, encryptMany, encryptRandom, encryptRandomMultiShift, encryptShowMessageOnly } = Encrypter
const { test1, test2, random, manyTexts1, manyTexts2, manyTexts3 } = en;
const { singleShift, multiShift } = random;

// <-- TESTS -->

// <- Single-Case ->
test('encrypts single cases', () => {
    expect(encrypt(test1.text, test1.shift)).toStrictEqual(test1.result);
    expect(encrypt(test2.text, test2.shift)).toStrictEqual(test2.result);
});
test('', () => {
    console.log("Random Single Shift: ");
    console.log(encryptRandom(singleShift.text));
});
test('', () => {
    console.log("Random Multi-Shift: ");
    console.log(encryptRandomMultiShift(multiShift.text, multiShift.length));
});

// <- Multi-Cases ->
test('encrypts all: ', () => {
    expect(encryptMany(manyTexts1.texts, manyTexts1.shifts)).toStrictEqual(manyTexts1.result);
    expect(encryptMany(manyTexts2.texts, manyTexts2.shifts)).toStrictEqual(manyTexts2.result);
});
test('', () => {
    console.log("Random Encrypt Many: ");
    console.log(encryptMany(manyTexts3.texts, manyTexts3.shifts));
});

// <- Test Show MSG Only ->
test('Encrypt Show Msg Only ', () => {
    expect(encryptShowMessageOnly(test1.text, test1.shift)).toStrictEqual({ msg: 'UMMB UM IB NQDM W KTWKS QV BPM JIKS' });
    expect(encryptShowMessageOnly(test2.text, test2.shift)).toStrictEqual({ msg: 'F GGSZ YQ DEB CMIHCP NROZCQ' });
});
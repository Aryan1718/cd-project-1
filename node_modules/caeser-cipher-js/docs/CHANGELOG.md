# Changelog

## 1.x

#### Releases

- 1.1.1:
  - Add Support for Multi-Shift-Key
- 1.2.1:
  - Add An option to perform 'Brute Force' while decrypting.
- 1.1.3: 
  - Refactor codebase and optimized performance.
- v1.1.4: 
  - Remove unused functions that were being exported from cipher.js
  - Update README 'Version History' and 'Contributing' sections
  - Shorten various functions in modules folder.
- v1.1.5:
   - Add Unit Testing(JEST) for encrypt() and decrypt() methods
   - Command to Start Tests: npm run test
- v1.2.0:
   - All encryptions/decryptions now return an object with 2 - 3 properties. The shift used is always returned.
   - Added support for encrypting numbers
     - If numbers are in an encryption string, an array of number index position is created and returned in the result
     - Numbers are encrypted into letters for better security as the position of the numbers is unrecognizable to an outside eye.
     - In decryption, the array of indexes is needed to find the position of the numbers to turn them back into numbers.
   - Updated All Unit Tests to match new format.
   - Added 1 Unit test for 'BRUTE FORCE' decryption.
   - Added 'Encrypting Numbers' section to README.
   - Added 'Future Works' Section to README.
   - Edited the 'Contributing' section of README.
- v1.2.2:
   - Updated README with info about the new methods you can use with Caesar-Cipher-JS.

## 2.x

### Releases

- 2.0.0
  - Coming Soon!
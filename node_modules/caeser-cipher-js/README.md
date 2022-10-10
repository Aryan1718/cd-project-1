# Caesar-Cipher-Js
 - A JavaScript Library that allows you to encrypt and/or decrypt your messages, passwords, and other texts. Securely send your data using the algorithms of caeser-cipher-js.

![npm](https://img.shields.io/npm/v/caeser-cipher-js?style=for-the-badge)

Learn more about [Caesar Ciphers](https://www.sciencedirect.com/topics/computer-science/caesar-cipher).
  
## Installation
 - Install with [npm](https://www.npmjs.com/): ``` npm install caeser-cipher-js ```
 - Clone the repo: ``` git clone git@github.com:KaipoJames/Caesar-Cipher-Encrypt-And-Decrypt.git ```
 - Download Project as [ZIP-FILE](https://github.com/KaipoJames/Caesar-Cipher-JS/archive/refs/heads/master.zip)

## Getting Started

 - Once you have installed Caesar-Cipher-Js, import it using the following command:
  ```js
  import { Cipher } from "caeser-cipher-js"; 
  ```
 - To use the Cipher functions you can call 'encrypt' or 'decrypt'.
    ``` js
    const message = Cipher.encrypt("This message will be encrypted.", 4);
    //OUTPUT: XLMW QIWWEKI AMPP FI IRGVCTXIH.
    ```
   - The value of the message variable is encrypted with a shift 4 key.
  
 - To decrypt, pass in the decrypted message and the reverse-shift.
    ``` js
    const message = Cipher.decrypt("XLMW QIWWEKI AMPP FI IRGVCTXIH.", -4); 
    // OUTPUT: THIS MESSAGE WILL BE ENCRYPTED
    ```

 - Alternatively, you can install only the modules that you need.

   ```js
   import { encrypt } from 'caeser-cipher-js'
   
   const password = encrypt('myPasswordHere', -6);
   ```

 - You can also pass a multi-shift key for a more secure encryption.
 - NOTE: numbers in a multi-shift key must be separated by commas to work.
   ```js
   console.log(encrypt("Don't Forget To Make Sure The Passwords are encrypted!", '3,8,9'));
   // OUTPUT: GWW'W NXUONW BX PITH ADUM CKM YDABZWAGA JUM NQKABXCHL!

   // Knowing the multi-shift key, pass in the opposite sign used in the encryption.
   console.log(decrypt("GWW'W NXUONW BX PITH ADUM CKM YDABZWAGA JUM NQKABXCHL!", '-3,-8,-9'));
   // OUTPUT: Don't Forget To Make Sure The Passwords are encrypted!
   ```

  - For single shifts, you can use a 'brute-force' attack if you don't know the shift number
    ```js
      console.log(decrypt("RD XJHZWJ RJXXFLJ", 'BRUTE FORCE'));
      // This will output all possible combinations from shift 0-25.
    ```

### Encrypting Numbers
 - Caesar-Cipher-JS is smart enough to recognize and encrypt numbers automatically.
    ```js
      console.log(encrypt("My Address Number Changed from 432 to 434", -3));
      // OUTPUT: {msg: "JV XAAOBPP KRJYBO ZEXKDBA COLJ EDC QL EDE", numIndexes: [31, 32, 33, 38, 39, 40], shift: -3}
    ```
 - numIndexes is an array of indexes keeping track of the positions of all the numbers in the message.
 - To decrypt the numbers, pass in the array of indexes as the third parameter, and the reverse-shift as normal.
    ```js
      console.log(decrypt("JV XAAOBPP KRJYBO ZEXKDBA COLJ EDC QL EDE", 3, [31, 32, 33, 38, 39, 40]))
      // OUTPUT: {msg: "MY ADDRESS NUMBER CHANGED FROM 432 TO 434", shift: 3}
    ```

### Other Available Methods
 - As of version 1.2.1, various other methods are now accesible to import into your project.
 - They are small methods which may be useful incase you are implementing your own solutions.
 -  New methods added:
    - getRandomShift() returns a random shift.
    - getRandomMultiShift() returns a random MultiShift(Only avalable in version 2.0.0 sorry!)
    - checkForEmptyShift(shift, text) returns text if there is no shift.
    - isLetter(input) returns true if input is a letter, otherwise returns false.
    - isNegative(input) returns true if input is a negative number, else: false.
  - NOTE: These methods are properties of the 'Cipher' object. You must import the entire library to use these new functions.

### Running Tests
 - This library uses 'JEST' for unit testing.
 - first, run ``` npm install ``` to install all dependencies or run ``` npm install jest ``` to install only the jest dependency.
 - Then you can start testing.
   - run ``` npm run test ``` to execute all tests.
   - run ``` npm run testEncrypt ``` to execute all encryption tests.
   - run ``` npm run testDecrypt ``` to execute all decryption tests.


## Documentation 
   - [User Docs](docs/USER_DOCS.md) - For General Information on how to use this package and its features.
   - [Dev Docs](docs/DEV_DOCS.md) - For developers, contributers, and others. Technical Information explaining features, codebase, etc. in depth.

### Version History
 - see [CHANGELOG](https://github.com/KaipoJames/Caesar-Cipher-JS/blob/master/CHANGELOG.md)

### Future Works
  - Provide users with the option to have the shift and/or number indexes returned with the encoded/decoded message.
  - Add support for other encryption algorithms besides the current substitution ones.
  - Move All Documentation about features into its own file. 
  - Create Documentation explaining technical features, code architecture of the project, and other code-based information.

## Contributing
 - I would love if you would like to contribute to the project! Feel free to fork this repo and propose your changes!
 - Any great ideas about adding new encryption algorithms are greatly encouraged! 
 - See the 'Future Works' section above for some ideas.
 - It also may be beneficial to check out the [Dev Docs](docs/DEV_DOCS.md).


## Author & License

### Author
 - Kaipo Wilmeth(KaipoJames)

### Copyright and License
 - [MIT License](LICENSE.txt)


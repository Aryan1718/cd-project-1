# CAESER_CIPHER_JS Developer Documentation

This Document contains all relavant information for developers, contributers, and other individuals wishing to have deeper look behind the scenes of how this package functions.

## Encrypt & Decrypt
    The two main methods associated with Caeser-Cipher-Js do essentially the same thing, just in reverse order. 
        - Encryption is a substitution cipher that substitutes a given letter with another letter based on what shift is provided.
        - For example let us take the following:
          - ``` encrypt("Snacks Are Delicious", 7) ```
            - The first parameter refers to the message, a string, that will be encrypted
            - The second is a number that is our shift or 'key'.
            - The encryption algorithm goes through each letter in the string and locates it's position in the english alphabet.
            - The shift number, in this case 7, is added to the letters position giving us a new position for the letter.
            - With this new index, the algorithm finds a new letter at the new index and returns that new letter.
              - If the end of the alphabet is reached, it starts over at a. Same for the other way around.
        - Decryption is a substitution cipher that substitutes a given letter with another letter based on what shift is provided.
        - For example let us take the following:
          - ``` decrypt("ZUHJRZ HYL KLSPJPVBZ", 7) ```
            - The first parameter refers to the message, a string, that will be encrypted
            - The second is a number that is our shift or 'key'.
            - The encryption algorithm goes through each letter in the string and locates it's position in the english alphabet.
            - The shift number, in this case 7, is added to the letters position giving us a new position for the letter.
            - With this new index, the algorithm finds a new letter at the new index and returns that new letter.
              - If the end of the alphabet is reached, it starts over at a. Same for the other way around.

## Cipher.js
    Filepath: src/modules/cipher.js
    Purpose: The purpose of this file is to hold reusable methods for encrypt and decrypt to use.

## Tests
    This project uses JEST to make writing tests easier.
    Tip: If you are not using the email feature in this package, only run ``` npm i jest ``` since you won't need the other dependencies for testing.

## Dependencies
    ```
    "dotenv": "^10.0.0",
    "googleapis": "^85.0.0",
    "jest": "^27.1.0",
    "nodemailer": "^6.6.3"
    ```
    You can also view the dependencies in the package.json folder.
    If you want to install only 1 dependency, do so individually as you please. ``` npm i jest ```

## Exports
    The project makes use of the package.json 'export' property to be able to export the fedault module from the following files:
        - index.js, encrypt.js, decrypt.js, and email.js.


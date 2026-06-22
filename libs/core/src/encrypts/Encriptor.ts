import * as CryptoJS from 'crypto-js';

export class Encriptor {

    secretKey: string = 'OpenSwes2024!@#';

    public encrypt( plaintext: string ) {
        return CryptoJS.AES.encrypt(plaintext, this.secretKey);
    };

    public decrypt( cipherText: string ) {
        return CryptoJS.AES.decrypt(cipherText, this.secretKey);
    }
}


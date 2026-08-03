import * as CryptoJS from 'crypto-js';

export class Encriptor {

    rotatingParameter: string = '!Open*' + new Date().toLocaleDateString() + 'ALM#';

    public encrypt( plaintext: string ) {
        return CryptoJS.AES.encrypt(plaintext, this.rotatingParameter);
    };

    public decrypt( cipherText: string ) {
        return CryptoJS.AES.decrypt(cipherText, this.rotatingParameter);
    }
}

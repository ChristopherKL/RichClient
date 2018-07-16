var cryptico = require('../crypto/cryptico');


export default function createToke(decToken, serverPublicKey) {
    let randomString = (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)).substring(0,16);
    let newToken = cryptico.encrypt(decToken+randomString, serverPublicKey);
  
    return newToken.cipher;
}
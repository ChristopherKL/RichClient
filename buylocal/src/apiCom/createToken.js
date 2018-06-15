var cryptico = require('../crypto/cryptico');
var sha256 = require('../crypto/shaHash');

export default function createToke(decToken, serverPublicKey) {
    let randomString = (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)).substring(0,16);
    let newToken = cryptico.encrypt(decToken+randomString, serverPublicKey);
  
    return newToken.cipher;
}
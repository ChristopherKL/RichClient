//cryptico
var cryptico = require('cryptico');


module.exports = function(passphrase){
    var rsaKeyPair= cryptico.generateRSAKey(passphrase, 1536);//generates RSA key from passphrase of the length 1024
    return rsaKeyPair;
}
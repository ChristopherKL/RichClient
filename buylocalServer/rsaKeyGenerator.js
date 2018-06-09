//cryptico
var cryptico = require('cryptico');

//expects the Password of the User to generate the same RSA Key Pair
module.exports = function(passphrase){
    var rsaKeyPair= cryptico.generateRSAKey(passphrase, 1536);//generates RSA key from passphrase of the length 1024
    return rsaKeyPair;
}
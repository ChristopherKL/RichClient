
    var request = require('request');

    const NodeRSA = require('node-rsa'); // sudo npm install node-rsa
    var crypto = require('crypto');


    //BeispielNutzung:
    // var register = require('./register.js');
  //res.end(register("hansel","hansel@test.de","passwort"));


    //Username Mail and Password is needed to register a new User at the Password
    module.exports = function (givenBenutzerName, givenMail, givenPasswort){
        //returns the PublicKey of the Server
    request.get('http://127.0.0.1:8081/publickey', function(err,httpResponse,body){
        var bodyAsJsonObject = JSON.parse(body);
        var publicKeyFromServer=new NodeRSA();
        publicKeyFromServer.setOptions({encryptionScheme: 'pkcs1'})
        publicKeyFromServer.importKey(bodyAsJsonObject.publicKey,"public", "pkcs1");
        var randomString = (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)).substring(0,16);//generates Random 16 Chars
        
        var hash=crypto.Hash('sha512');
        var passphraseAsSHA = hash.update(givenPasswort).digest('hex'); 

        var passphraseWithExtra = passphraseAsSHA+randomString;
        var passphraseEncrypted = publicKeyFromServer.encrypt(passphraseWithExtra, 'base64', 'utf-8');

        request.post('http://127.0.0.1:8081/register', {
            form: {BenutzerName: givenBenutzerName, Mail: givenMail, Passwort: passphraseEncrypted}
         },function (err, httpResponse,body){
            if(body.success){
                //return True
            }else{
                //return False
                // man kann im Body noch ablesen was falsch lief und hier verschieden fehler behandeln
            }

        });

    });
};
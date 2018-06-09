
    var request = require('request');

    const NodeRSA = require('node-rsa'); // sudo npm install node-rsa
    var crypto = require('crypto');


    /**
     * BSP
     * 
     * var request = require('request');
  var neededPasswort = "passwort";
  var neededMail = "hansel@test.de";

  var rsaKeyGenerator = require("./rsaKeyGenerator");
  var cryptico = require("cryptico");
  var neededPublicKey = cryptico.publicKeyString(rsaKeyGenerator(neededPasswort));
  var login = require('./login');
  res.end(login(null,neededMail,neededPasswort,neededPublicKey));
     */



    //needs the userPassw3ord the PublicKey aqnd Email oder Username to login at the server.
    //The Password is Hashed as SHA 512 and Send to the Server
    //The Server sends back a token encrypted with the Personal Public Key
    module.exports = function (givenBenutzerName, givenMail, givenPasswort, givenPublicKey){
        //gives Back the Public Key of the Server
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

        if(givenMail){// Mail not Null
            request.post('http://127.0.0.1:8081/login', {
                form: {Mail: givenMail, Passwort: passphraseEncrypted, PublicKey: givenPublicKey}
             },function (err, httpResponse,body){
             if(body.success){
                 //body.token liegt der Token drin
                //return True
                }else{
                //return False
                // man kann im Body noch ablesen was falsch lief und hier verschieden fehler behandeln
                }

            });
        }else{
            request.post('http://127.0.0.1:8081/login', {
                form: {BenutzerName: givenBenutzerName, Passwort: passphraseEncrypted, PublicKey: givenPublicKey}
            },function (err, httpResponse,body){
                if(body.success){
                //return True
                }else{
                //return False
                // man kann im Body noch ablesen was falsch lief und hier verschieden fehler behandeln
                }

            });
        }
        

    });
};
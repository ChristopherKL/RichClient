
    var request = require('request');

    const NodeRSA = require('node-rsa'); // sudo npm install node-rsa
    var crypto = require('crypto');


    //we require Username or Mail and Passphrase for this function
    module.exports = function (givenBenutzerName, givenMail, givenPasswort, givenPublicKey){
        //erstmal Public Key vom Server beziehen damit man den Hash sicher verschlüsselt übertragen kann.
    request.get('http://127.0.0.1:8081/publickey', function(err,httpResponse,body){
        var bodyAsJsonObject = JSON.parse(body);
        var publicKeyFromServer=new NodeRSA();
        publicKeyFromServer.setOptions({encryptionScheme: 'pkcs1'})
        publicKeyFromServer.importKey(bodyAsJsonObject.publicKey,"public", "pkcs1");
        var randomString = (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)).substring(0,16);//generates Random 16 Chars
        
        var hash=crypto.Hash('sha512');

        var passphraseAsSHA = hash.update(givenPasswort).digest('hex'); //erstellt einen SHA512 Hash aus dem Passwort und gibt in in Hexadezimal wieder
        
        var passphraseWithExtra = passphraseAsSHA+randomString;
        var passphraseEncrypted = publicKeyFromServer.encrypt(passphraseWithExtra, 'base64', 'utf-8');

        if(givenMail){// Mail not Null
            request.post('http://127.0.0.1:8081/login', {
                form: {Mail: givenMail, Passwort: passphraseEncrypted, PublicKey: givenPublicKey}
             },function (err, httpResponse,body){
             if(body.success){
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
var cryptico = require('../crypto/cryptico');
var sha256 = require('../crypto/shaHash');


export default async function login(usernameOrEmail, passwd, serverPublicKey) {
    let randomString = (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)).substring(0,16);
    let passhash = sha256(passwd);
    let encPasswd = cryptico.encrypt(passhash+randomString, serverPublicKey);
    let myKeyPair = cryptico.generateRSAKey(passwd, 512);

    let formData = {
        BenutzerName: usernameOrEmail,
        Passwort: encPasswd.cipher,
        PublicKey: cryptico.publicKeyString(myKeyPair)
    };
    if(usernameOrEmail.indexOf("@") != -1) {
        formData = {
            Mail: usernameOrEmail,
            Passwort: encPasswd.cipher,
            PublicKey: cryptico.publicKeyString(myKeyPair)
        };
    }
    try {

        let response = await fetch(
          'http://karlpi:8081/login',
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
          }
        );
  
        let responseJson = await response.json();
        console.log(JSON.stringify(responseJson)); 
        if(responseJson.success != true) {
          return responseJson.message;
        }
        let decToken = cryptico.decrypt(responseJson.token, myKeyPair).plaintext;
        let resObj = {id: responseJson.BenutzerId, username: responseJson.BenutzerName, mail: responseJson.Mail, token: decToken,
                        keyPair: myKeyPair};
        return resObj;
      } catch (error) {
        console.error(error);
        return false;
      }

}
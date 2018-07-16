var cryptico = require('../crypto/cryptico');
var sha256 = require('../crypto/shaHash');

export default async function register (username, mail, passwd, serverPublicKey) {
    let randomString = (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)).substring(0,16);
    let passhash = sha256(passwd);
    let encPasswd = cryptico.encrypt(passhash+randomString, serverPublicKey);

    console.log("encPass: "+ encPasswd.cipher);

    
    try {
      let response = await fetch(
        'http://karlspi.ddnss.de:8081/register',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            BenutzerName: username,
            Mail: mail,
            Passwort: encPasswd.cipher
          })
        }
      );
      console.log("got res");

      let responseJson = await response.json();
      console.log(JSON.stringify(responseJson)); 
      if(responseJson.success != true) {
        return responseJson.message;
      }
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
    
  }
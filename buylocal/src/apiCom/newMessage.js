var base64 = require('base64-js');
var cryptico = require('../crypto/cryptico');
var aesjs = require('../crypto/aesjs')


export default async function newMessage (token, negID, plainMsg, myAESKEyCipher, myKeyPair) {
    try {
      let aesKey, toEncrypt, aesCtr, encrypted;


      aesKey = cryptico.decrypt(myAESKEyCipher, myKeyPair).plaintext
      aesKey = base64.toByteArray(aesKey);

      toEncrypt = aesjs.utils.utf8.toBytes(plainMsg);
      aesCtr = new aesjs.ModeOfOperation.ctr(aesKey, new aesjs.Counter(5));
      encrypted = aesCtr.encrypt(toEncrypt);
      
      let response = await fetch(
        'http://karlpi:8081/writenachricht',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            VerhandlungID: negID,
            Text: aesjs.utils.hex.fromBytes(encrypted),
            Token: token
          })
        }
      );
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
var base64 = require('base64-js');
var cryptico = require('../crypto/cryptico');



export default async function beginNegotiation (token, offerId, negTitel, recId, recRSAKey, senderRSAKeyPair) {
    let recKey, senderKey, msgAESKey;

    msgAESKey = []
    for(let keyCounter = 0; keyCounter < 16; keyCounter++) {
        msgAESKey.push(Math.floor(Math.random()*256));
    }
    msgAESKey = new Uint8Array(msgAESKey);
    msgAESKey = base64.fromByteArray(msgAESKey);

    recKey = cryptico.encrypt(msgAESKey, recRSAKey).cipher;
    senderKey = cryptico.encrypt(msgAESKey, cryptico.publicKeyString(senderRSAKeyPair)).cipher;


    try {
      let response = await fetch(
        'http://karlpi:8081/beginverhandlung',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            Betreff: negTitel,
            AngebotID: offerId,
            Empfänger: recId,
            AbsenderSchlüssel: senderKey,
            EmpfängerSchlüssel: recKey,
            Token: token
          })
        }
      );
      
      let responseJson = await response.json();
      console.log(JSON.stringify(responseJson)); 
      if(responseJson.success != true) {
        return responseJson.message;
      }
      responseJson["aesKeyCipher"] = senderKey;
      return responseJson;
    } catch (error) {
      console.error(error);
      return false;
    }
    
  }
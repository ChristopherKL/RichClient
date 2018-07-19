var base64 = require('base64-js');
var cryptico = require('../crypto/cryptico');
var aesjs = require('../crypto/aesjs');


export default async function getNegotiation(token, negId, myAESKEyCipher, myKeyPair) {
    try {
        let aesKey, encryptedData, aesCtr, decryptedBytes;


        aesKey = cryptico.decrypt(myAESKEyCipher, myKeyPair).plaintext
        aesKey = base64.toByteArray(aesKey);


        let response = await fetch(
            'http://karlspi.ddnss.de:8081/nachrichten/'+negId+'/'+encodeURIComponent(token)
        );
        console.log("got res");
  
        let responseJson = await response.json();
        console.log(JSON.stringify(responseJson)); 
        if(responseJson.success == false) {
            return responseJson.message;
        }
        console.log( responseJson.Nachrichten.length);

        responseJson.Nachrichten.forEach((msg) => {
            encryptedData = aesjs.utils.hex.toBytes(msg.Text);
            aesCtr = new aesjs.ModeOfOperation.ctr(aesKey, new aesjs.Counter(5));
            decryptedBytes = aesCtr.decrypt(encryptedData);
            msg.Text = aesjs.utils.utf8.fromBytes(decryptedBytes);
        })

        return responseJson;
      } catch (error) {
            console.error(error);
            return false;
      }
}
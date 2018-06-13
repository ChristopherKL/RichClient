import { Buffer } from 'buffer';

var rsa = require('./crypto/rsa');
var sha256 = require('./crypto/shaHash');




export default class APIConnector {
    apiServer = "";
    userKeyPair = null;
    serverPublicKey = null;



    constructor(apiServer) {
        console.log("APIConnection init");

        this.apiServer = apiServer;

    }
    register = async (username, mail, passwd) => {
        console.log("started");
        let randomString = (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)).substring(0,16);
        let passhash = sha256(passwd);
        console.log(passhash+randomString);
        let encPass = this.serverPublicKey.encrypt(passhash+randomString);

        
        console.log("enecd");
        try {
            let response = await fetch(
              this.apiServer + '/register',
              {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  BenutzerName: username,
                  Mail: mail,
                  Passwort: Buffer.from(encPass).toString('base64')
                }),
              }
            );
            console.log("got res");



            let responseJson = await response.json();
            console.log(JSON.stringify(responseJson)); 

            return true;
          } catch (error) {
            console.error(error);
          }
    
    }

    getServerPublicKey = async () => {

        try {
            let response = await fetch(
              this.apiServer + '/publickey'
            );
            let responseJson = await response.json();
            let keyObj = {n: "", e: responseJson.publicKey.e.toString(10)};
            responseJson.publicKey.n.data.forEach((curr) => {
                    keyObj.n += curr.toString(16);
                }
            )
            this.serverPublicKey = new rsa();
    
            this.serverPublicKey.setPublicString(JSON.stringify(keyObj))
            console.log("Got Key"); 
            await this.register("abc", "xxx@aaa.de", "roflrofl");
            return true;
          } catch (error) {
            return false;
          }
    }


}



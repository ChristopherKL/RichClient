var RSAKey = require('./crypto/rsa');


export default class APIConnector {
    apiServer = "";
    userKeyPair = null;
    serverPublicKey = null;



    constructor(apiServer) {
        console.log("APIConnection init");

        this.apiServer = apiServer;

    }


    getServerPublicKey = async () => {

        try {
            let response = await fetch(
              this.apiServer + '/publickey'
            );
            let responseJson = await response.json();

            console.log("Got Key"); 
            return true;
          } catch (error) {
            return false;
          }
    }


}



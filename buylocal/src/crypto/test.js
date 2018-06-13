const rsa=require('./rsa');

let responseJson = {"success":true,"publicKey":{"n":{"type":"Buffer","data":[0,227,209,68,89,103,224,198,142,19,20,104,200,128,44,237,46,81,215,45,192,4,60,112,42,67,48,107,162,149,246,138,82,25,13,141,64,66,166,108,218,227,245,144,239,182,131,147,120,28,163,104,207,52,20,48,25,44,4,120,169,14,163,58,65]},"e":65537}};
let keyObj = {n: "", e: responseJson.publicKey.e.toString(10)};
responseJson.publicKey.n.data.forEach((curr) => {
        keyObj.n += curr.toString(16);
    }
)
let serverPublicKey = new rsa();

serverPublicKey.setPublicString(JSON.stringify(keyObj))

console.log(Buffer.from(serverPublicKey.encrypt("pass")).toString("base64"));

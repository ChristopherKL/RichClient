var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var port = process.env.PORT || 8080; // used to create, sign, and verify tokens
// use body parser so we can get info from POST and/or URL parameters
const secret = require('crypto').randomBytes(64).toString('hex').substring(0,16);

//creates Token from an ID, Username and a Mailadress
// Tokens expire in 24 Hours and user SHA256 as algorithm
module.exports = function (givenBenutzerID){
    this.payload={BenutzerID: givenBenutzerID}
    var token = jwt.sign(payload,secret, {expiresIn:24*60*60,issuer:"buylocal", algorithm:'HS256'});
    return token;
}

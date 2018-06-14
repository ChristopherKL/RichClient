let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
let expect = chai.expect;

const cryptico = require("cryptico");
chai.use(chaiHttp);

describe("/Get User",function() {
    this.timeout(0);
    var token;
    var keyFromServerAsString;
    var keyFromUser;
    var eigeneId;
    before(function(done) {
        keyFromUser = cryptico.generateRSAKey("Testpasswort", 2048);
        chai.request("http://localhost:8081")
        .get('/publickey')
        .end((err, res) => {
          keyFromServerAsString=res.body.publicKey;
          var pwAsHash = "201d51609126ebe00d8c742248bd0ffcf4ce884d6211d88939a878fd95d56e2d";
          var randomString = (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)).substring(0,16);
          var pw = cryptico.encrypt(pwAsHash+randomString, keyFromServerAsString);
          let request= {
            BenutzerName:"TestuserUser",
            Mail:"testUser@test.de",
            Passwort:pw.cipher
           }
          chai.request("http://localhost:8081")
              .post("/register")
              .send(request)
              .end((err, res) =>{
                let request2= {
                    BenutzerName:"TestuserUser",
                    Passwort:pw.cipher,
                    PublicKey:cryptico.publicKeyString(keyFromUser)
                   }
                  chai.request("http://localhost:8081")
                    .post("/login")
                    .send(request2)
                    .end((err, res) =>{
                        token=cryptico.decrypt(res.body.token,keyFromUser).plaintext;
                        eigeneId=res.body.BenutzerId;
                     done();
                    });
                });
        });
    });
    after(function(){
        var Benutzer = require("../server/models/benutzer")
        Benutzer.destroy({
          where:{BenutzerName:"TestuserUser",Mail:"testUser@test.de"}
        });
      });
    it('request info of own User',(done) => {
        var randomString = (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)).substring(0,16);
        var encryptedToken=encodeURIComponent(cryptico.encrypt(token+randomString,keyFromServerAsString).cipher);
        chai.request("http://localhost:8081")
            .get("/user/"+eigeneId+"/"+encryptedToken)
            .end((err, res) =>{
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('success');
                chai.assert.isTrue(res.body.success);
                res.body.should.have.property("BenutzerName");
                chai.assert.equal("TestuserUser",res.body.BenutzerName);
                done();
            });
    });
    it('request info about not defined User',(done) => {
        var randomString = (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)).substring(0,16);
        var encryptedToken=encodeURIComponent(cryptico.encrypt(token+randomString,keyFromServerAsString).cipher);
        chai.request("http://localhost:8081")
            .get("/user/"+9999999+"/"+encryptedToken)
            .end((err, res) =>{
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('success');
                chai.assert.isNotTrue(res.body.success);
                chai.assert.equal("Nutzer nicht vorhanden",res.body.message);
                done();
            });
    });
    it('request info about User with false Token',(done) => {
        var encryptedToken=encodeURIComponent(cryptico.encrypt(token,keyFromServerAsString).cipher);
        chai.request("http://localhost:8081")
            .get("/user/"+eigeneId+"/"+encryptedToken)
            .end((err, res) =>{
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('success');
                chai.assert.isNotTrue(res.body.success);
                chai.assert.equal("Token falsch",res.body.message);
                done();
            });
    });

});
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
let expect = chai.expect;

const cryptico = require("cryptico");
chai.use(chaiHttp);

describe("/POSt changeuser",function() {
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
            BenutzerName:"TestuserChangeuser",
            Mail:"testchange@test.de",
            Passwort:pw.cipher
           }
          chai.request("http://localhost:8081")
              .post("/register")
              .send(request)
              .end((err, res) =>{
                let request2= {
                    BenutzerName:"TestuserChangeuser",
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
          where:{BenutzerName:"TestuserChangeuser",Mail:"testchange@test.de"}
        });

        Benutzer.destroy({
            where:{BenutzerName:"TestuserChangeuserChanged",Mail:"testchangechanged@test.de"}
          });
      });
    it('alter Username and Mail',(done) => {
        var randomString = (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)).substring(0,16);
        var encryptedToken=cryptico.encrypt(token+randomString, keyFromServerAsString).cipher;
        var requestChange={
            Token:encryptedToken,
            BenutzerName:"TestuserChangeuserChanged",
            Mail:"testchangechanged@test.de"
        }
        chai.request("http://localhost:8081")
            .post("/changeuser")
            .send(requestChange)
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('success');
                chai.assert.isTrue(res.body.success);
                res.body.should.have.property("BenutzerName");
                chai.assert.equal("TestuserChangeuserChanged",res.body.BenutzerName);
                var Benutzer = require("../server/models/benutzer")
                Benutzer.findOne({
                    where: {Mail: "testchangechanged@test.de"}}).then(benutzer =>{
                        if(benutzer){
                            done();
                        }else{
                            chai.assert.fail();
                            done();
                        }
                    });
            });
    });
    it('try alter with wrong Token',(done) => {
        var encryptedToken=cryptico.encrypt(token,keyFromServerAsString).cipher;
        var requestChange={
            Token:encryptedToken,
            BenutzerName:"TestuserChangeuserChanged",
            Mail:"testchangechanged@test.de"
        }
        chai.request("http://localhost:8081")
            .post("/changeuser")
            .send(requestChange)
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('success');
                chai.assert.isNotTrue(res.body.success);
                res.body.should.have.property("message");
                chai.assert.equal("Token nicht entschlüsselbar",res.body.message);
                done();
            });
    });
    it('try alter with wrong Parameters',(done) => {
        var encryptedToken=cryptico.encrypt(token,keyFromServerAsString).cipher;
        var requestChange={
            Token:encryptedToken,
            BenutzerName:"TestuserChangeuserChanged"
        }
        chai.request("http://localhost:8081")
            .post("/changeuser")
            .send(requestChange)
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('success');
                chai.assert.isNotTrue(res.body.success);
                res.body.should.have.property("message");
                chai.assert.equal("Fehlerhafte Anfrage",res.body.message);
                done();
            });

    });
});
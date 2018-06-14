let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
let expect = chai.expect;

chai.use(chaiHttp);

describe("/POST login",function() {
    this.timeout(0);
    var keyFromServerAsString;
    const cryptico = require('cryptico');
    var key; 
    before(function(done) {
      key = cryptico.generateRSAKey("Testpasswort", 2048);
      chai.request("http://localhost:8081")
        .get('/publickey')
        .end((err, res) => {
          keyFromServerAsString=res.body.publicKey;
          var pwAsHash = "201d51609126ebe00d8c742248bd0ffcf4ce884d6211d88939a878fd95d56e2d";
          var randomString = (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)).substring(0,16);
          var pw = cryptico.encrypt(pwAsHash+randomString, keyFromServerAsString);
          let request= {
            BenutzerName:"Testuser",
            Mail:"test@test.de",
            Passwort:pw.cipher
           }
          chai.request("http://localhost:8081")
              .post("/register")
              .send(request)
              .end((err, res) =>{
              done();
          });
        });
    });
    after(function(){
      var Benutzer = require("../server/models/benutzer")
      Benutzer.destroy({
        where:{BenutzerName:"Testuser",Mail:"test@test.de"}
      });
    });
  
    it('logs a user in with Username ',(done) => {
      var pwAsHash = "201d51609126ebe00d8c742248bd0ffcf4ce884d6211d88939a878fd95d56e2d";
      var randomString = (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)).substring(0,16);
      var pw = cryptico.encrypt(pwAsHash+randomString, keyFromServerAsString);
      let request= {
        BenutzerName:"Testuser",
        Passwort:pw.cipher,
        PublicKey:cryptico.publicKeyString(key)
      }
      chai.request("http://localhost:8081")
              .post("/login")
              .send(request)
              .end((err, res) =>{
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('success');
                chai.assert.isTrue(res.body.success);
                res.body.should.have.property("message");
                chai.assert.equal("Ein Token",res.body.message);
                res.body.should.have.property("token");
                chai.assert.isNotNull(res.body.token);
                done();
              });
    });
    it('logs a user in with Mail ',(done) => {
      var pwAsHash = "201d51609126ebe00d8c742248bd0ffcf4ce884d6211d88939a878fd95d56e2d";
      var randomString = (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)).substring(0,16);
      var pw = cryptico.encrypt(pwAsHash+randomString, keyFromServerAsString);
      let request= {
        Mail:"test@test.de",
        Passwort:pw.cipher,
        PublicKey:cryptico.publicKeyString(key)
      }
      chai.request("http://localhost:8081")
              .post("/login")
              .send(request)
              .end((err, res) =>{
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('success');
                chai.assert.isTrue(res.body.success);
                res.body.should.have.property("message");
                chai.assert.equal("Ein Token",res.body.message);
                res.body.should.have.property("token");
                chai.assert.isNotNull(res.body.token);
                done();
          });
  
    });
    it('wrong Password at Login',(done) => {
      var pwAsHash = "das ist das Falsche passwort";
      var randomString = (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)).substring(0,16);
      var pw = cryptico.encrypt(pwAsHash+randomString, keyFromServerAsString);
      let request= {
        BenutzerName:"Testuser",
        Passwort:pw.cipher,
        PublicKey:cryptico.publicKeyString(key)
      }
      chai.request("http://localhost:8081")
              .post("/login")
              .send(request)
              .end((err, res) =>{
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('success');
                chai.assert.isNotTrue(res.body.success);
                res.body.should.have.property("message");
                chai.assert.equal("Passwort falsch",res.body.message);
              done();
      });
    });
  
    it('wrong Username at Login',(done) => {
      var pwAsHash = "201d51609126ebe00d8c742248bd0ffcf4ce884d6211d88939a878fd95d56e2d";
      var randomString = (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)).substring(0,16);
      var pw = cryptico.encrypt(pwAsHash+randomString, keyFromServerAsString);
      let request= {
        BenutzerName:"Testuser1",
        Passwort:pw.cipher,
        PublicKey:cryptico.publicKeyString(key)
      }
      chai.request("http://localhost:8081")
              .post("/login")
              .send(request)
              .end((err, res) =>{
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('success');
                chai.assert.isNotTrue(res.body.success);
                res.body.should.have.property("message");
                chai.assert.equal("Kein Nutzer mit dem Benutzernamen",res.body.message);
              done();
          });
      
    });
  });
  
  
  
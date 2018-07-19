let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
let expect = chai.expect;

chai.use(chaiHttp);

describe("/POST login",function() {
    this.timeout(10000);
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
            BenutzerName:"TestuserLogin",
            Mail:"testlogin@test.de",
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
    after(function(done){
      var Benutzer = require("../server/models/benutzer")
      Benutzer.destroy({
        where:{BenutzerName:"TestuserLogin",Mail:"testlogin@test.de"}
      });
      done();
    });
  
    it('logs a user in with Username ',function(done){
      var pwAsHash = "201d51609126ebe00d8c742248bd0ffcf4ce884d6211d88939a878fd95d56e2d";
      var randomString = (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)).substring(0,16);
      var pw = cryptico.encrypt(pwAsHash+randomString, keyFromServerAsString);
      let request= {
        BenutzerName:"TestuserLogin",
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
                res.body.success.should.be.true;
                res.body.should.have.property("message");
                res.body.message.should.equal("Ein Token");
                res.body.should.have.property("token");
                should.exist(res.body.token);
                done();
              });
    });
    it('logs a user in with Mail ',function(done){
      var pwAsHash = "201d51609126ebe00d8c742248bd0ffcf4ce884d6211d88939a878fd95d56e2d";
      var randomString = (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)).substring(0,16);
      var pw = cryptico.encrypt(pwAsHash+randomString, keyFromServerAsString);
      let request= {
        Mail:"testlogin@test.de",
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
                res.body.success.should.be.true;
                res.body.should.have.property("message");
                res.body.message.should.equal("Ein Token");
                res.body.should.have.property("token");
                should.exist(res.body.token);
                done();
          });
  
    });
    it('wrong Password at Login',function(done){
      var pwAsHash = "das ist das Falsche passwort";
      var randomString = (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)).substring(0,16);
      var pw = cryptico.encrypt(pwAsHash+randomString, keyFromServerAsString);
      let request= {
        BenutzerName:"TestuserLogin",
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
                res.body.success.should.not.be.true;
                res.body.should.have.property("message");
                res.body.message.should.equal("Passwort falsch");
                done();
      });
    });
  
    it('wrong Username at Login',function(done){
      var pwAsHash = "201d51609126ebe00d8c742248bd0ffcf4ce884d6211d88939a878fd95d56e2d";
      var randomString = (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)).substring(0,16);
      var pw = cryptico.encrypt(pwAsHash+randomString, keyFromServerAsString);
      let request= {
        BenutzerName:"TestuserFALSE1",
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
                res.body.success.should.not.be.true;
                res.body.should.have.property("message");
                res.body.message.should.equal("Kein Nutzer mit dem Benutzernamen");
                done();
          });
      
    });
  });
  
  
  
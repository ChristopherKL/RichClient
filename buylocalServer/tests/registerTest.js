let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
let expect = chai.expect;

const cryptico = require("cryptico");
chai.use(chaiHttp);

describe("/POST register", () =>{
    var keyFromServerAsString;
    before(function(done) {
      chai.request("http://localhost:8081")
        .get('/publickey')
        .end((err, res) => {
          keyFromServerAsString=res.body.publicKey;
          done();
        });
    });
  
    after(function(){
      var Benutzer = require("../server/models/benutzer")
      Benutzer.destroy({
        where:{BenutzerName:"Otto",Mail:"otto@otto.de"}
      });
    });
  
    it('register a User',(done) => {
      var pwAsHash = "201d51609126ebe00d8c742248bd0ffcf4ce884d6211d88939a878fd95d56e2d";
      var randomString = (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)).substring(0,16);
      var pw = cryptico.encrypt(pwAsHash+randomString, keyFromServerAsString);
      let request= {
        BenutzerName:"Otto",
        Mail:"otto@otto.de",
        Passwort:pw.cipher
      }
      chai.request("http://localhost:8081")
          .post("/register")
          .send(request)
          .end((err, res) =>{
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('success');
            chai.assert.isTrue(res.body.success);
            done();
      });
    });
    it('register an already existent User',(done) => {
      var pwAsHash = "201d51609126ebe00d8c742248bd0ffcf4ce884d6211d88939a878fd95d56e2d";
      var randomString = (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)).substring(0,16);
      var pw = cryptico.encrypt(pwAsHash+randomString, keyFromServerAsString);
      let request= {
        BenutzerName:"Otto",
        Mail:"otto@otto.de",
        Passwort:pw
      }
      chai.request("http://localhost:8081")
          .post("/register")
          .send(request)
          .end((err, res) =>{
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('success');
            chai.assert.isNotTrue(res.body.success);
            done();
      });
    });
  });
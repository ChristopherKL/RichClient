let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
let expect = chai.expect;

const cryptico = require("cryptico");
chai.use(chaiHttp);

describe("smoke test", function() {
  it("checks equality", function() {
    expect(true).to.be.true;
  });
});
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
    var Sequelize = require('sequelize');
    var sequelize = new Sequelize('mysql://buylocalAPI:buyl0cal@localhost:3306/buylocal');
    var Benutzer = require("../server/models/benutzer")
    Benutzer.destroy({
      where:{BenutzerName:"Otto",Mail:"otto@otto.de"}
    });
  });

  it('register a User',(done) => {
    var pwAsHash = "33c5ebbb01d608c254b3b12413bdb03e46c12797e591770ccf20f5e2819929b2";
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
    var pwAsHash = "33c5ebbb01d608c254b3b12413bdb03e46c12797e591770ccf20f5e2819929b2";
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

describe('/GET publickey', () => {
    it('it should GET the Public Key', (done) => {
      chai.request("http://localhost:8081")
          .get('/publickey')
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('success');
              chai.assert.isTrue(res.body.success);
              res.body.should.have.property('publicKey');
              res.body.publicKey.exists;
            done();
          });
    });
});


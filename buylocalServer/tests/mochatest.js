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
              console.log(res.body.Passwort);
              res.body.publicKey.exists;
            done();
          });
    });
});
describe("/POST register of already registered User", () =>{
  it('it should register an user using the public key encrypted Password',(done) => {

var keyFromServerAsString;
  chai.request("http://localhost:8081")
      .get('/publickey')
      .end((err, res) => {
        keyFromServerAsString=res.body.publicKey;
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
});

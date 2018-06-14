let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
let expect = chai.expect;

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
              res.body.success.isTrue;
              res.body.publicKey.exists;
              var NodeRSA = require('node-rsa');
              var key = new NodeRSA();
              key.importKey(res.body.publicKey,"public");
              key.isEmpty.isFalse;
            done();
          });
    });
});
describe("/POST register", () =>{
  it('it should register an user using the public key encrypted Password')
  .post("/register")
  .send()
  .end((err, res) =>{
    done();
  });
});

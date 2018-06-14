let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
let expect = chai.expect;

const cryptico = require("cryptico");
chai.use(chaiHttp);


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





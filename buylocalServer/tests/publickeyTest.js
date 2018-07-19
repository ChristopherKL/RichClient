let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
let expect = chai.expect;

const cryptico = require("cryptico");
chai.use(chaiHttp);


describe('/GET publickey', () => {
  it('it should GET the Public Key', function(done){
    chai.request("http://localhost:8081")
        .get('/publickey')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('success');
            res.body.success.should.be.true;
            res.body.should.have.property('publicKey');
            should.exist(res.body.publicKey);
            done();
        });
  });
});





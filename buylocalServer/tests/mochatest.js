let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();



describe("smoke test", function() {
  it("checks equality", function() {
    expect(true).to.be.true;
  });
});

describe('/GET publickey', () => {
    it('it should GET the Public Key', (done) => {
      chai.request(server)
          .get('/publickey')
          .end((err, res) => {
              res.should.have.status(200);
              res.body.success.to.be.true;
            done();
          });
    });
});

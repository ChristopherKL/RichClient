let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
let expect = chai.expect;

const Sequelize=require("sequelize");
const Op = Sequelize.Op;

const cryptico = require("cryptico");
chai.use(chaiHttp);

describe("/Get verhandlungen",function() {
    this.timeout(10000);
    var token;
    var keyFromServerAsString;
    var keyFromUser;
    var eigeneId;
    var partnerId;
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
            BenutzerName:"TestuserVerhandlungen",
            Mail:"testVerhandlungen@test.de",
            Passwort:pw.cipher
           }
           let requestBenutzer2= {
            BenutzerName:"TestuserVerhandlungen2",
            Mail:"testVerhandlungen2@test.de",
            Passwort:pw.cipher
           }
           chai.request("http://localhost:8081")
           .post("/register")
           .send(requestBenutzer2)
           .end((err, res) =>{
             let request2= {
                 BenutzerName:"TestuserVerhandlungen2",
                 Passwort:pw.cipher,
                 PublicKey:cryptico.publicKeyString(keyFromUser)
                }
               chai.request("http://localhost:8081")
                 .post("/login")
                 .send(request2)
                 .end((err, res) =>{
                     partnerId=res.body.BenutzerId;
                 });
             });
          chai.request("http://localhost:8081")
              .post("/register")
              .send(request)
              .end((err, res) =>{
                let request2= {
                    BenutzerName:"TestuserVerhandlungen",
                    Passwort:pw.cipher,
                    PublicKey:cryptico.publicKeyString(keyFromUser)
                   }
                  chai.request("http://localhost:8081")
                    .post("/login")
                    .send(request2)
                    .end((err, res) =>{
                        token=cryptico.decrypt(res.body.token,keyFromUser).plaintext;
                        var encryptedToken=cryptico.encrypt(token+randomString, keyFromServerAsString).cipher;
                        eigeneId=res.body.BenutzerId;
                        var Verhandlung = require("../server/models/verhandlung");
                            Verhandlung.create({
                            VerhandlungID: 222,
                            Betreff: "bla",
                            Absender: eigeneId,
                            Empfänger: partnerId,
                            AbsenderSchlüssel: "egal1",
                            EmpfängerSchlüssel: "egal2",
                        }).then(a=>{
                            var Verhandlung = require("../server/models/verhandlung");
                            Verhandlung.create({
                                VerhandlungID: 221,
                                Betreff: "bla2",
                                Absender: partnerId,
                                Empfänger: eigeneId,
                                AbsenderSchlüssel: "egal1",
                                EmpfängerSchlüssel: "egal2",
                            }).then(a=>{
                            done();
                        })
                    })
                });
            });
        
        })
    });
    after(function(done){
        var Benutzer = require("../server/models/benutzer");
        var Verhandlung = require("../server/models/verhandlung");
        Verhandlung.destroy({
           where:{[Sequelize.Op.or]:[{VerhandlungID:222},{VerhandlungID:221}]}
        }).then(a=>{
            Benutzer.destroy({
                where:{BenutzerName:"TestuserVerhandlungen2"}
                }).then(a=>{
                    Benutzer.destroy({
                        where:{BenutzerName:"TestuserVerhandlungen"}
                    }).then(a=>{done()});
                })
        });
    });
    it('request info about Verhandlungen',function(done){
        var randomString = (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)).substring(0,16);
        var encryptedToken=encodeURIComponent(cryptico.encrypt(token+randomString,keyFromServerAsString).cipher);
        chai.request("http://localhost:8081")
            .get("/verhandlungen/"+encryptedToken)
            .end((err, res) =>{
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('success');
                res.body.success.should.be.true;
                res.body.should.have.property("VerhandlungenAbsender");
                var absenderarray=JSON.parse(res.body.VerhandlungenAbsender);
                absenderarray[0].Verhandlung.VerhandlungID.should.equal(222);
                done();
            });
    });
    
    it('request info about Verhandlungen with false Token',function(done){
        var encryptedToken=encodeURIComponent(cryptico.encrypt(token,keyFromServerAsString).cipher);
        chai.request("http://localhost:8081")
            .get("/verhandlungen/"+encryptedToken)
            .end((err, res) =>{
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('success');
                res.body.success.should.not.be.true;
                res.body.message.should.equal("Token falsch");
                done();
            });
    });
});
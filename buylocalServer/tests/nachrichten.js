let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
let expect = chai.expect;

const Sequelize=require("sequelize");
const Op = Sequelize.Op;

const cryptico = require("cryptico");
chai.use(chaiHttp);

describe("/Get nachrichten",function() {
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
            BenutzerName:"TestuserNachrichten",
            Mail:"testNachrichten@test.de",
            Passwort:pw.cipher
           }
           let requestBenutzer2= {
            BenutzerName:"TestuserNachrichten2",
            Mail:"testNachrichten2@test.de",
            Passwort:pw.cipher
           }
           chai.request("http://localhost:8081")
           .post("/register")
           .send(requestBenutzer2)
           .end((err, res) =>{
             let request2= {
                 BenutzerName:"TestuserNachrichten2",
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
                    BenutzerName:"TestuserNachrichten",
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
                            VerhandlungID: 223,
                            Betreff: "bla",
                            Absender: eigeneId,
                            Empfänger: partnerId,
                            AbsenderSchlüssel: "egal1",
                            EmpfängerSchlüssel: "egal2",
                        }).then(verhandlung=>{
                            var Nachricht= require("../server/models/nachricht");
                            Nachricht.create({
                                NachrichtID:111,
                                VerhandlungID: verhandlung.VerhandlungID,
                                Text:"toller TExt",
                                Absender: eigeneId,
                                Gelesen:Date.now(),
                                Datum: Date.now()
                            }).then(a=>{
                                Nachricht.create({
                                    NachrichtID:112,
                                    VerhandlungID: verhandlung.VerhandlungID,
                                    Text:"toller TExt",
                                    Absender: eigeneId,
                                    Gelesen:Date.now(),
                                    Datum: Date.now()
                                }).then(a=>{
                                done();
                                });
                            });
                        })
                });
            });
        
        })
    });
    after(function(done){
        var Benutzer = require("../server/models/benutzer");
        var Verhandlung = require("../server/models/verhandlung");
        var Nachricht = require("../server/models/nachricht");
        Nachricht.destroy({where:{[Sequelize.Op.or]:[{NachrichtID:111},{NachrichtID:112}]}}).then(a=>{
        Verhandlung.destroy({
            where:{VerhandlungID: 223}
        }).then(a=>{
            Benutzer.destroy({
                where:{BenutzerName:"TestuserNachrichten2"}
                }).then(a=>{
                    Benutzer.destroy({
                        where:{BenutzerName:"TestuserNachrichten"}
                    }).then(a=>{done()});
                })
            });
        });
    });
    it('request info about Nachrichten',function(done){
        var randomString = (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)).substring(0,16);
        var encryptedToken=encodeURIComponent(cryptico.encrypt(token+randomString,keyFromServerAsString).cipher);
        chai.request("http://localhost:8081")
            .get("/nachrichten/223/"+encryptedToken)
            .end((err, res) =>{

                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('success');
                res.body.success.should.be.true;
                console.log(res.body);
                done();
            });
    });
    it('request info about Nachrichten with false ID',function(done){
        var randomString = (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)).substring(0,16);
        var encryptedToken=encodeURIComponent(cryptico.encrypt(token+randomString,keyFromServerAsString).cipher);
        chai.request("http://localhost:8081")
            .get("/nachrichten/222/"+encryptedToken)
            .end((err, res) =>{
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('success');
                res.body.success.should.not.be.true;
                res.body.message.should.equal("Verhandlung nicht vorhanden");
                done();
            });
    });
    it('request info about Verhandlungen with false Token',function(done){
        var encryptedToken=encodeURIComponent(cryptico.encrypt(token,keyFromServerAsString).cipher);
        chai.request("http://localhost:8081")
            .get("/nachrichten/222/"+encryptedToken)
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
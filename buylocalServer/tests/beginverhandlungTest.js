let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
let expect = chai.expect;
const Sequelize=require("sequelize");
const Op = Sequelize.Op;
const cryptico = require("cryptico");
chai.use(chaiHttp);

describe("/POSt beginverhandlung",function() {
    this.timeout(80000);
    var token;
    var keyFromServerAsString;
    var keyFromUser;
    var eigeneId;
    var fremdeId;
    var angebotId;
    before(function(done) {
        var Kategorie = require("../server/models/kategorie");
        Kategorie.create({KategorieID:781, Name:"testkategorie" });
        keyFromUser = cryptico.generateRSAKey("Testpasswort", 2048);
        chai.request("http://localhost:8081")
        .get('/publickey')
        .end((err, res) => {
          keyFromServerAsString=res.body.publicKey;
          var pwAsHash = "201d51609126ebe00d8c742248bd0ffcf4ce884d6211d88939a878fd95d56e2d";
          var randomString = (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)).substring(0,16);
          var pw = cryptico.encrypt(pwAsHash+randomString, keyFromServerAsString);
          let requestbenutzer= {
            BenutzerName:"Testuserbeginverhandlung2",
            Mail:"testverhandlung2@test.de",
            Passwort:pw.cipher
           }
          chai.request("http://localhost:8081")
          .post("/register")
          .send(requestbenutzer)
          .end((err, res) =>{
            let requestverhandlung2= {
                BenutzerName:"Testuserbeginverhandlung2",
                Passwort:pw.cipher,
                PublicKey:cryptico.publicKeyString(keyFromUser)
               }
               chai.request("http://localhost:8081")
                    .post("/login")
                    .send(requestverhandlung2)
                    .end((err, res) =>{
                        fremdeId=res.body.BenutzerId;
                    });

          });
          let request= {
            BenutzerName:"Testuserbeginverhandlung",
            Mail:"testverhandlung@test.de",
            Passwort:pw.cipher
           }
          chai.request("http://localhost:8081")
              .post("/register")
              .send(request)
              .end((err, res) =>{
                let request2= {
                    BenutzerName:"Testuserbeginverhandlung",
                    Passwort:pw.cipher,
                    PublicKey:cryptico.publicKeyString(keyFromUser)
                   }
                  chai.request("http://localhost:8081")
                    .post("/login")
                    .send(request2)
                    .end((err, res) =>{
                        token=cryptico.decrypt(res.body.token,keyFromUser).plaintext;
                        eigeneId=res.body.BenutzerId;
                        var randomString = (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)).substring(0,16);
                        var encryptedToken=cryptico.encrypt(token+randomString, keyFromServerAsString).cipher;
                        let request3={
                            Token:encryptedToken,
                            Titel:"AngebotVerhandlung",
                            PLZ:"47228",
                            Bild1:"LANGER BILDTEXT FÜR TEST IST DIE LÄNGE ABER ERSTMAL EGAL",
                            Preis:99.99,
                            Straße:"Kahlacker",
                            Hausnummer:"29",
                            KategorieID:781,
                        }
                  chai.request("http://localhost:8081")
                    .post("/createangebot")
                    .send(request3)
                    .end((err, res) =>{
                        angebotId=res.body.AngebotID;
                        done();
                        });
                    });
                });
        });
    });
    after(function(done){   
        var Angebot = require("../server/models/angebot");
        var Hashtag = require("../server/models/hashtag");
        var Kategorie = require("../server/models/kategorie");
        var Benutzer = require("../server/models/benutzer");
        var Verhandlung = require("../server/models/verhandlung");

                Angebot.destroy({where:{Titel:"AngebotVerhandlung"}}).then(a=>{
                    Kategorie.destroy({where:{KategorieID:781}}).then(a=>{
                        Verhandlung.destroy({where:{Betreff:"Verhandlung 1"}}).then(a=>{
                            Benutzer.destroy({
                                where:{[Op.or]:[{BenutzerName:"Testuserbeginverhandlung"},{BenutzerName:"Testuserbeginverhandlung2"}]}
                            }).then(a=>{done()});

                            });
                        });
                    });

    });

      it('create Verhandlung',(done)=>{
        var randomString = (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)).substring(0,16);
        var encryptedToken=cryptico.encrypt(token+randomString, keyFromServerAsString).cipher;
        var requestbeginVerhandlung={
            Token:encryptedToken,
            Betreff:"Verhandlung 1",
            Empfänger:fremdeId,
            AbsenderSchlüssel:"1",
            EmpfängerSchlüssel:"2",
            AngebotID:angebotId
        }
        chai.request("http://localhost:8081")
            .post("/beginverhandlung")
            .send(requestbeginVerhandlung)
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('success');
                res.body.success.should.be.true;
                res.body.should.have.property("VerhandlungID")
                done();
                })
      });
      it('try create with wrong Parameters',(done)=>{
        var randomString = (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)).substring(0,16);
        var encryptedToken=cryptico.encrypt(token+randomString, keyFromServerAsString).cipher;
        var requestverhandlung={
            Token:encryptedToken,
            Betreff:"Verhandlung 1",
            AbsenderSchlüssel:"1",
            EmpfängerSchlüssel:"2",
            AngebotID:angebotId
        }
        chai.request("http://localhost:8081")
            .post("/beginverhandlung")
            .send(requestverhandlung)
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('success');
                res.body.success.should.not.be.true;
                res.body.should.have.property("message");
                res.body.message.should.equal("Fehlerhafte Anfrage");
                done();
            });
      });
      it('try create with defect Token',(done)=>{
        var encryptedToken=cryptico.encrypt(token, keyFromServerAsString).cipher;
        var requestbeginVerhandlung={
            Token:encryptedToken,
            Betreff:"Verhandlung 1",
            Empfänger:fremdeId,
            AbsenderSchlüssel:"1",
            EmpfängerSchlüssel:"2",
            AngebotID:angebotId
        }
        chai.request("http://localhost:8081")
            .post("/beginverhandlung")
            .send(requestbeginVerhandlung)
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('success');
                res.body.success.should.not.be.true;
                res.body.should.have.property("message");
                res.body.message.should.equal("Token nicht entschlüsselbar");
                done();             
        });    
      });
});
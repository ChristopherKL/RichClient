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
    this.timeout(80000);
    var token;
    var keyFromServerAsString;
    var keyFromUser;
    var eigeneId;
    var fremdeId;
    var angebotId;
    var verhandlungId;
    before(function(done) {
        var Kategorie = require("../server/models/kategorie");
        Kategorie.create({KategorieID:783, Name:"testkategorie" });
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
                            KategorieID:783,
                        }
                        chai.request("http://localhost:8081")
                        .post("/createangebot")
                        .send(request3)
                        .end((err, res) =>{
                            angebotId=res.body.AngebotID;
                            var requestbeginVerhandlung={
                                Token:encryptedToken,
                                Betreff:"VerhandlungWriteNachricht",
                                Empfänger:fremdeId,
                                AbsenderSchlüssel:"1",
                                EmpfängerSchlüssel:"2",
                                AngebotID:angebotId
                            }
                            chai.request("http://localhost:8081")
                                .post("/beginverhandlung")
                                .send(requestbeginVerhandlung)
                                .end((err,res)=>{
                                    verhandlungId=res.body.VerhandlungID;
                                    var randomString = (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)).substring(0,16);
                                    var encryptedToken=cryptico.encrypt(token+randomString, keyFromServerAsString).cipher;
                                    var requestWrite={
                                        Token:encryptedToken,
                                        VerhandlungID:verhandlungId,
                                        Text:"blablbalblablaslb"
                                    }
                                    chai.request("http://localhost:8081")
                                    .post("/writenachricht")
                                    .send(requestWrite)
                                    .end((err,res)=>{
                                        done();
                                    })
                                })
                            });
                        });
                    });
                });
        });
    after(function(done){   
        var Angebot = require("../server/models/angebot");
        var Kategorie = require("../server/models/kategorie");
        var Benutzer = require("../server/models/benutzer");
        var Verhandlung = require("../server/models/verhandlung");

                Angebot.destroy({where:{Titel:"AngebotVerhandlung"}}).then(a=>{
                    Kategorie.destroy({where:{KategorieID:783}}).then(a=>{
                        Verhandlung.destroy({where:{Betreff:"VerhandlungWriteNachricht"}}).then(a=>{
                            Benutzer.destroy({
                                where:{[Op.or]:[{BenutzerName:"Testuserbeginverhandlung"},{BenutzerName:"Testuserbeginverhandlung2"}]}
                            }).then(a=>{done()});

                            });
                        });
                    });

    });

      it('get Nachrichten',(done)=>{
        var randomString = (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)).substring(0,16);
        var encryptedToken=encodeURIComponent(cryptico.encrypt(token+randomString,keyFromServerAsString).cipher);
        chai.request("http://localhost:8081")
        .get("/nachrichten/"+verhandlungId+"/"+encryptedToken)
        .end((err,res)=>{
            console.log(res.body);
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('success');
                res.body.success.should.be.true;
                done();
                })
      });
      it('try get nachrichten with defect Token',(done)=>{
        var encryptedToken=encodeURIComponent(cryptico.encrypt(token,keyFromServerAsString).cipher);
        chai.request("http://localhost:8081")
        .get("/nachrichten/"+verhandlungId+"/"+encryptedToken)
        .end((err,res)=>{
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('success');
            res.body.success.should.not.be.true;
            res.body.should.have.property("message");
            res.body.message.should.equal("Token falsch");
            done();             
        });    
      });
});
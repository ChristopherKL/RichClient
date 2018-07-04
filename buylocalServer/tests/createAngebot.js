let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
let expect = chai.expect;
const Sequelize=require("sequelize");
const Op = Sequelize.Op;
const cryptico = require("cryptico");
chai.use(chaiHttp);

describe("/POSt createangebot",function() {
    this.timeout(80000);
    var token;
    var keyFromServerAsString;
    var keyFromUser;
    var eigeneId;
    before(function(done) {
        var Kategorie = require("../server/models/kategorie");
        Kategorie.create({KategorieID:777, Name:"testkategorie" });
        keyFromUser = cryptico.generateRSAKey("Testpasswort", 2048);
        chai.request("http://localhost:8081")
        .get('/publickey')
        .end((err, res) => {
          keyFromServerAsString=res.body.publicKey;
          var pwAsHash = "201d51609126ebe00d8c742248bd0ffcf4ce884d6211d88939a878fd95d56e2d";
          var randomString = (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)).substring(0,16);
          var pw = cryptico.encrypt(pwAsHash+randomString, keyFromServerAsString);
          let request= {
            BenutzerName:"TestuserCreateAngebot",
            Mail:"testcreate@test.de",
            Passwort:pw.cipher
           }
          chai.request("http://localhost:8081")
              .post("/register")
              .send(request)
              .end((err, res) =>{
                let request2= {
                    BenutzerName:"TestuserCreateAngebot",
                    Passwort:pw.cipher,
                    PublicKey:cryptico.publicKeyString(keyFromUser)
                   }
                  chai.request("http://localhost:8081")
                    .post("/login")
                    .send(request2)
                    .end((err, res) =>{
                        token=cryptico.decrypt(res.body.token,keyFromUser).plaintext;
                        eigeneId=res.body.BenutzerId;
                     done();
                    });
                });
        });
    });
    after(function(done){   
        var AngebotKategorie = require("../server/models/angebotKategorie");
        var AngebotHashtag= require("../server/models/angebotHashtag");
        var Angebot = require("../server/models/angebot");
        var Hashtag = require("../server/models/hashtag");
        var Kategorie = require("../server/models/kategorie");
        var Benutzer = require("../server/models/benutzer");

        AngebotKategorie.destroy({where:{KategorieID:777}}).then(a=>{
            AngebotHashtag.destroy({where:{[Op.or]:[{HashtagName:"testhashtag1"},{HashtagName:"testhashtag2"},{HashtagName:"testhashtag3"}]}}).then(a=>{
                Angebot.destroy({where:{Titel:"Angebot 1"}}).then(a=>{
                    Kategorie.destroy({where:{KategorieID:777}}).then(a=>{
                        Hashtag.destroy({where: {[Op.or]:[{Name:"testhashtag1"},{Name:"testhashtag2"},{Name:"testhashtag3"}]}}).then(a=>{

                            Benutzer.destroy({
                                where:{BenutzerName:"TestuserCreateAngebot"}
                            }).then(a=>{done()});

                            });

                        });

                    });

                });

        });
    });

      it('create Angebot',(done)=>{
        var randomString = (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)).substring(0,16);
        var encryptedToken=cryptico.encrypt(token+randomString, keyFromServerAsString).cipher;
        var requestCreateAngebot={
            Token:encryptedToken,
            Titel:"Angebot 1",
            Bild1:"LANGER BILDTEXT FÜR TEST IST DIE LÄNGE ABER ERSTMAL EGAL",
            PLZ:"47228",
            Preis:99.99,
            Straße:"Traumallee",
            Hausnummer:"11",
            KategorieID:777
        }
        chai.request("http://localhost:8081")
            .post("/createangebot")
            .send(requestCreateAngebot)
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('success');
                res.body.success.should.be.true;
                res.body.should.have.property("message");

                res.body.message.should.equal("Angebot erstellt");
                res.body.should.have.property("AngebotID");
                var Angebot = require("../server/models/angebot");
                var AngebotKategorie = require("../server/models/angebotKategorie");
                Angebot.findOne({
                    where:{AngebotID:res.body.AngebotID}
                }).then(angebot =>{
                    angebot.Titel.should.equal("Angebot 1");
                    angebot.Preis.should.equal("99.99");
                    angebot.Straße.should.equal("Traumallee");
                    angebot.Hausnummer.should.equal("11");
                    AngebotKategorie.findOne({where:{AngebotID:angebot.AngebotID}}).then(angebotKategorie =>{
                        angebotKategorie.KategorieID.should.equal(777);
                        angebotKategorie.AngebotID.should.equal(angebot.AngebotID);
                        done();
                    });
                })
            });
      });
      it('create Angebot with one Hashtag',(done)=>{
        var randomString = (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)).substring(0,16);
        var encryptedToken=cryptico.encrypt(token+randomString, keyFromServerAsString).cipher;
        var requestCreateAngebot={
            Token:encryptedToken,
            Titel:"Angebot 1",
            Bild1:"LANGER BILDTEXT FÜR TEST IST DIE LÄNGE ABER ERSTMAL EGAL",
            PLZ:"47228",
            Preis:99.99,
            Straße:"Traumallee",
            Hausnummer:"11",
            KategorieID:777,
            Hashtags:["testhashtag1"]
        }
        chai.request("http://localhost:8081")
            .post("/createangebot")
            .send(requestCreateAngebot)
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('success');
                res.body.success.should.be.true;
                res.body.should.have.property("message");
                res.body.message.should.equal("Angebot erstellt");
                res.body.should.have.property("AngebotID");
                var Angebot = require("../server/models/angebot");
                var AngebotKategorie = require("../server/models/angebotKategorie");
                var AngebotHashtag= require("../server/models/angebotHashtag");
                var Hashtag= require("../server/models/hashtag");
                Angebot.findOne({
                    where:{AngebotID:res.body.AngebotID}
                }).then(angebot =>{
                    angebot.Titel.should.equal("Angebot 1");
                    angebot.Preis.should.equal("99.99");
                    angebot.Straße.should.equal("Traumallee");
                    angebot.Hausnummer.should.equal("11");
                    AngebotKategorie.findOne({where:{AngebotID:angebot.AngebotID}}).then(angebotKategorie =>{
                        angebotKategorie.KategorieID.should.equal(777);
                        angebotKategorie.AngebotID.should.equal(angebot.AngebotID);
                    });
                    AngebotHashtag.findOne({where:{AngebotID:angebot.AngebotID, HashtagName:"testhashtag1"}}).then(angebotHashtag=>{
                        angebotHashtag.should.exist;
                    });
                    Hashtag.findOne({where:{Name:"testhashtag1"}}).then(hashtag =>{
                        hashtag.should.exist;
                        done();
                    })
                })
            });
      });
      it('create Angebot with some Hashtags',(done)=>{
        var randomString = (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)).substring(0,16);
        var encryptedToken=cryptico.encrypt(token+randomString, keyFromServerAsString).cipher;
        var requestCreateAngebot={
            Token:encryptedToken,
            Titel:"Angebot 1",
            Bild1:"LANGER BILDTEXT FÜR TEST IST DIE LÄNGE ABER ERSTMAL EGAL",
            Preis:99.99,
            PLZ:"47228",
            Straße:"Traumallee",
            Hausnummer:"11",
            KategorieID:777,
            Hashtags:["testhashtag1","testhashtag2","testhashtag3"]
        }
        chai.request("http://localhost:8081")
            .post("/createangebot")
            .send(requestCreateAngebot)
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('success');
                res.body.success.should.be.true;
                res.body.should.have.property("message");
                res.body.message.should.equal("Angebot erstellt");
                res.body.should.have.property("AngebotID");
                var Angebot = require("../server/models/angebot");
                var AngebotKategorie = require("../server/models/angebotKategorie");
                var AngebotHashtag= require("../server/models/angebotHashtag");
                var Hashtag= require("../server/models/hashtag");
                Angebot.findOne({
                    where:{AngebotID:res.body.AngebotID}
                }).then(angebot =>{
                    angebot.Titel.should.equal("Angebot 1");
                    angebot.Preis.should.equal("99.99");
                    angebot.Straße.should.equal("Traumallee");
                    angebot.Hausnummer.should.equal("11");
                    AngebotKategorie.findOne({where:{AngebotID:angebot.AngebotID}}).then(angebotKategorie =>{
                        angebotKategorie.KategorieID.should.equal(777);
                        angebotKategorie.AngebotID.should.equal(angebot.AngebotID);
                    });
                    AngebotHashtag.findOne({where:{AngebotID:angebot.AngebotID, HashtagName:"testhashtag1"}}).then(angebotHashtag=>{
                        angebotHashtag.should.exist;
                    });
                    Hashtag.findOne({where:{Name:"testhashtag1"}}).then(hashtag =>{
                        hashtag.should.exist;
                    })
                    AngebotHashtag.findOne({where:{AngebotID:angebot.AngebotID, HashtagName:"testhashtag2"}}).then(angebotHashtag=>{
                        angebotHashtag.should.exist;
                    });
                    Hashtag.findOne({where:{Name:"testhashtag2"}}).then(hashtag =>{
                        hashtag.should.exist;
                    })
                    AngebotHashtag.findOne({where:{AngebotID:angebot.AngebotID, HashtagName:"testhashtag3"}}).then(angebotHashtag=>{
                        angebotHashtag.should.exist;
                    });
                    Hashtag.findOne({where:{Name:"testhashtag3"}}).then(hashtag =>{
                        hashtag.should.exist;
                        done();
                    })
                })
            });
      });
      it('try create with wrong Parameters',(done)=>{
        var randomString = (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)).substring(0,16);
        var encryptedToken=cryptico.encrypt(token+randomString, keyFromServerAsString).cipher;
        var requestCreateAngebot={
            Token:encryptedToken,
            Bild1:"LANGER BILDTEXT FÜR TEST IST DIE LÄNGE ABER ERSTMAL EGAL",
            Preis:99.99,
            PLZ:"47228",
            Straße:"Traumallee",
            Hausnummer:"11",
            Kategorie:"testkategorie",
        }
        chai.request("http://localhost:8081")
            .post("/createangebot")
            .send(requestCreateAngebot)
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
        var requestCreateAngebot={
            Token:encryptedToken,
            Titel:"test1",
            Bild1:"LANGER BILDTEXT FÜR TEST IST DIE LÄNGE ABER ERSTMAL EGAL",
            Preis:99.99,
            PLZ:"47228",
            Straße:"Traumallee",
            Hausnummer:"11",
            KategorieID:777
        }
        chai.request("http://localhost:8081")
            .post("/createangebot")
            .send(requestCreateAngebot)
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
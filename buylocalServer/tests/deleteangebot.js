let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
let expect = chai.expect;

const Sequelize=require("sequelize");
const Op = Sequelize.Op;

const cryptico = require("cryptico");
chai.use(chaiHttp);

describe("/post deleteangebot",function() {
    this.timeout(100000);
    var token;
    var keyFromServerAsString;
    var keyFromUser;
    var eigeneId;
    var eigeneAngebotID;
    before(function(done) {
        var Kategorie = require("../server/models/kategorie");
        Kategorie.create({KategorieID:779, Name:"testkategorieDeleteAngebot" });
        
        keyFromUser = cryptico.generateRSAKey("Testpasswort", 2048);
        chai.request("http://localhost:8081")
        .get('/publickey')
        .end((err, res) => {
          keyFromServerAsString=res.body.publicKey;
          var pwAsHash = "201d51609126ebe00d8c742248bd0ffcf4ce884d6211d88939a878fd95d56e2d";
          var randomString = (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)).substring(0,16);
          var pw = cryptico.encrypt(pwAsHash+randomString, keyFromServerAsString);
          let request= {
            BenutzerName:"TestuserDeleteAngebot",
            Mail:"testDeleteAngebot@test.de",
            Passwort:pw.cipher
           }
          chai.request("http://localhost:8081")
              .post("/register")
              .send(request)
              .end((err, res) =>{
                let request2= {
                    BenutzerName:"TestuserDeleteAngebot",
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
                        var requestCreateAngebot={
                            Token:encryptedToken,
                            Titel:"AngebotDeleteAngebot",
                            Bild1:"LANGER BILDTEXT FÜR TEST IST DIE LÄNGE ABER ERSTMAL EGAL",
                            Preis:99.99,
                            Straße:"Traumallee",
                            Hausnummer:"11",
                            Kategorie:"testkategorieDeleteAngebot",
                            Hashtags:["testkategorieDeleteAngebot1","testkategorieDeleteAngebot2"]
                        }
                        chai.request("http://localhost:8081")
                            .post("/createangebot")
                            .send(requestCreateAngebot)
                            .end((err,res)=>{
                                eigeneAngebotID=res.body.AngebotID;
                                done();
                            });
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

        AngebotKategorie.destroy({where:{KategorieID:779}}).then(a=>{
            AngebotHashtag.destroy({where:{[Op.or]:[{HashtagName:"testkategorieDeleteAngebot1"},{HashtagName:"testkategorieDeleteAngebot2"}]}}).then(a=>{
                Angebot.destroy({where:{Titel:"AngebotDeleteAngebot"}}).then(a=>{
                    Kategorie.destroy({where:{KategorieID:779}}).then(a=>{
                        Hashtag.destroy({where: {[Op.or]:[{Name:"testkategorieDeleteAngebot1"},{Name:"testkategorieDeleteAngebot2"}]}}).then(a=>{

                            Benutzer.destroy({
                                where:{BenutzerName:"TestuserDeleteAngebot"}
                            }).then(a=>{done()});

                            });

                        });

                    });

                });

        });
      });
    it('delete an Angebot',function(done){
        var randomString = (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)).substring(0,16);
        var encryptedToken=encodeURIComponent(cryptico.encrypt(token+randomString,keyFromServerAsString).cipher);
        let request={
            AngebotID:eigeneAngebotID,
            Token:encryptedToken
        }
        chai.request("http://localhost:8081")
            .post("/deleteangebot")
            .send(request)
            .end((err, res) =>{
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('success');
                res.body.success.should.be.true;
                res.body.should.have.property("message");
                res.body.message.should.equal("Angebot entfernt");
                var Angebot = require("../server/models/angebot");
                Angebot.findOne({where:{AngebotID:eigeneAngebotID}}).then(angebot=>{
                    should.not.exist(angebot);
                    done();
                });
            });
    });
    it('deleting non existend Angebot',function(done){
        var randomString = (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)).substring(0,16);
        var encryptedToken=encodeURIComponent(cryptico.encrypt(token+randomString,keyFromServerAsString).cipher);
        let request={
            AngebotID:9999999,
            Token:encryptedToken
        }
        chai.request("http://localhost:8081")
            .post("/deleteangebot")
            .send(request)
            .end((err, res) =>{
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('success');
                res.body.success.should.not.be.true;
                res.body.message.should.equal("Angebot nicht vorhanden");
                done();
            });
    });
    it('try deleting with wrong Token',function(done){
        var encryptedToken=encodeURIComponent(cryptico.encrypt(token,keyFromServerAsString).cipher);
        let request={
            AngebotID:eigeneAngebotID,
            Token:encryptedToken
        }
        chai.request("http://localhost:8081")
            .post("/deleteangebot")
            .send(request)
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
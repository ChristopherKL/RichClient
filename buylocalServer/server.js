var express = require('express');
var api = express();
var fs = require('fs');
var jwt    = require('jsonwebtoken');
const cryptico = require('cryptico');

const secret = require('crypto').randomBytes(64).toString('hex').substring(0,16);

var randomString = require('crypto').randomBytes(64).toString('hex');
const key = cryptico.generateRSAKey(randomString, 2048); //2048 bit RSA Schlüsselpaar

var bodyParser  = require('body-parser');

const Sequelize=require("sequelize");
var Benutzer = require("./server/models/benutzer");
var Angebot = require("./server/models/angebot");
var Kategorie = require("./server/models/kategorie");
var AngebotKategorie = require("./server/models/angebotKategorie");
var Hashtag = require("./server/models/hashtag");
var AngebotHashtag = require("./server/models/angebotHashtag");
var Nachricht = require("./server/models/nachricht");
var Bewertung = require("./server/models/bewertung");
var Verhandlung = require("./server/models/verhandlung");

const Op = Sequelize.Op;

api.use(bodyParser.urlencoded({ extended: false }));
api.use(bodyParser.json());

api.post('/deleteuser', function(req,res){

})
//needs Valid Token of a User+16 random Chars encrypted with the public Key of Server, BenutzerID, new Password+16 random chars encrypted, and new PublicKey
//Optional SchlüsselArray=  an Array with All the Keys newly encrypted with the same structure as in /keys {Status,Schlüssel,NachrichtID}
//returns success:true if done
api.post('/changePassword', function(req,res){
  if(req.body.BenutzerID&&req.body.Token&&req.body.Passwort&&req.body.PublicKey){
    var decryptedTokenWithExtra = cryptico.decrypt(req.body.Token,key).plaintext;
    var decryptedToken=decryptedTokenWithExtra.substring(0, decryptedTokenWithExtra.length -16);
    try{
      decryptedToken = jwt.verify(decryptedToken,secret);
      var current_time = Date.now()/1000;
      if(decryptedToken.exp>current_time ){
        if(req.body.BenutzerID==decryptedToken.BenutzerID){
          for(var i=0;i<req.body.SchlüsselArray.length;i++){
            if(i==req.body.SchlüsselArray.length-1){
              if(req.body.SchlüsselArray[i].Status=="Absender"){
                var completePassphraseWithExtra = cryptico.decrypt(req.body.Passwort, key);
                var completePassphraseWithout= completePassphraseWithExtra.plaintext.substring(0, completePassphraseWithExtra.plaintext.length -16);
                 Nachricht.update({AbsenderSchlüssel:req.body.SchlüsselArray[i].Schlüssel},{where:{Absender:decryptedToken.BenutzerID,NachrichtID:req.body.SchlüsselArray[i].NachrichtID}}).then(nachricht=>{
                  Benutzer.update({Passwort:completePassphraseWithout, PublicKey:req.body.PublicKey},{where:{BenutzerID:decryptedToken.ID}}).then(benutzer=>{
                    res.json({success:true,message:"Passwort geändert"});
                  });
                });
              }else{
                Nachricht.update({EmpfängerSchlüssel:req.body.SchlüsselArray[i].Schlüssel},{where:{Empfänger:decryptedToken.BenutzerID,NachrichtID:req.body.SchlüsselArray[i].NachrichtID}}).then(nachricht=>{
                  Benutzer.update({Passwort:completePassphraseWithout, PublicKey:req.body.PublicKey},{where:{BenutzerID:decryptedToken.ID}}).then(benutzer=>{
                    res.json({success:true,message:"Passwort geändert"});
                  });
                }) ;
              }
            }else{
              if(req.body.SchlüsselArray[i].Status=="Absender"){
                Nachricht.update({AbsenderSchlüssel:req.body.SchlüsselArray[i].Schlüssel},{where:{Absender:decryptedToken.BenutzerID,NachrichtID:req.body.SchlüsselArray[i].NachrichtID}})
              }else{
                Nachricht.update({EmpfängerSchlüssel:req.body.SchlüsselArray[i].Schlüssel},{where:{Empfänger:decryptedToken.BenutzerID,NachrichtID:req.body.SchlüsselArray[i].NachrichtID}})
              }
            }
          }
        }else{
          res.json({success:false,message:"IDs stimmen nicht überein"});
        }
      }else{
        res.json({success:false, message:"Token abgelaufen"});
      }
    }catch{
      res.json({success:false,message:"Token nicht entschlüsselbar"});
    }

  }else{
    res.json({success:false,message:"Fehlerhafte Anfrage"});
  }
});
//needs Valid Token of a User+16 random Chars encrypted with the public Key of Server
//returns an Array contaaing {Status:Empfänger||Absender,NachrichtID,Schlüssel} of all Keys a User has registered in the Nachricht Table
api.get('/keys/:Token', function (req,res){
  var decryptedTokenWithExtra = cryptico.decrypt(decodeURIComponent(req.params.Token),key).plaintext;
  var decryptedToken=decryptedTokenWithExtra.substring(0, decryptedTokenWithExtra.length -16);
  try{
    decryptedToken = jwt.verify(decryptedToken,secret);
    var current_time = Date.now() /1000;
    if(decryptedToken.exp>current_time){
      var neeededArray={};
      Nachricht.findAll({where:{[Sequelize.Op.or]:[{Absender:decryptedToken.BenutzerID},{Empfänger:decryptedToken.BenutzerID}]}}).then(nachrichtArray=>{
        for(var i = 0;i<nachrichtArray.length;i++){
          if(nachrichtArray[i].get(0).Absender==decryptedToken.BenutzerID){
            neededArray[i]={Status:"Absender",NachrichtID:nachrichtArray[i].get(0).NachrichtID,Schlüssel:nachrichtArray[i].get(0).AbsenderSchlüssel};
          }else{
            neededArray[i]={Status:"Empfänger",NachrichtID:nachrichtArray[i].get(0).NachrichtID,Schlüssel:nachrichtArray[i].get(0).EmpfängerSchlüssel};
          }
        }
        res.json({success:true,SchlüsselArray:neededArray});
      });
    }else{
      res.json({success:false, message:"Token abgelaufen"});
    }
  }catch{
    res.json({success:false, message:"Token falsch"});
  }
})
//Bewertungen abgeben

//danch Angebote suchen
//needs Token, VerhandlungID, Bewerteter, Sterne optional Text
api.post('/bewerten', function(req,res){
  if(req.body.Token&&req.body.VerhandlungID&&req.body.Bewerteter&&req.body.Sterne){
    var decryptedTokenWithExtra = cryptico.decrypt(req.body.Token,key).plaintext;
    var decryptedToken=decryptedTokenWithExtra.substring(0, decryptedTokenWithExtra.length -16);
    try{
      decryptedToken = jwt.verify(decryptedToken,secret);
      var current_time = Date.now()/1000;
      if(decryptedToken.exp>current_time ){
        Benuter.findOne({where:{BenutzerID:req.body.Bewerteter}}).then(benutzer=>{
          if(benutzer){
            Bewertung.create({
              Datum:date.now(),
              Sterne:req.body.Sterne,
              Bewerteter:req.body.Bewerteter,
              Text:req.body.Text,
              VerhandlungID:req.body.VerhandlungID,
              Bewerter:decryptedToken.BenutzerID
            }).then(bewertung=>{
              res.json({success:true,message:"Bewertung abgegeben"});
            })
          }else{
            res.json({success:false,message:"Bewerteter nicht existent"});
          }
        })
      }else{
        res.json({success:false, message:"Token abgelaufen"});
      }
    }catch{
      res.json({success:false,message:"Token nicht entschlüsselbar"});
    }

  }else{
    res.json({success:false,message:"Fehlerhafte Anfrage"});
  }
})
//needs Token and VerhandlungID
//returns success
api.post('/checkverhandlung', function(req,res){
  if(req.body.Token&&req.body.VerhandlungID){
    var decryptedTokenWithExtra = cryptico.decrypt(req.body.Token,key).plaintext;
    var decryptedToken=decryptedTokenWithExtra.substring(0, decryptedTokenWithExtra.length -16);
    try{
      decryptedToken = jwt.verify(decryptedToken,secret);
      var current_time = Date.now()/1000;
      if(decryptedToken.exp>current_time ){
        Verhandlung.findOne({where:{VerhandlungID:req.body.VerhandlungID}}).then(verhandlung=>{
          if(verhandlung){

            if(verhandlung.Absender=decryptedToken.BenutzerID){
              Verhandlung.update({AbsenderCheck:true},{where:{VerhandlungID:verhandlung.VerhandlungID}}).then(verhandlung=>{
                res.json({success:true,message:"Verhandlung gecheckt"})
              })
            }else if(verhandlung.Empfänger=decryptedToken.BenutzerID){
              Verhandlung.update({EmpfängerCheck:true},{where:{VerhandlungID:verhandlung.VerhandlungID}}).then(verhandlung=>{
                res.json({success:true,message:"Verhandlung gecheckt"})
              })
            }else{
              res.json({success:false,message:"Benutzer nicht in der Verhandlung"});
            }
          }else{
            res.json({success:false,message:"Verhandlung nicht vorhanden"});
          }
        })
      }else{
        res.json({success:false, message:"Token abgelaufen"});
      }
    }catch{
      res.json({success:false,message:"Token nicht entschlüsselbar"});
    }

  }else{
    res.json({success:false,message:"Fehlerhafte Anfrage"});
  }
})
//
//needs a Valid Token and an Array of NachrichtID's 
//as Token and NachrichtArray
//returns a success
api.post('/gelesen', function(req,res){
  if(req.body.Token&&req.body.NachrichtArray){
    var decryptedTokenWithExtra = cryptico.decrypt(req.body.Token,key).plaintext;
    var decryptedToken=decryptedTokenWithExtra.substring(0, decryptedTokenWithExtra.length -16);
    try{
      decryptedToken = jwt.verify(decryptedToken,secret);
      var current_time = Date.now()/1000;
      if(decryptedToken.exp>current_time ){
        for(var i=0;i<req.body.NachrichtArray.length;i++){
          if(i<req.body.NachrichtArray.length-1){
            Nachricht.update({Gelesen:date.now()},{ where: {Absender:{[Op.ne]: decryptedToken.BenutzerID},NachrichtID:NachrichtArray[i]}});
          }else{
            Nachricht.update({Gelesen:date.now()},{ where: {Absender:{[Op.ne]: decryptedToken.BenutzerID},NachrichtID:NachrichtArray[i]}}).then(nachricht=>{
              res.json({success:true, message:"Nachrichten gelesen"});
            });
          }
        }
      }else{
        res.json({success:false, message:"Token abgelaufen"});
      }
    }catch{
      res.json({success:false,message:"Token nicht entschlüsselbar"});
    }

  }else{
    res.json({success:false,message:"Fehlerhafte Anfrage"});
  }
})
//needs Valid Token of a User+16 random Chars encrypted with the public Key of Server
//returns an Array with every Verhandlung as Empfänger and an Array with every Verhandlung as Absender
//as VerhandlungenAbsender, VerhandlungenEmpfänger
api.get("/verhandlungen/:Token", function (req,res){
  var decryptedTokenWithExtra = cryptico.decrypt(decodeURIComponent(req.params.Token),key).plaintext;
  var decryptedToken=decryptedTokenWithExtra.substring(0, decryptedTokenWithExtra.length -16);
  try{
    decryptedToken = jwt.verify(decryptedToken,secret);
    var current_time = Date.now() /1000;
    if(decryptedToken.exp>current_time){
      Verhandlung.findAll({where:{Empfänger:decryptedToken.BenutzerID}}).then(empfängerVerhandlungen=>{
        var empfängerArray=[];
        for(var i=0;i<empfängerVerhandlungen.length;i++){
          if(i==empfängerVerhandlungen.length-1){
            Verhandlung.findOne({where:{VerhandlungID:empfängerVerhandlungen[i].get(0).VerhandlungID}}).then(verhandlung=>{
              var selectedVerhandlung=verhandlung;
              Nachricht.findOne({order: [['Datum', 'DESC']],where:{VerhandlungID:selectedVerhandlung.VerhandlungID}}).then(nachricht=>{
                var nachrichtGelesen=false;
                var nachrichtDate=null;
                if(nachricht&&!nachricht.Gelesen==null){
                  nachrichtGelesen=true;
                  nachrichtDate=nachricht.Datum;
                }
                Benutzer.findOne({where:{BenutzerID:selectedVerhandlung.Absender}}).then(benutzer=>{
                  empfängerArray.push({Verhandlung:selectedVerhandlung.toJSON(),Gelesen:nachrichtGelesen,Name:benutzer.BenutzerName,last_edit:nachrichtDate})
                  Verhandlung.findOne({where:{Absender:decryptedToken.BenutzerID}}).then(absenderVerhandlung=>{
                    if(!absenderVerhandlung){
                      res.json({success:true,VerhandlungenAbsender:JSON.stringify(absenderArray),VerhandlungenEmpfänger:JSON.stringify(empfängerArray)});
                    }
                });
              });
              });
            })
          }else{
            Verhandlung.findOne({where:{VerhandlungID:empfängerVerhandlungen[i].get(0).VerhandlungID}}).then(verhandlung=>{
              var selectedVerhandlung=verhandlung;
              Nachricht.findOne({order: [['Datum', 'DESC']],where:{VerhandlungID:selectedVerhandlung.VerhandlungID}}).then(nachricht=>{
                var nachrichtGelesen=false;
                var nachrichtDate=null;
                if(nachricht&&!nachricht.Gelesen==null){
                  nachrichtGelesen=true;
                  nachrichtDate=nachricht.Datum;
                }
                Benutzer.findOne({where:{BenutzerID:selectedVerhandlung.Absender}}).then(benutzer=>{
                  empfängerArray.push({Verhandlung:selectedVerhandlung.toJSON(),Gelesen:nachrichtGelesen,Name:benutzer.BenutzerName,last_edit:nachrichtDate})
                })
              });
            })
          }
          
        }
        Verhandlung.findAll({where:{Absender:decryptedToken.BenutzerID}}).then(absenderVerhandlungen=>{
          var absenderArray=[];
          for(var j=0;j<absenderVerhandlungen.length;j++){
            if(j==absenderVerhandlungen.length-1){
              Verhandlung.findOne({where:{VerhandlungID:absenderVerhandlungen[j].get(0).VerhandlungID}}).then(verhandlung=>{
                var selectedVerhandlung=verhandlung;
                Nachricht.findOne({order: [['Datum', 'DESC']],where:{VerhandlungID:selectedVerhandlung.VerhandlungID}}).then(nachricht=>{
                  var nachrichtGelesen=false;
                  var nachrichtDate=null;
                  if(nachricht&&!nachricht.Gelesen==null){
                    nachrichtDate=nachricht.Datum;
                    nachrichtGelesen=true;
                  }
                  Benutzer.findOne({where:{BenutzerID:selectedVerhandlung.Empfänger}}).then(benutzer=>{
                    absenderArray.push({Verhandlung:selectedVerhandlung.toJSON(),Gelesen:nachrichtGelesen,last_edit:nachrichtDate,Name:benutzer.BenutzerName});
                    res.json({success:true,VerhandlungenAbsender:JSON.stringify(absenderArray),VerhandlungenEmpfänger:JSON.stringify(empfängerArray)});
                  });
                });
              })
            }
            Verhandlung.findOne({where:{VerhandlungID:absenderVerhandlungen[j].get(0).VerhandlungID}}).then(verhandlung=>{
              var selectedVerhandlung=verhandlung;
              Nachricht.findOne({order: [['Datum', 'DESC']],where:{VerhandlungID:selectedVerhandlung.VerhandlungID}}).then(nachricht=>{
                var nachrichtGelesen=false;
                var nachrichtDate;
                if(nachricht&&!nachricht.Gelesen==null){
                  nachrichtDate=nachricht.Datum;
                  nachrichtGelesen=true;
                }
                Benutzer.findOne({where:{BenutzerID:selectedVerhandlung.Empfänger}}).then(benutzer=>{
                  absenderArray.push({Verhandlung:selectedVerhandlung.toJSON(),Gelesen:nachrichtGelesen,last_edit:nachrichtDate,Name:benutzer.BenutzerName});
                });
              });
            })
          }
      })
    })
    }else{
      res.json({success:false, message:"Token abgelaufen"});
    }
  }catch{
    res.json({success:false, message:"Token falsch"});
  }
})
//needs Id of Verhandlung, Valid Token of a User+16 random Chars encrypted with the public Key of Server
//returns an Array with every send Nachricht of the Verhandlung
api.get('/nachrichten/:VerhandlungID/:Token', function (req,res){
  var decryptedTokenWithExtra = cryptico.decrypt(decodeURIComponent(req.params.Token),key).plaintext;
  var decryptedToken=decryptedTokenWithExtra.substring(0, decryptedTokenWithExtra.length -16);
  try{
    decryptedToken = jwt.verify(decryptedToken,secret);
    var current_time = Date.now() /1000;
    if(decryptedToken.exp>current_time){
      Verhandlung.findOne({where:{VerhandlungID:req.params.VerhandlungID}}).then(verhandlung=>{
        if(verhandlung){
          Nachricht.findAll({order: [['Datum', 'ASC']],where:{VerhandlungID:req.params.VerhandlungID}}).then(nachrichten=>{
            nachrichtenArray=[];
            for(var i=0;i<nachrichten.length;i++){
              nachrichtenArray.push(JSON.stringify(nachrichten[i].get(0)));
            }
            res.json({success:true, Nachrichten:JSON.stringify(nachrichtenArray)});
          })
        }else{
          res.json({success:false, message:"Verhandlung nicht vorhanden"});
        }
      })
    }else{
      res.json({success:false, message:"Token abgelaufen"});
    }
  }catch{
    res.json({success:false, message:"Token falsch"});
  }
})
//needs Empfänger,Betreff,AngebotID,AbsenderSchlüssel,EmpfängerSchlüssel, Valid Token of a User+16 random Chars encrypted with the public Key of Server
//returns Id of the Verhandlung
api.post('/beginverhandlung', function(req,res){
  if(req.body.Empfänger&&req.body.Token&&req.body.Betreff&&req.body.EmpfängerSchlüssel&&req.body.AbsenderSchlüssel&&req.body.AngebotID){
    var decryptedTokenWithExtra = cryptico.decrypt(req.body.Token,key).plaintext;
    var decryptedToken=decryptedTokenWithExtra.substring(0, decryptedTokenWithExtra.length -16);
    try{
      decryptedToken = jwt.verify(decryptedToken,secret);
      var current_time = Date.now()/1000;
      if(decryptedToken.exp>current_time ){
        Verhandlung.create({
          Betreff:req.body.Betreff,
          AngebotID:req.body.AngebotID,
          Absender:decryptedToken.BenutzerID,
          Empfänger:req.body.Empfänger,
          AbsenderSchlüssel:req.body.AbsenderSchlüssel,
          EmpfängerSchlüssel:req.body.EmpfängerSchlüssel
        }).then(verhandlung=>{
          if(verhandlung){
            res.json({success:true, VerhandlungID:verhandlung.VerhandlungID})
          }else{
            res.json({success:false, message:"Verhandlung konnte nicht erstellt werden"});
          }
        })
      }else{
        res.json({success:false, message:"Token abgelaufen"});
      }
    }catch{
      res.json({success:false,message:"Token nicht entschlüsselbar"});
    }

  }else{
    res.json({success:false,message:"Fehlerhafte Anfrage"});
  }
})
//needs VerhandlungID,Text, Valid Token of a User+16 random Chars encrypted with the public Key of Server
//returns Id of Nachricht
api.post('/writenachricht', function(req,res){
  if(req.body.VerhandlungID&&req.body.Token&&req.body.Text){
    var decryptedTokenWithExtra = cryptico.decrypt(req.body.Token,key).plaintext;
    var decryptedToken=decryptedTokenWithExtra.substring(0, decryptedTokenWithExtra.length -16);
    try{
      decryptedToken = jwt.verify(decryptedToken,secret);
      var current_time = Date.now()/1000;
      if(decryptedToken.exp>current_time ){
        Nachricht.create({
          VerhandlungID: req.body.VerhandlungID,
          Text: req.body.Text,
          Absender: decryptedToken.BenutzerID,
          Datum: Date.now()
        }).then(nachricht=>{
          if(nachricht){
            res.json({success:true,NachrichtID:nachricht.NachrichtID})
          }else{
            res.json({success:false, message:"Nachricht konnte nicht erstellt werden"});
          }
        })
      }else{
        res.json({success:false, message:"Token abgelaufen"});
      }
    }catch{
      res.json({success:false,message:"Token nicht entschlüsselbar"});
    }

  }else{
    res.json({success:false,message:"Fehlerhafte Anfrage"});
  }
})
//Returns the Public Key of the Server
api.get('/publicKey', function(req,res){
  res.json({success: true, publicKey: cryptico.publicKeyString(key)});
})

//Requires BenutzerID of requested user and Token+16 random signs encrypted with the public Key of the Server
//returns success, BenutzerName,Mail, last_login and reg_date
api.get('/user/:BenutzerID/:Token', function (req,res){
  if(req.params.Token&&req.params.BenutzerID){
    var decryptedTokenWithExtra = cryptico.decrypt(decodeURIComponent(req.params.Token),key).plaintext;
    var decryptedToken=decryptedTokenWithExtra.substring(0, decryptedTokenWithExtra.length -16);
    try{
      decryptedToken = jwt.verify(decryptedToken,secret);
      var current_time = Date.now() /1000;

      if(decryptedToken.exp>current_time){
        Benutzer.findOne({where: {BenutzerID:req.params.BenutzerID}}).then(benutzer =>{
          if(benutzer){
            returnBenutzerName=benutzer.BenutzerName;
            returnMail=benutzer.Mail;
            returnLastLogin=benutzer.last_login;
            returnRegDate=benutzer.reg_date;
            Bewertung.findAll({where:{Bewerteter:req.params.BenutzerID}}).then(bewertungen=>{
              var gesamtScore=0;
              var bewertungsCount=bewertungen.length;
              for(var i=0;i<bewertungen.length;i++){
                gesamtScore=gesamtScore+bewertung[i].get(0).Sterne;
              }
              if(!gesamtScore==0){
                gesamtScore=gesamtScore/bewertungen.length;
                if(gesamtScore<0.5){
                  gesamtScore=0;
                }else if(gesamtScore<1.0){
                  gesamtScore=0.5
                }else if(gesamtScore<1.5){
                  gesamtScore=1.0
                }else if(gesamtScore<2.0){
                  gesamtScore=1.5
                }else if(gesamtScore<2.5){
                  gesamtScore=2.0
                }else if(gesamtScore<3.0){
                  gesamtScore=2.5
                }else if(gesamtScore<3.5){
                  gesamtScore=3.0
                }else if(gesamtScore<4.0){
                  gesamtScore=3.5
                }else if(gesamtScore<4.5){
                  gesamtScore=4.0
                }else if(gesamtScore<5.0){
                  gesamtScore=4.5
                }else{
                  gesamtScore=5.0
                }

              }
              Angebot.findAll({where:{BenutzerID:req.params.BenutzerID}}).then(angebote=>{
                var angebotsArray=[]
                for(var j=0;j<angebote.length;j++){
                  angebotsArray.push({AngebotID:angebote[j].get(0).AngebotID,Titel:angebote[j].get(0).Titel,Bild1:angebote[j].get(0).Bild1,Preis:angebote[j].get(0).Preis});
                }
                res.json({success:true,PublicKey:benutzer.PublicKey, BenutzerName: benutzer.BenutzerName,Mail : benutzer.Mail, last_login:benutzer.last_login, reg_date: benutzer.reg_date, Bewertung:gesamtScore, Bewertungsanzahl:bewertungsCount, Angebote:angebotsArray});
              })
            })
            }else{
            res.json({success:false, message:"Nutzer nicht vorhanden"});
          }
        });
      }else{
        res.json({success:false, message:"Token abgelaufen"});
      }
    }catch{
      res.json({success:false, message:"Token falsch"});
    }
  }else{
     res.json({success:false,message:"Fehlerhafte Anfrage"});
  }
});

 
//Requires Token+16 random characters encrypted with public Key of Server, BenutzerName and Mail
//returns success and message if it fails or BenutzerName, Mail message and success if it worked
api.post('/changeuser', function (req,res){
  if(req.body.Token&&req.body.BenutzerName&&req.body.Mail){
    var decryptedTokenWithExtra = cryptico.decrypt(req.body.Token,key).plaintext;
    var decryptedToken=decryptedTokenWithExtra.substring(0, decryptedTokenWithExtra.length -16);
    try{
      decryptedToken = jwt.verify(decryptedToken,secret);
      var current_time = Date.now()/1000;
      if(decryptedToken.exp>current_time ){
        Benutzer.findOne({where:{Mail: req.body.Mail}}).then(benutzer =>{
          if(!benutzer||benutzer.BenutzerID==decryptedToken.BenutzerID){
            Benutzer.findOne({where:{BenutzerName: req.body.BenutzerName}}).then(benutzer2 =>{
              if(!benutzer2||benutzer2.BenutzerID==decryptedToken.BenutzerID){
                Benutzer.update({BenutzerName:req.body.BenutzerName, Mail:req.body.Mail},{ where: {BenutzerID:decryptedToken.BenutzerID}});
                res.json({success:true, message:"Werte geändert",BenutzerName:req.body.BenutzerName, Mail:req.body.Mail});
              }else{
                res.json({success:false, message:"Benutzername schon vergeben"});
              }
            });
          }else{
            res.json({success:false, message:"Mail schon vergeben"});
          }
        });
      }else{
        res.json({success:false, message:"Token abgelaufen"})
      }
    }catch{
      res.json({success:false,message:"Token nicht entschlüsselbar"});
    }
  }else{
    res.json({success:false, message:"Fehlerhafte Anfrage"});
  }
}) 


//Requires Mail or benutzerName, Passwort+16random chars encrypted with public Key of Server and Public Key
//returns success:false and message if it fails, else success,token encrypted with public Key of User, BenutzerId, BenutzerName, Mail and a message 
api.post('/login', function (req,res){
  if((req.body.Mail||req.body.BenutzerName)&&req.body.Passwort&&req.body.PublicKey){
    if (req.body.Mail){
      Benutzer.findOne({
        where: {Mail: req.body.Mail}}).then(benutzer =>{
          if (benutzer){
            completePassphraseWithExtra = cryptico.decrypt(req.body.Passwort,key);
            var completePassphraseWithout= completePassphraseWithExtra.plaintext.substring(0, completePassphraseWithExtra.plaintext.length -16);//deletes last 16 chars (the random signs)
            if(benutzer.Passwort==completePassphraseWithout){
              //no Public KEy before first login... at first login.. add public key
              if(!benutzer.PublicKey){
                Benutzer.update({PublicKey:req.body.PublicKey},{where :{BenutzerID:benutzer.BenutzerID}});
                benutzer.PublicKey=req.body.PublicKey;
              }
              //token generation
              var tokenGenerator = require('./server/ownModules/tokenGenerator.js');
              token= tokenGenerator(benutzer.BenutzerID,secret);
            
              //token encryption
              encryptedToken = cryptico.encrypt(token,benutzer.PublicKey).cipher;


              Benutzer.update({last_login:Date.now()},{where:{BenutzerID:benutzer.BenutzerID}});
              
              res.json({success: true, message: "Ein Token", BenutzerId:benutzer.BenutzerID, BenutzerName: benutzer.BenutzerName, Mail:benutzer.Mail, token: encryptedToken});
            }else{
              res.json({ success : false, message:"Passwort falsch"});
            }
          }else{
            res.json({ success : false, message:"Kein Nutzer mit der Mail"});
          }
        })
    }else{
      Benutzer.findOne({
        where: {BenutzerName : req.body.BenutzerName}}).then(benutzer =>{
          if(benutzer){

            completePassphraseWithExtra = cryptico.decrypt(req.body.Passwort,key);
            var completePassphraseWithout= completePassphraseWithExtra.plaintext.substring(0, completePassphraseWithExtra.plaintext.length -16);//deletes last 16 chars (the random signs)
            if(benutzer.Passwort==completePassphraseWithout){
              //no Public KEy before first login... at first login.. add public key
              if(!benutzer.PublicKey){
                Benutzer.update({PublicKey:req.body.PublicKey},{where:{BenutzerID:benutzer.BenutzerID}});
                benutzer.PublicKey=req.body.PublicKey;
              }
              //token generation
              var tokenGenerator = require('./server/ownModules/tokenGenerator.js');
              token= tokenGenerator(benutzer.BenutzerID,secret);
            
              //token encryption
              encryptedToken = cryptico.encrypt(token,benutzer.PublicKey).cipher;

              Benutzer.update({last_login:Date.now()},{where:{BenutzerID:benutzer.BenutzerID}});

              res.json({success: true, message: "Ein Token",BenutzerId:benutzer.BenutzerID, BenutzerName: benutzer.BenutzerName, Mail:benutzer.Mail, token: encryptedToken});
            }else{
              res.json({ success : false, message:"Passwort falsch"});
            }
          }else{
            res.json({ success : false, message:"Kein Nutzer mit dem Benutzernamen"});
          }
      })
  }
}else{
  res.json({success:false,message:"Fehlerhafte Anfrage"});
}
})


//Requires Token+16 random chars and the AngebotID
api.post('/deleteangebot', function(req,res){
  if(req.body.Token&&req.body.AngebotID){
    var decryptedTokenWithExtra = cryptico.decrypt(decodeURIComponent(req.body.Token),key).plaintext;
    var decryptedToken=decryptedTokenWithExtra.substring(0, decryptedTokenWithExtra.length -16);
    try{
      decryptedToken = jwt.verify(decryptedToken,secret);
      var current_time = Date.now() /1000;
      if(decryptedToken.exp>current_time){
        Angebot.findOne({where:{BenutzerID:decryptedToken.BenutzerID, AngebotID:req.body.AngebotID}}).then(angebot=>{
          if(angebot){
            AngebotHashtag.findAll({where:{AngebotID:angebot.AngebotID}}).then(angebotHashtagArray=>{
              for(var i = 0;i<angebotHashtagArray.length;i++){
                if(i==angebotHashtagArray.length-1){
                  AngebotHashtag.destroy({where:{AngebotID:angebot.AngebotID,HashtagName:angebotHashtagArray[i].get(0).HashtagName}});
                    Hashtag.findOne({where:{Name:angebotHashtagArray[i].get(0).HashtagName}}).then(hashtag=>{
                      if(hashtag.NutzungsAnz<=1){
                        Hashtag.destroy({where:{Name:hashtag.Name}}).then(hashtag=>{
                          Angebot.destroy({where:{BenutzerID:decryptedToken.BenutzerID, AngebotID:req.body.AngebotID}}).then(angebot=>{
                            res.json({success:true, message:"Angebot entfernt"});
                          });
                        });
                      }else{
                        Hashtag.update({NutzungsAnz:hashtag.NutzungsAnz-1},{where:{Name:hashtag.Name}}).then(hashtag=>{
                          Angebot.destroy({where:{BenutzerID:decryptedToken.BenutzerID, AngebotID:req.body.AngebotID}}).then(angebot=>{
                            res.json({success:true, message:"Angebot entfernt"});
                          });
                        });
                      }
                    });
                }else{
                  AngebotHashtag.destroy({where:{AngebotID:angebot.AngebotID,HashtagName:angebotHashtagArray[i].get(0).HashtagName}});
                  Hashtag.findOne({where:{Name:angebotHashtagArray[i].get(0).HashtagName}}).then(hashtag=>{
                    if(hashtag.NutzungsAnz<=1){
                      Hashtag.destroy({where:{Name:hashtag.Name}});
                    }else{
                      Hashtag.update({NutzungsAnz:hashtag.NutzungsAnz-1},{where:{Name:hashtag.Name}});
                    }
                  });
                }
              
              }
            });
          }else{
            res.json({success:false, message:"Angebot nicht vorhanden"});
          }
        });
      }else{
        res.json({success:false, message:"Token abgelaufen"});
      }
    }catch{
      res.json({success:false, message:"Token falsch"});
    }
  }else{
    res.json({success:false, message:"Fehlerhafte Anfrage"});
  }
});

//returns the kategorien
//UeberKategorien,UnterKategorien
api.get("/kategorie",function( req,res){
  Kategorie.findAll({order: [['KategorieID', 'ASC']],where:{UeberKategorie:null}}).then(ueberKategorien =>{
    var returnarrayUeberKategorien=[];
    for(var i=0;i<ueberKategorien.length;i++){
      returnarrayUeberKategorien.push(ueberKategorien[i].get(0));
    }
    Kategorie.findAll({order: [['UeberKategorie', 'ASC']],where:{UeberKategorie:{[Op.ne]: null}}}).then(unterKategorien=>{
      var returnarrayUnterKategorien=[];
      for(var i=0;i<unterKategorien.length;i++){
        returnarrayUnterKategorien.push(unterKategorien[i].get(0));
      }
      res.json({success:true,UeberKategorien:returnarrayUeberKategorien,unterKategorien:returnarrayUnterKategorien});
    });
  })
})
//Requires ID of requested Angebot and a valid Token+16random Signs encrypted with Public Key of Server urlencoded
//returned Hashtags KategorieID Bild 1 bis 5, reg_date, Titel, Preis, Beschreibung falls vorhanden, Straße, Hausnummer, BenutzerName und BenutzerID
//
api.get("/angebot/:AngebotID/:Token",function (req,res){
  if(req.params.Token&&req.params.AngebotID){
    var decryptedTokenWithExtra = cryptico.decrypt(decodeURIComponent(req.params.Token),key).plaintext;
    var decryptedToken=decryptedTokenWithExtra.substring(0, decryptedTokenWithExtra.length -16);
    try{
      decryptedToken = jwt.verify(decryptedToken,secret);
      var current_time = Date.now() /1000;
      if(decryptedToken.exp>current_time){

        var hashtagsOfAngebot={};
        var foundKategorie;
        var foundAngebot
        Angebot.findOne({where: {AngebotID:req.params.AngebotID}}).then(angebot =>{
          if(angebot){
            foundAngebot=angebot;
            AngebotKategorie.findOne({where:{AngebotID:angebot.AngebotID}}).then(angebotKategorie=>{
              foundKategorie=angebotKategorie;
              AngebotHashtag.findAll({where:{AngebotID:foundAngebot.AngebotID}}).then(angebothashtag=>{
                for(var i = 0;i<angebothashtag.length;i++){
                  hashtagsOfAngebot[i]=angebothashtag[i].get(0).HashtagName;
                }
                var benutzer=Benutzer.findOne({where:{BenutzerID:foundAngebot.BenutzerID}}).then(benutzer=>{
                  res.json({
                    success:true,
                    Hashtags: hashtagsOfAngebot,
                    KategorieID : foundKategorie.KategorieID,
                    Bild1: foundAngebot.Bild1,
                    Bild2: foundAngebot.Bild2,
                    Bild3: foundAngebot.Bild3,
                    Bild4: foundAngebot.Bild4,
                    Bild5: foundAngebot.Bild5,
                    PLZ: foundAngebot.PLZ,
                    reg_date: foundAngebot.reg_date,
                    Titel: foundAngebot.Titel,
                    Preis: foundAngebot.Preis,
                    Beschreibung: foundAngebot.Beschreibung,
                    Straße:foundAngebot.Straße,
                    Hausnummer:foundAngebot.Hausnummer,
                    BenutzerID: benutzer.BenutzerID,
                    BenutzerName: benutzer.BenutzerName,
                    PublicKey: benutzer.PublicKey
                  })
                })
              });
            });
          }else{
            res.json({success:false, message:"Angebot nicht vorhanden"});
          }
        });
      }else{
        res.json({success:false, message:"Token abgelaufen"});
      }
    }catch{
      res.json({success:false, message:"Token falsch"});
    }

  }else{
    res.json({success:false,message:"Fehlerhafte Anfrage"});
  }
})
//Requires Titel, Preis, Bild1, PLZ,KategorieID and a Token+16 random chars encrypted with public Key of Server
//alternative Input Bild2,Bild3,Bild4,Bild5, Beschreibung, Hashtags, Straße, Hausnummer
//returns if it fails success:false and a message, else success:true, message and AngebotID
api.post('/createangebot', function (req,res){
  if(req.body.Titel&&req.body.Preis&&req.body.Bild1&&req.body.PLZ&&req.body.Token&&req.body.KategorieID){
    var decryptedTokenWithExtra = cryptico.decrypt(req.body.Token,key).plaintext;
    var decryptedToken=decryptedTokenWithExtra.substring(0, decryptedTokenWithExtra.length -16);
    try{
      decryptedToken = jwt.verify(decryptedToken,secret);
      var current_time = Date.now()/1000;
      var finalAngebot;
      if(decryptedToken.exp>current_time ){
          Angebot.create({
            BenutzerID:decryptedToken.BenutzerID,
            Titel:req.body.Titel,
            Preis:req.body.Preis,
            Bild1:req.body.Bild1,
            Bild2:req.body.Bild2,
            Bild3:req.body.Bild3,
            Bild4:req.body.Bild4,
            Bild5:req.body.Bild5,
            PLZ:req.body.Straße,
            Straße:req.body.Straße,
            Hausnummer:req.body.Hausnummer,
            Beschreibung:req.body.Beschreibung,
            reg_date: Date.now()
          }).then(angebot=>{
            if(angebot){
              finalAngebot=angebot;
              Kategorie.findOne({
                where:{KategorieID:req.body.KategorieID}
              }).then(kategorie =>{
                AngebotKategorie.create({
                  AngebotID:angebot.AngebotID,
                  KategorieID:kategorie.KategorieID
                }).then(angebotKategorie=>{
                  if(!req.body.Hashtags){
                    res.json({success:true,message:"Angebot erstellt",AngebotID:finalAngebot.AngebotID});
                  }
                });
              });
              if(req.body.Hashtags){
                for(var i=0;i<req.body.Hashtags.length;i++){
                    var selectedHashtag=req.body.Hashtags[i];
                    Hashtag.findOrCreate({
                      where:{Name:selectedHashtag}
                    }).then(hashtag=>{
                      if(!hashtag[1]){
                        Hashtag.update({NutzungsAnz:hashtag[0].NutzungsAnz+1},{where:{Name:hashtag[0].Name}});
                          if(hashtag[0].Name==req.body.Hashtags[req.body.Hashtags.length-1]){
                            AngebotHashtag.create({AngebotID:angebot.AngebotID, HashtagName:hashtag[0].Name}).then(angebotHashtag=>{
                              res.json({success:true,message:"Angebot erstellt",AngebotID:finalAngebot.AngebotID});
                            })
                          }else{
                          AngebotHashtag.create({AngebotID:angebot.AngebotID, HashtagName:hashtag[0].Name})
                          }
                        
                      }else{
                        Hashtag.update({NutzungsAnz:1},{where:{Name:hashtag[0] .Name}});
                          if(hashtag[0].Name==req.body.Hashtags[req.body.Hashtags.length-1]){
                            AngebotHashtag.create({AngebotID:angebot.AngebotID, HashtagName:hashtag[0].Name}).then(angebotHashtag=>{
                              res.json({success:true,message:"Angebot erstellt",AngebotID:finalAngebot.AngebotID});
                            })
                          }else{
                            AngebotHashtag.create({AngebotID:angebot.AngebotID, HashtagName:hashtag[0].Name})
                          }
                      }
                    });
                }
              }
            }else{
              res.json({success:false,message:"Angebot konnte nicht erstellt werden"});
            }
          })
      }else{
        res.json({success:false, message:"Token abgelaufen"});
      }
    }catch{
      res.json({success:false,message:"Token nicht entschlüsselbar"});
    }
  }else{
    res.json({success:false, message:"Fehlerhafte Anfrage"});
  }
});
// Requires BenutzerName Mail and Passwort +16 random chars enbcrypted with public Key of Server
// Returns if failed success:false and message else return success:true and message
api.post('/register', function (req,res){
  if(req.body.BenutzerName&&req.body.Mail&&req.body.Passwort){
    Benutzer.find({where:{BenutzerName: req.body.BenutzerName}}).then(benutzer =>{
      if (benutzer){
        res.json({ success : false, message:"Benutzer schon vorhanden"});
      }else{
        Benutzer.find({where:{Mail: req.body.Mail}}).then(benutzer =>{
          if(benutzer){
            res.json({ success : false, message:"Mail schon vorhanden"});
          }else{
            try{
              var completePassphraseWithExtra = cryptico.decrypt(req.body.Passwort, key);
              var completePassphraseWithout= completePassphraseWithExtra.plaintext.substring(0, completePassphraseWithExtra.plaintext.length -16);//deletes last 16 chars (the random signs)
              Benutzer.create({ BenutzerName: req.body.BenutzerName, Mail: req.body.Mail, reg_date: Date.now(), Passwort:  completePassphraseWithout}).then(benutzer =>{
              if(benutzer){
                res.json({success: true, message: "Nutzer erstellt"});
              }else{
                res.json({ success : false, message:"Fehler beim Erstellen des Nutzers"});
              }
            });
          }catch{
            res.json({success:false,message:"Fehler beim entschlüsseln"});
          }
        }
      });
    }
  });
}else{
  res.json({success:false,message:"Fehlerhafte Anfrage"})
}
})

//erstellt den Server auf Port 8081 des Localhost
var server = api.listen(8081, function (){
  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)
})
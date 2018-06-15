var express = require('express');
var api = express();
var fs = require('fs');
var jwt    = require('jsonwebtoken');
const cryptico = require('cryptico');

const secret = require('crypto').randomBytes(64).toString('hex').substring(0,16);

var randomString = require('crypto').randomBytes(64).toString('hex');
const key = cryptico.generateRSAKey(randomString, 2048); //2048 bit RSA Schlüsselpaar

var bodyParser  = require('body-parser');

var Benutzer = require("./server/models/benutzer");
var Angebot = require("./server/models/angebot");
var Kategorie = require("./server/models/kategorie");
var AngebotKategorie = require("./server/models/angebotKategorie");
var Hashtag = require("./server/models/hashtag");
var AngebotHashtag = require("./server/models/angebotHashtag");



api.use(bodyParser.urlencoded({ extended: false }));
api.use(bodyParser.json());

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
            res.json({success:true, BenutzerName: benutzer.BenutzerName,Mail : benutzer.Mail, last_login:benutzer.last_login, reg_date: benutzer.reg_date});
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
//Requires Titel, Preis, Bild1, Straße,Kategorie, Hausnummer and a Token+16 random chars encrypted with public Key of Server
//alternative Input Bild2,Bild3,Bild4,Bild5, Beschreibung, Hashtags
//returns if it fails success:false and a message, else success:true, message and AngebotID
api.post('/createangebot', function (req,res){
  if(req.body.Titel&&req.body.Preis&&req.body.Bild1&&req.body.Straße&&req.body.Hausnummer&&req.body.Token&&req.body.Kategorie){
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
          Straße:req.body.Straße,
          Hausnummer:req.body.Hausnummer,
          Beschreibung:req.body.Beschreibung,
          reg_date: Date.now()
        }).then(angebot=>{
          if(angebot){
            finalAngebot=angebot;
            Kategorie.findOne({
              where:{Name:req.body.Kategorie}
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
    Benutzer.findOne({where:{BenutzerName: req.body.BenutzerName}}).then(benutzer =>{
      if (benutzer){
        res.json({ success : false, message:"Benutzer schon vorhanden"});
      }else{
        Benutzer.findOne({where:{Mail: req.body.Mail}}).then(benutzer =>{
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
            })
          }catch{
            res.json({success:false,message:"Fehler beim entschlüsseln"});
          }
        }
      })
    }
  })
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
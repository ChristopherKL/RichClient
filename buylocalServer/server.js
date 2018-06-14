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



api.use(bodyParser.urlencoded({ extended: false }));
api.use(bodyParser.json());

//Gives back the public RSA key part of the server
api.get('/publicKey', function(req,res){
  res.json({success: true, publicKey: cryptico.publicKeyString(key)});
})

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
        res.json({success:false, message:"Token falsch"});
      }
    }catch{
      res.json({success:false, message:"Token falsch"});
    }
    
  }else{
    res.json({success:false,message:"Fehlerhafte Anfrage"});
  }
})

 
//Post needs Token  BenutzerName, Mail in Body of request
api.post('/changeuser', function (req,res){
  if(req.body.Token&&req.body.BenutzerName&&req.body.Mail){
    var decryptedTokenWithExtra = cryptico.decrypt(req.body.Token,key).plaintext;
    var decryptedToken=decryptedTokenWithExtra.substring(0, decryptedTokenWithExtra.length -16);
    try{
      decryptedToken = jwt.verify(decryptedToken,secret);
      var current_time = Date.now()/1000;
      if(decryptedToken.exp>current_time ){
        Benutzer.update({BenutzerName:req.body.BenutzerName, Mail:req.body.Mail},{ where: {BenutzerID:decryptedToken.BenutzerID}});
        res.json({success:true, message:"Werte geändert",BenutzerName:req.body.BenutzerName, Mail:req.body.Mail});
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


//Login need Username or Mail and Passwort and PublicKey
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

// code für die Registrierung hier einfügen
// Request muss übergeben werden mit BenutzerName,Mail und Passwort( mit 16 Zufallszeichen) verschlüsslet mit dem öffentlichen Schlüssel im Body
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
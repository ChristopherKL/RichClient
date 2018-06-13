var express = require('express');
var api = express();
var fs = require('fs');
var jwt    = require('jsonwebtoken');
const NodeRSA = require('node-rsa');

const secret = require('crypto').randomBytes(64).toString('hex').substring(0,16);


const key = new NodeRSA({b: 2048}); //512 bit RSA Schlüsselpaar
key.setOptions({encryptionScheme: 'pkcs1'});

var bodyParser  = require('body-parser');



api.use(bodyParser.urlencoded({ extended: false }));
api.use(bodyParser.json());

//fügt sequelize connection
const Sequelize = require('sequelize');
const sequelize = new Sequelize('mysql://buylocalAPI:buyl0cal@localhost:3306/buylocal');

//var benutzer = require('./server/models/benutzer')

//wird weggeworfen testet connection zur DB
api.get('/testconnection', function (req,res){
  sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    res.end("Connection to DB established");
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
    res.end("Connection to DB failed");
  });
})

//definition of Benutzer Model in DB
const Benutzer= sequelize.define('Benutzer',{
  BenutzerID: {type: Sequelize.INTEGER, primaryKey:true},
  BenutzerName: Sequelize.STRING,
  Mail: Sequelize.STRING,
  Passwort: Sequelize.STRING,
  PublicKey: Sequelize.STRING,
  last_login: Sequelize.DATE,
  reg_date: Sequelize.DATE,
},{tableName: 'Benutzer', timestamps:false})


api.get('/testregister', function (req,res){
  var register = require('./register.js');
  res.end(register("hansel","hansel@test.de","passwort"));
})

api.get('/testlogin', function (req,res){
  var request = require('request');
  var neededPasswort = "passwort";
  var neededMail = "hansel@test.de";

  var rsaKeyGenerator = require("./rsaKeyGenerator");
  var cryptico = require("cryptico");
  var neededPublicKey = cryptico.publicKeyString(rsaKeyGenerator(neededPasswort));
  var login = require('./login');
  res.end(login(null,neededMail,neededPasswort,neededPublicKey));
})

//Gives back the public RSA key part of the server
api.get('/publicKey', function(req,res){
  res.json({success: true, publicKey: key.exportKey("components-public-pem")});
})

api.get('/user/:BenutzerID/:Token', function (req,res){
  if(req.params.Token&&req.params.BenutzerID){
    try{
      var decryptedTokenWithExtra = key.decrypt(req.params.Token);
      var decryptedToken=decryptedTokenWithExtra.toString().substring(0, decryptedTokenWithExtra.toString().length -16);
      decryptedToken = jwt.verify(decryptedToken,secret);
      var current_time = Date.now/1000;
      if(decrpytedToken.exp>current_time){
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
    }catch {
      res.json({success:false, message:"Token nicht entschlüsselb ar"})
    }
  }else{
    res.json({success:false,message:"Fehlerhafte Anfrage"});
  }
})

 
//Post needs Token BenutzerID, BenutzerName, Mail in Body of request
api.post('/changeuser', function (req,res){
  if(req.body.Token&&req.body.BenutzerID&&req.body.BenutzerName&&req.body.Mail){
    try{
      var decryptedTokenWithExtra = key.decrypt(req.body.Token);
      var decryptedToken=decryptedTokenWithExtra.toString().substring(0, decryptedTokenWithExtra.toString().length -16);
      decryptedToken = jwt.verify(decryptedToken,secret);
      var current_time = Date.now/1000;
      if(decryptedToken.exp>current_time ){
        if(decryptedToken.payload.BenutzerID == reg.body.BenutzerID){
          Benutzer.update({BenutzerName:req.body.Benutzername, Mail:req.body.Mail},{ where: {BenutzerID:req.body.BenutzerID}});
          res.json({succes:true, message:"Werte geändert"});
        }else{
          res.json({success:false, message:"falsche BenutzerID"})
        }
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

/**
 * req.body.name übergebener USername oder Emailadresse
 * req.body.passwort übergebener Hashwert des Passwortes
 */
//code für den Login hier einfügen
api.post('/login', function (req,res){
  if((req.body.Mail||req.body.Username)&&req.body.Passwort){
    if (req.body.Mail){
      Benutzer.findOne({
        where: {Mail: req.body.Mail}}).then(benutzer =>{
          if (benutzer){
            completePassphraseWithExtra = key.decrypt(req.body.Passwort);
            var completePassphraseWithout= completePassphraseWithExtra.toString().substring(0, completePassphraseWithExtra.toString().length -16);//deletes last 16 chars (the random signs)
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
              var keyFromUser= new NodeRSA();
              keyFromUser.importKey(benutzer.publicKey);
              encryptedToken = keyFromUser.encrypt(token);


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

            completePassphraseWithExtra = key.decrypt(req.body.Passwort);
            var completePassphraseWithout= completePassphraseWithExtra.toString().substring(0, completePassphraseWithExtra.toString().length -16);//deletes last 16 chars (the random signs)
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
              var keyFromUser= new NodeRSA();
              keyFromUser.importKey(benutzer.publicKey);
              encryptedToken = keyFromUser.encrypt(token);

              Benutzer.update({last_login:Date.now()},{BenutzerID:benutzer.BenutzerID});

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
              var completePassphraseWithExtra = key.decrypt(req.body.Passwort);
              var completePassphraseWithout= completePassphraseWithExtra.toString().substring(0, completePassphraseWithExtra.toString().length -16);//deletes last 16 chars (the random signs)
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
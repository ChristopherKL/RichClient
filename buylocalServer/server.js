var express = require('express');
var api = express();
var fs = require('fs');
const NodeRSA = require('node-rsa');

var cryptico=require("cryptico");

const key = new NodeRSA({b: 512}); //512 bit RSA Schlüsselpaar
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
  res.json({success: true, publicKey: key.exportKey("public",'pkcs1')});
})

/**
 * req.body.name übergebener USername oder Emailadresse
 * req.body.passwort übergebener Hashwert des Passwortes
 */
//code für den Login hier einfügen
api.post('/login', function (req,res){
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
            token= tokenGenerator(benutzer.BenutzerID);
            
            //token encryption
            encryptedToken = cryptico.publicKeyFromString(benutzer.PublicKey).encrypt(token);


            Benutzer.update({last_login:Date.now()},{BenutzerID:benutzer.BenutzerID});

            res.json({success: true, message: "Ein Token", BenutzerName: benutzer.BenutzerName, Mail:benutzer.Mail, token: encryptedToken});
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
              Benutzer.update({PublicKey:req.body.PublicKey},{BenutzerID:benutzer.BenutzerID});
              benutzer.PublicKey=req.body.PublicKey;
            }
            //token generation
            var tokenGenerator = require('./server/ownModules/tokenGenerator.js');
            token= tokenGenerator(benutzer.BenutzerID);
            
            //token encryption

            encryptedToken = cryptico.publicKeyFromString(benutzer.PublicKey).encrypt(token);

            Benutzer.update({last_login:Date.now()},{BenutzerID:benutzer.BenutzerID});

            res.json({success: true, message: "Ein Token",BenutzerName: benutzer.BenutzerName, Mail:benutzer.Mail, token: encryptedToken});
          }else{
            res.json({ success : false, message:"Passwort falsch"});
          }
        }else{
          res.json({ success : false, message:"Kein Nutzer mit dem Benutzernamen"});
        }
      })
  }
})

// code für die Registrierung hier einfügen
// Request muss übergeben werden mit BenutzerName,Mail und Passwort( mit 16 Zufallszeichen) verschlüsslet mit dem öffentlichen Schlüssel im Body
api.post('/register', function (req,res){
  Benutzer.findOne({where:{BenutzerName: req.body.BenutzerName}}).then(benutzer =>{
    if (benutzer){
      res.json({ success : false, message:"Benutzer schon vorhanden"});
    }else{
      Benutzer.findOne({where:{Mail: req.body.Mail}}).then(benutzer =>{
        if(benutzer){
          res.json({ success : false, message:"Mail schon vorhanden"});
        }else{

          var completePassphraseWithExtra = key.decrypt(req.body.Passwort);
          var completePassphraseWithout= completePassphraseWithExtra.toString().substring(0, completePassphraseWithExtra.toString().length -16);//deletes last 16 chars (the random signs)
          Benutzer.create({ BenutzerName: req.body.BenutzerName, Mail: req.body.Mail, reg_date: Date.now(), Passwort:  completePassphraseWithout}).then(benutzer =>{
            if(benutzer){
              res.json({success: true, message: "Nutzer erstellt"});
            }else{
              res.json({ success : false, message:"Fehler beim Erstellen des Nutzers"});
            }
          })
        }
      })
    }
  })
})

//erstellt den Server auf Port 8081 des Localhost
var server = api.listen(8081, function (){
  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)
})
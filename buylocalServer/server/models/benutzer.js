
const Sequelize = require('sequelize');
const sequelize = new Sequelize("buylocal","buylocalAPI","buyl0cal",{host: 'localhost', dialect:"mysql",logging:false});

 const Benutzer= sequelize.define('Benutzer',{
  BenutzerID: {type: Sequelize.INTEGER, primaryKey:true},
  BenutzerName: {type: Sequelize.STRING, unique:true},
  Mail: {type: Sequelize.STRING, unique:true},
  Passwort: Sequelize.STRING,
  PublicKey: Sequelize.STRING,
  last_login: Sequelize.DATE,
  reg_date: Sequelize.DATE,
},{tableName: 'Benutzer', timestamps:false});
module.exports = Benutzer;
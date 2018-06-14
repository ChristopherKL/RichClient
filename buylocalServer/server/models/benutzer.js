
const Sequelize = require('sequelize');
const sequelize = new Sequelize('mysql://buylocalAPI:buyl0cal@localhost:3306/buylocal');

 const Benutzer= sequelize.define('Benutzer',{
  BenutzerID: {type: Sequelize.INTEGER, primaryKey:true},
  BenutzerName: Sequelize.STRING,
  Mail: Sequelize.STRING,
  Passwort: Sequelize.STRING,
  PublicKey: Sequelize.STRING,
  last_login: Sequelize.DATE,
  reg_date: Sequelize.DATE,
},{tableName: 'Benutzer', timestamps:false});
module.exports = Benutzer;
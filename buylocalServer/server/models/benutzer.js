
const Sequelize = require('sequelize');
const moment = require('moment');
const sequelize = new Sequelize("buylocal","buylocalAPI","buyl0cal",{host: 'localhost', dialect:"mysql",logging:false});

 const Benutzer= sequelize.define('Benutzer',{
  BenutzerID: {type: Sequelize.INTEGER, primaryKey:true},
  BenutzerName: {type: Sequelize.STRING, unique:true},
  Mail: {type: Sequelize.STRING, unique:true},
  Passwort: Sequelize.STRING,
  PublicKey: Sequelize.STRING,
  last_login: {type:Sequelize.DATE,    get: function() {return moment.utc(this.getDataValue('last_login')).format('DD.MM.YYYY')}},
  reg_date: {type:Sequelize.DATE,    get: function() {return moment.utc(this.getDataValue('last_login')).format('DD.MM.YYYY')}},
},{tableName: 'Benutzer', timestamps:false});
module.exports = Benutzer;
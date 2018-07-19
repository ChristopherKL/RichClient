const Sequelize = require('sequelize');
const moment = require('moment');
const sequelize = new Sequelize("buylocal","buylocalAPI","buyl0cal",{host: 'localhost', dialect:"mysql",logging:false});

 const Meldung= sequelize.define('Meldung',{
  MeldungID: {type: Sequelize.INTEGER, primaryKey:true, autoIncrement:true},
  Angebot: Sequelize.INTEGER,
  Grund: Sequelize.STRING,
  Melder: Sequelize.INTEGER,
  Datum: {type:Sequelize.DATE,    get: function() {return moment.utc(this.getDataValue('Datum')).format('HH:MM DD.MM.YYYY')}},
},{tableName: 'Meldung', timestamps:false});
module.exports = Meldung;
const Sequelize = require('sequelize');
const sequelize = new Sequelize("buylocal","buylocalAPI","buyl0cal",{host: 'localhost', dialect:"mysql",logging:false});

 const Nachricht= sequelize.define('Nachricht',{
  NachrichtID: {type: Sequelize.INTEGER, primaryKey:true, autoIncrement:true},
  VerhandlungID: Sequelize.INTEGER,
  Text: Sequelize.STRING,
  Absender: Sequelize.INTEGER,
  Gelesen:{type:Sequelize.DATE,    get: function() {return moment.utc(this.getDataValue('last_login')).format('HH:MM DD.MM.YYYY')}},
  Datum: {type:Sequelize.DATE,    get: function() {return moment.utc(this.getDataValue('last_login')).format('HH:MM DD.MM.YYYY')}},
},{tableName: 'Nachricht', timestamps:false});
module.exports = Nachricht;
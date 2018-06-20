const Sequelize = require('sequelize');
const sequelize = new Sequelize("buylocal","buylocalAPI","buyl0cal",{host: 'localhost', dialect:"mysql",logging:false});

 const Nachricht= sequelize.define('Nachricht',{
  NachrichtID: {type: Sequelize.INTEGER, primaryKey:true, autoIncrement:true},
  Betreff: Sequelize.STRING,
  Text: Sequelize.STRING,
  PLZ:Sequelize.STRING,
  Absender: Sequelize.INTEGER,
  Empfänger: Sequelize.INTEGER,
  AbsenderSchlüssel: Sequelize.STRING,
  EmpfängerSchlüssel: Sequelize.STRING,
  Gelesen:Sequelize.DATE,
  Datum: Sequelize.DATE,
},{tableName: 'Nachricht', timestamps:false});
module.exports = Nachricht;
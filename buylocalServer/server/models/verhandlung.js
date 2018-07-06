
const Sequelize = require('sequelize');
const sequelize = new Sequelize("buylocal","buylocalAPI","buyl0cal",{host: 'localhost', dialect:"mysql",logging:false});

 const Verhandlung= sequelize.define('Verhandlung',{
  VerhandlungID: {type: Sequelize.INTEGER, primaryKey:true,  autoIncrement:true},
  AngebotID:Sequelize.INTEGER,
  Betreff: Sequelize.STRING,
  Absender: Sequelize.INTEGER,
  Empfänger: Sequelize.INTEGER,
  EmpfängerCheck:Sequelize.BOOLEAN,
  AbsenderCheck:Sequelize.BOOLEAN,
  AbsenderSchlüssel: Sequelize.STRING,
  EmpfängerSchlüssel: Sequelize.STRING,
},{tableName: 'Verhandlung', timestamps:false});
module.exports = Verhandlung;
const Sequelize = require('sequelize');
const sequelize = new Sequelize("buylocal","buylocalAPI","buyl0cal",{host: 'localhost', dialect:"mysql",logging:false});

const BereitsAngezeigt= sequelize.define('BereitsAngezeigt',{
  BereitsAngezeigtID: {type: Sequelize.INTEGER, primaryKey:true, autoIncrement:true},
  SuchanfrageID: Sequelize.INTEGER,
  AngebotID:Sequelize.INTEGER,
},{tableName: 'BereitsAngezeigt', timestamps:false});
module.exports = BereitsAngezeigt;

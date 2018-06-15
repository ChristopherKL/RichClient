const Sequelize = require('sequelize');
const sequelize = new Sequelize("buylocal","buylocalAPI","buyl0cal",{host: 'localhost', dialect:"mysql",logging:false});

 const AngebotKategorie= sequelize.define('AngebotKategorie',{
  AngebotID: {type: Sequelize.INTEGER, primaryKey:true},
  KategorieID: Sequelize.INTEGER,
},{tableName: 'AngebotKategorie', timestamps:false});
module.exports = AngebotKategorie;
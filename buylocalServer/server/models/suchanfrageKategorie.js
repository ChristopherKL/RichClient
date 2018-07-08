
const Sequelize = require('sequelize');
const sequelize = new Sequelize("buylocal","buylocalAPI","buyl0cal",{host: 'localhost', dialect:"mysql",logging:false});

 const SuchanfrageKategorie= sequelize.define('SuchanfrageKategorie',{
    SuchanfrageID: {type: Sequelize.INTEGER, primaryKey:true,  autoIncrement:true},
    KategorieID:Sequelize.INTEGERS
},{tableName: 'SuchanfrageKategorie', timestamps:false});
module.exports = SuchanfrageKategorie;
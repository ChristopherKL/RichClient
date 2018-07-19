const Sequelize = require('sequelize');
const sequelize = new Sequelize("buylocal","buylocalAPI","buyl0cal",{host: 'localhost', dialect:"mysql",logging:false});

 const Kategorie= sequelize.define('Kategorie',{
    KategorieID: {type: Sequelize.INTEGER, primaryKey:true},
    Name: Sequelize.STRING,
    UeberKategorie: Sequelize.INTEGER,
},{tableName: 'Kategorie', timestamps:false});
module.exports = Kategorie;
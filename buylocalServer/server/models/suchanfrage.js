
const Sequelize = require('sequelize');
const sequelize = new Sequelize("buylocal","buylocalAPI","buyl0cal",{host: 'localhost', dialect:"mysql",logging:false});

 const Suchanfrage= sequelize.define('Suchanfrage',{
    SuchanfrageID: {type: Sequelize.INTEGER, primaryKey:true,  autoIncrement:true},
    BenutzerID:Sequelize.INTEGER,
    AnfrageDaten:Sequelize.STRING,
    Name:Sequelize.STRING
},{tableName: 'Suchanfrage', timestamps:false});
module.exports = Suchanfrage;

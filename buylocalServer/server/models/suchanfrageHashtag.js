
const Sequelize = require('sequelize');
const sequelize = new Sequelize("buylocal","buylocalAPI","buyl0cal",{host: 'localhost', dialect:"mysql",logging:false});

 const SuchanfrageHashtag= sequelize.define('SuchanfrageHashtag',{
    SuchanfrageID: {type: Sequelize.INTEGER, primaryKey:true,  autoIncrement:true},
    HashtagName:Sequelize.STRING
},{tableName: 'SuchanfrageHashtag', timestamps:false});
module.exports = SuchanfrageHashtag;
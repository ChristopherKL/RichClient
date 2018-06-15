const Sequelize = require('sequelize');
const sequelize = new Sequelize("buylocal","buylocalAPI","buyl0cal",{host: 'localhost', dialect:"mysql",logging:false});

 const Hashtag= sequelize.define('Hashtag',{
  Name: {type: Sequelize.STRING, primaryKey:true},
  NutzungsAnz: Sequelize.INTEGER,
},{tableName: 'Hashtag', timestamps:false});
module.exports = Hashtag;
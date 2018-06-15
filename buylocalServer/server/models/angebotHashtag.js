const Sequelize = require('sequelize');
const sequelize = new Sequelize("buylocal","buylocalAPI","buyl0cal",{host: 'localhost', dialect:"mysql",logging:false});

 const AngebotHashtag= sequelize.define('AngebotHashtag',{
  ID: {type: Sequelize.INTEGER, primaryKey:true},
  AngebotID: Sequelize.INTEGER,
  HashtagName: Sequelize.STRING,
},{tableName: 'AngebotHashtag', timestamps:false});
module.exports = AngebotHashtag;
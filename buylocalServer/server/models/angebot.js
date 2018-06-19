
const Sequelize = require('sequelize');
const sequelize = new Sequelize("buylocal","buylocalAPI","buyl0cal",{host: 'localhost', dialect:"mysql",logging:false});

 const Angebot= sequelize.define('Angebot',{
  AngebotID: {type: Sequelize.INTEGER, primaryKey:true, autoIncrement:true},
  Titel: Sequelize.STRING,
  Preis: Sequelize.DOUBLE,
  Beschreibung: Sequelize.STRING,
  PLZ:Sequelize.STRING,
  Bild1: Sequelize.STRING,
  Bild2: Sequelize.STRING,
  Bild3: Sequelize.STRING,
  Bild4: Sequelize.STRING,
  Bild5: Sequelize.STRING,
  Straße: Sequelize.STRING,
  Hausnummer: Sequelize.STRING,
  BenutzerID:Sequelize.INTEGER,
  reg_date: Sequelize.DATE,
},{tableName: 'Angebot', timestamps:false});
module.exports = Angebot;
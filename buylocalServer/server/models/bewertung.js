
const Sequelize = require('sequelize');
const sequelize = new Sequelize("buylocal","buylocalAPI","buyl0cal",{host: 'localhost', dialect:"mysql",logging:false});

 const Bewertung= sequelize.define('Bewertung',{
    BewertungID: {type: Sequelize.INTEGER, primaryKey:true, autoIncrement:true},
    Datum: Sequelize.DATE,
    Sterne: Sequelize.DOUBLE,
    Bewerter: Sequelize.INTEGER,
    Bewerteter:Sequelize.INTEGER,
    Text: Sequelize.STRING,
    VerhandlungID: Sequelize.INTEGER
},{tableName: 'Bewertung', timestamps:false});
module.exports = Bewertung;
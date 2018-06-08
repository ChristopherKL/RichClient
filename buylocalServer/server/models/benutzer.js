

//User model für Sequelize***********************
const benutzer = sequelize.define('Benutzer', {
    EMail: {
      type: Sequelize.STRING
    },
    Passwort: {
      type: Sequelize.STRING
    }
  });
  
   // force: true will drop the table if it already exists
  benutzer.sync({force: true}).then(() => {
    // Table created
    return benutzer.create({
      firstName: 'John',
      lastName: 'Hancock'
    });
  });
  //*********************************************
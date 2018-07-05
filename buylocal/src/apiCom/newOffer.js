export default async function newOffer (token, title, desc, street, streetnr,plz,
price,subcategoryID,hashtag,images) {
    try {
      let response = await fetch(
        'http://karlpi:8081/createangebot',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            Titel: title,
            Beschreibung: desc,
            Straße: street,
            Hausnummer: streetnr,
            PLZ: plz,
            Preis: price,
            KategorieID: subcategoryID,
            Hashtag: hashtag,
            Bild1: images[0],
            Bild2: images[1],
            Bild3: images[2],
            Bild4: images[3],
            Bild5: images[4],
            Token: token
          })
        }
      );
      let responseJson = await response.json();
      console.log(JSON.stringify(responseJson)); 
      if(responseJson.success != true) {
        return responseJson.message;
      }
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
    
  }
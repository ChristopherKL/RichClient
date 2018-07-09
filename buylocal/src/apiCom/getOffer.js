export default async function getOffer(token, id) {
    try {
        let response = await fetch(
            'http://karlspi.ddnss.de:8081/angebot/'+id+"/"+encodeURIComponent(token)
        );
        console.log("got res");
  
        let responseJson = await response.json();
        console.log(JSON.stringify(responseJson)); 
        if(responseJson.success == false) {
            return responseJson.message;
        }
        res = ({
            name: responseJson.Titel,
            imgs: [responseJson.Bild1, responseJson.Bild2, responseJson.Bild3, responseJson.Bild4, responseJson.Bild5],
            price: responseJson.Preis,
            desc: responseJson.Beschreibung,
            zipcode: responseJson.PLZ,
            insertDate: responseJson.reg_date,
            insertUser: responseJson.BenutzerName,
            insertUserid: responseJson.BenutzerID,
            insertUserKey: responseJson.PublicKey,
            hashtags: []

        });

        for(let key in responseJson.hashtags) {
            res.hashtags.push(responseJson[key]);
        }

        return res;
      } catch (error) {
        console.error(error);
        return false;
      }
    

}
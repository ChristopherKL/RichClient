export default async function createReport (token, offerID, reason) {
    try {
      let response = await fetch(
        'http://karlspi.ddnss.de:8081/angebotmelden',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            AngebotID: offerID,
            Grund: reason,
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
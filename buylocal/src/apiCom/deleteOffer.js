export default async function deleteOffer (token, offerId) {
    try {
      let response = await fetch(
        'http://karlpi:8081/deleteangebot',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            AngebotID: offerId,
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
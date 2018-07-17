export default async function getNewestOffers (token, lat, lon, limit) {
    try {
      let response = await fetch(
        'http://karlspi.ddnss.de:8081/neusteAngebote',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            limit: limit,
            lat: lat,
            lon: lon,
            Token: token
          })
        }
      );
      let responseJson = await response.json();
      console.log(JSON.stringify(responseJson)); 
      if(responseJson.success != true) {
        return responseJson.message;
      }
      return responseJson;
    } catch (error) {
      console.error(error);
      return false;
    }
    
  }
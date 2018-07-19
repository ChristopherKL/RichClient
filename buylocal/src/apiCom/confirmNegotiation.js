export default async function confirmNegotiation (token, negID) {
    try {
      let response = await fetch(
        'http://karlspi.ddnss.de:8081/checkverhandlung',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            VerhandlungID: negID,
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
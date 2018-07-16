export default async function rateUser (token, negID, partnerID, starNum, text) {
    try {
      let response = await fetch(
        'http://karlpi:8081/bewerten',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            Bewerteter: partnerID,
            Sterne: starNum,
            Text: text,
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
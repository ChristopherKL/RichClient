
export default async function editProfile (token, newMail, newUsername) {
    try {
      let response = await fetch(
        'http://karlspi.ddnss.de:8081/changeuser',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            BenutzerName: newUsername,
            Mail: newMail,
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
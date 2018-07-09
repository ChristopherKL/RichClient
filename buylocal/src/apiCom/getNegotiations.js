export default async function getNegotiations(token) {
    try {
        let response = await fetch(
            'http://karlspi.ddnss.de:8081/verhandlungen/'
        );
        console.log("got res");
  
        let responseJson = await response.json();
        console.log(JSON.stringify(responseJson)); 
        if(responseJson.success == false) {
            return responseJson.message;
        }
        return responseJson;
      } catch (error) {
            console.error(error);
            return false;
      }
}
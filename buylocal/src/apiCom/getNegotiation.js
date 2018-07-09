export default async function getNegotiation(token, negId) {
    try {
        let response = await fetch(
            'http://karlpi:8081/nachrichten/'+negId+'/'+encodeURIComponent(token)
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
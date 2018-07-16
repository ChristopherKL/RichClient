export default async function getServerKey() {
    try {
        let response = await fetch(
            'http://karlspi.ddnss.de:8081/publickey'
        );
        let responseJson = await response.json();

        let serverPublicKey = responseJson.publicKey;
        console.log("got key ");

        return serverPublicKey;
      } catch (error) {
            return false;
    }
}
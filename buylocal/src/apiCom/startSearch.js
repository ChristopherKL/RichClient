export default async function startSearch(token, searchTerm, plz, minPrice, maxPrice, hashtags, categoryID, saveSearch, name) {
    try {
        let response = await fetch(
            'http://karlspi.ddnss.de:8081/search',
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Token: token,
                    Suchbegriff: searchTerm,
                    PLZ: plz,
                    MaxPreis: maxPrice,
                    MinPreis: minPrice,
                    HashtagArray: hashtags,
                    KategorieID: categoryID,
                    Speichern: saveSearch,
                    Name: name
                })
            }
        );
        let responseJson = await response.json();
        console.log(JSON.stringify(responseJson));
        if (responseJson.success != true) {
            return responseJson.message;
        }
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}
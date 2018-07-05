
export default async function getCategories() {
    try {
        let response = await fetch(
            'http://karlpi:8081/kategorie'
        );
  
        let responseJson = await response.json();
        
        if(responseJson.success == false) {
            return responseJson.message;
        }
        res = ({    "mainCats": responseJson.UeberKategorien,
                    "subCats": []
        });

        res.mainCats.forEach(function(element, index) {
            res.subCats[index] = []
        });
        
        let mainIndex = -1;
        let subCatCounter = 0;
        let oldMainCatId = -1;
        
        for(subCatCounter = 0; subCatCounter < responseJson.unterKategorien.length; subCatCounter++) {
            if(responseJson.unterKategorien[subCatCounter].UeberKategorie != oldMainCatId) {
                oldMainCatId = responseJson.unterKategorien[subCatCounter].UeberKategorie
                mainIndex++;
            }
            res.subCats[mainIndex].push(responseJson.unterKategorien[subCatCounter]);            
        }
        

        return res;
      } catch (error) {
        console.error(error);
        return false;
      }
    

}
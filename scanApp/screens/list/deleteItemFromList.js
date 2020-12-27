const URI = 'http://mobiele.kc-productions.org/deleteItemFromList.php?itemID=';

export default {
    async deleteItemFromList(userID, barcode) {
        try {
            let url = URI + barcode + "&userID=" + userID;
            let response = await fetch(url);
            let responseJsonData = await response.json();
            return responseJsonData;
        }
        catch(e) {
            console.log(e)
        }
    }
}
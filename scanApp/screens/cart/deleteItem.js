const URI = 'http://mobiele.kc-productions.org/deleteItemFromCart.php?itemID=';

export default {
    async deleteItem(userID, barcode) {
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
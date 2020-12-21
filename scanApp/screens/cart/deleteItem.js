const URI = 'http://mobiele.kc-productions.org/deleteItemFromCart.php?itemID=';

export default {
    async deleteItem(userID, barcode) {
        try {
            let response = await fetch(URI + barcode + "&userID=" + userID);
            let responseJsonData = await response.json();
            return responseJsonData;
        }
        catch(e) {
            console.log(e)
        }
    }
}
const URI = 'http://mobiele.kc-productions.org/addToCart.php?productID=';

export default {
    async updateOneQuantityItem(userID, productID, currentQuantity) {
        try {
            let url = URI + productID + "&quantity=" + currentQuantity + "&userID=" + userID;
            let response = await fetch(url);
            let responseJsonData = await response.json();
            return responseJsonData;
        }
        catch(e) {
            console.log(e)
        }
    }
}
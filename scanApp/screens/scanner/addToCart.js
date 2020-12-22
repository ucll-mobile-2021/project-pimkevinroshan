// addToCart.js

const URI = 'http://mobiele.kc-productions.org/addToCart.php?productID=';

export default {
    async addToCart(userID, productID, quantity) {
        try {
            let url = URI + productID + "&quantity=" + quantity + "&userID=" + userID;
            let response = await fetch(url);
            let responseJsonData = await response.json();
            return responseJsonData;
        }
        catch(e) {
            console.log(e)
        }
    }
}
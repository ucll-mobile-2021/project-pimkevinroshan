// FetchProduct.js

const URI = 'http://mobiele.kc-productions.org/fetchProduct.php?productID=';

export default {
    async fetchProduct(userID, productID) {
        try {
            let url = URI + productID + "&userID=" + userID;
            let response = await fetch(url);
            let responseJsonData = await response.json();
            return responseJsonData;
        }
        catch(e) {
            console.log(e)
        }
    }
}
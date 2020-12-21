// FetchProduct.js

const URI = 'http://mobiele.kc-productions.org/fetchProduct.php?productID=';

export default {
    async fetchProduct(productID) {
        try {
            let response = await fetch(URI + productID);
            let responseJsonData = await response.json();
            return responseJsonData;
        }
        catch(e) {
            console.log(e)
        }
    }
}
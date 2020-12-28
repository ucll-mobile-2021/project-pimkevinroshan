
const URI = 'http://mobiele.kc-productions.org/getAllProducts.php?userID=';

export default {
    async fetchAllProducts(userID) {
        try {
            let url = URI + userID;
            let response = await fetch(url);
            let responseJsonData = await response.json();
            return responseJsonData;
        }
        catch(e) {
            console.log(e)
        }
    }
}
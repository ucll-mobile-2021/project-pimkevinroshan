
const URI = 'http://mobiele.kc-productions.org/getAllProducts.php';

export default {
    async fetchAllProducts() {
        try {
            let url = URI;
            let response = await fetch(url);
            let responseJsonData = await response.json();
            return responseJsonData;
        }
        catch(e) {
            console.log(e)
        }
    }
}
// FetchCart.js

const URI = 'http://mobiele.kc-productions.org/personalCart.php';

export default {
    async fetchCart() {
        try {
            let response = await fetch(URI);
            console.log("DA" + response)
            let responseJsonData = await response.json();
            return responseJsonData;
        }
        catch(e) {
            console.log(e)
        }
    }
}
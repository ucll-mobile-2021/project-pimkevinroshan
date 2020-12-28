// addToList.js

const URI = 'http://mobiele.kc-productions.org/addToList.php?productID=';

export default {
    async addToList(userID, productID) {
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
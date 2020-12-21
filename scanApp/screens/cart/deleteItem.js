const URI = 'http://mobiele.kc-productions.org/deleteItem.php';

export default {
    async deleteItem(barcode) {
        try {
            let response = await fetch(URI, {method: "DELETE", body: {itemID: barcode}});
            let responseJsonData = await response.json();
            return responseJsonData;
        }
        catch(e) {
            console.log(e)
        }
    }
}
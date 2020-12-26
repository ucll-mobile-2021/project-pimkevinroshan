// getCredentials.js

const URI = 'http://mobiele.kc-productions.org/getUser.php?userID=';

export default {
    async fetchUser(userID) {
        try {
            let url = URI + userID;
            let response = await fetch(url);
            return await response.json();
        }
        catch(e) {
            console.log(e)
        }
    }
}
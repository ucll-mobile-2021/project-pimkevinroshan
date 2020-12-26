// uploadUser.js

const URI = 'http://mobiele.kc-productions.org/uploadUser.php?userID=';

export default {
    async uploadUser(userID, lName, fName, email) {
        try {
            let url = URI + userID + '&lName=' + lName + '&fName=' + fName + '&email=' + email;
            let response = await fetch(url);
            return await response.json();
        }
        catch(e) {
            console.log(e)
        }
    }
}
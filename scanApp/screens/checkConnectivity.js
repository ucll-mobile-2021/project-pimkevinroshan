import * as Network from 'expo-network';
import {Alert} from "react-native";

export default {
    async CheckConnectivity() {
        const obj = await Network.getNetworkStateAsync()
        if (obj.isInternetReachable) {
            return true;
        } else {
            return false;
        }
    },

    showError(navigation) {
        Alert.alert("Oh Oh!", "Het lijkt erop dat u geen verbinding heeft met het internet. " +
            "Voor de werking van deze app is een internet verbinding vereist. Gelieve opnieuw " +
            "verbinding te maken met het internet!", [
            {
                text: 'Begrepen', onPress: () => {
                    navigation.jumpTo('Home');
                }
            }
        ], {cancelable: false});
    }
}

import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import Constants from 'expo-constants';
import {Dimensions} from 'react-native';
import TopBar from "../../components/TopBar";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    screenEstate: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    statusBar: {
        backgroundColor: '#fe0127',
        height: Constants.statusBarHeight
    },
});

const HomeScreen = ({}) => {
    let logoFromFile = require('../../assets/delhaize.png');
    return (
        <View style={styles.container}>
            <View style={styles.statusBar}/>
            <TopBar page={"Scan code aan kassa"}/>
            <View style={styles.screenEstate}>
                <QRCode
                    logo={logoFromFile}
                    logoSize={100}
                    logoBackgroundColor='transparent'
                    backgroundColor='transparent'
                    value={'http://mobiele.kc-productions.org/handleUser.php?userID=' + Constants.installationId}
                    size={Dimensions.get('window').width - 30}
                />
            </View>
        </View>
    );
};

export default HomeScreen;
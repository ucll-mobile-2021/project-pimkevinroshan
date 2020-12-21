import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import Constants from 'expo-constants';
import { Dimensions } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const HomeScreen = ({navigation}) => {
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: (props) => (
                <Text
                    {...props}
                    style={{color: 'white', fontWeight: 'bold'}}>
                    Betalingscode
                </Text>
            ),
            headerStyle: {
                backgroundColor: '#fe0127', //Set Header color
            },
        });
    }, [navigation]);
    let logoFromFile = require('../../assets/delhaize.png');
    return (
        <View style={styles.container}>
            <QRCode
                logo={logoFromFile}
                logoSize={100}
                logoBackgroundColor='transparent'
                backgroundColor = 'transparent'
                value={Constants.installationId}
                size={Dimensions.get('window').width-30}
            />
        </View>
    );
};

export default HomeScreen;
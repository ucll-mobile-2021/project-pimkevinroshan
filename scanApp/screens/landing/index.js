import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import TopBar from '../../components/TopBar';

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

const LandingScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.statusBar} />
            <TopBar page={"Welkom"}></TopBar>
            <View style={styles.screenEstate}>
                <Text>Landing Screen</Text>
            </View>
        </View>
    );
};

export default LandingScreen;
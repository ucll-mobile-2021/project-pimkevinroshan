import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const LandingScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text>Landing Screen</Text>
            <Button
                title="Go to Cart"
                onPress={() => navigation.navigate('Cart')}
            />
            <Button
                title="Go to Scanner"
                onPress={() => navigation.navigate('Scanner')}
            />
            <Button
                title="Go to Payment Code"
                onPress={() => navigation.navigate('Payment')}
            />
        </View>
    );
};

export default LandingScreen;
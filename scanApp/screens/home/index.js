import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

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
                    Custom Title
                </Text>
            ),
            headerStyle: {
                backgroundColor: '#f4511e', //Set Header color
            },
        });
    }, [navigation]);
    return (
        <View style={styles.container}>
            <Text>Protected Home Screen</Text>
        </View>
    );
};

export default HomeScreen;
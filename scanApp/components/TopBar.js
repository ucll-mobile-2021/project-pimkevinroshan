import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

class TopBar extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.topBarText}>{this.props.page}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'stretch',
        height: 50,
        flexDirection: 'row', // row
        backgroundColor: '#fe0127',
        alignItems: 'center',
        justifyContent: 'space-around', // center, space-around
        paddingLeft: 10,
        paddingRight: 10,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
    },
    topBarText: {
        color: "#ffffff",
        fontSize: 20,
        fontWeight: 'bold'
    },
});

export default TopBar;
import 'react-native-gesture-handler';

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import LandingScreen from './screens/landing';
import CartScreen from './screens/cart';
import HomeScreen from './screens/home';
import ScannerScreen from './screens/scanner';

const RootStack = createStackNavigator();
import {StyleSheet, Text, View} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const App = () => {
    return (
        <NavigationContainer>
            <RootStack.Navigator>
                <RootStack.Screen
                    name="Start"
                    component={LandingScreen}
                    options={{
                        title: 'Start',
                        headerStyle: {
                            backgroundColor: '#fe0127',
                        }
                    }}
                />
                <RootStack.Screen
                    name="Cart"
                    component={CartScreen}
                    options={{
                        title: 'Winkelmandje',
                        headerStyle: {
                            backgroundColor: '#fe0127',
                        }
                    }}
                />
                <RootStack.Screen
                    name="Scanner"
                    component={ScannerScreen}
                    options={{
                        title: 'Scan een product!',
                        headerStyle: {
                            backgroundColor: '#fe0127',
                        }
                    }}
                />
                <RootStack.Screen name="Payment" component={HomeScreen}/>
            </RootStack.Navigator>
        </NavigationContainer>
    );
};

export default App;
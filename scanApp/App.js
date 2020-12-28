import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';

import LandingScreen from './screens/landing';
import CartScreen from './screens/cart';
import HomeScreen from './screens/home';
import ScannerScreen from './screens/scanner';
import ShoppingListScreen from './screens/list';

const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                     } else if (route.name === 'Winkellijst') {
                        iconName = focused ? 'list' : 'list-outline';
                    } else if (route.name === 'Scanner') {
                        iconName = focused ? 'barcode' : 'barcode-outline';
                    } else if (route.name === 'Winkelwagen') {
                        iconName = focused ? 'cart' : 'cart-outline';
                    } else if (route.name === 'Betaling') {
                        iconName = focused ? 'card' : 'card-outline';
                    }

                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
            tabBarOptions={{
                activeTintColor: '#fe0127',
                inactiveTintColor: 'gray',
            }}
        >
            <Tab.Screen name="Home" component={LandingScreen} />
            <Tab.Screen name="Winkellijst" component={ShoppingListScreen} />
            <Tab.Screen name="Scanner" component={ScannerScreen} />
            <Tab.Screen name="Winkelwagen" component={CartScreen} />
            <Tab.Screen name="Betaling" component={HomeScreen} />
        </Tab.Navigator>
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <MyTabs/>
        </NavigationContainer>
    );
}
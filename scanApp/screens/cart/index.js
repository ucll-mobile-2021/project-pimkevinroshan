import React, {Component} from "react";
import {StyleSheet, View, FlatList, Image, Text, TouchableOpacity, Alert, Animated, Button} from "react-native";
import Constants from 'expo-constants';
import ajax from "./fetchCart";
import delAjax from "./deleteItem";
import updateOneQuantityAjax from "./updateQuantityByOne";
//import { GestureHandler } from 'expo'
//import * as Swipeable from 'react-native-gesture-handler';
//import SwipeItem from "./swipeable";
import Swipeable from 'react-native-gesture-handler/Swipeable';
import TopBar from "../../components/TopBar";
import Ionicons from '@expo/vector-icons/Ionicons';
import connected from "../checkConnectivity";

const basketIcon = require("./basket.png");
const plusIcon = require("./plus.png");
const minusIcon = require("./minus.png");
const trashIcon = require("./trash.png");
const easterEgg = require("./easterEgg.png");

export default class CartScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false,
            cart: []
        }
    }

    async componentDidMount() {
        await this.updateCart();
        this.props.navigation.addListener('focus', () => {
            this.updateCart();
        });
    }

    async updateCart() {
        const isConnected = await connected.CheckConnectivity();
        if (isConnected) {
            const cart = await ajax.fetchCart(Constants.installationId);
            this.setState({cart});
        } else {
            connected.showError(this.props.navigation);
        }
    }

    async deleteFromCart(barcode) {
        const temp = await delAjax.deleteItem(Constants.installationId, barcode);
        await this.updateCart();
    }

    async deleteOneFromCart(barcode, productID, quantity) {
        if (quantity === 1) {
            Alert.alert("", "Product verwijderen?", [
                {
                    text: 'Ja', onPress: () => {
                        this.deleteFromCart(barcode)
                    }
                },
                {
                    text: 'Nee', onPress: () => {
                    }
                }
            ], {cancelable: false});
        } else {
            const temp = await updateOneQuantityAjax.updateOneQuantityItem(Constants.installationId, productID, quantity - 1);
            await this.updateCart();
        }
    }

    async addOneItem(productID, quantity) {
        const temp = await updateOneQuantityAjax.updateOneQuantityItem(Constants.installationId, productID, quantity + 1);
        await this.updateCart();
    }

    renderLeftActions = (progress, dragX) => {
        const scale = dragX.interpolate({
            inputRange: [-100, 0],
            outputRange: [0, 0.7]
        })

        return (
            <TouchableOpacity style={{backgroundColor: 'white', justifyContent: 'center'}}
            >
                <Animated.Image source={easterEgg} style={{
                    transform: [{scale}]
                }}>
                </Animated.Image>

            </TouchableOpacity>
        );
    }
    render() {
        return (
            <View style={styles.mainContainer}>
                <View style={styles.statusBar}/>
                <TopBar page={"Winkelwagen"}/>
                <View style={styles.screenEstate}>
                    <FlatList
                        data={this.state.cart.products}
                        renderItem={({item}) => (
                            <View>
                                <Swipeable
                                    renderRightActions={
                                        (progress, dragX) => {
                                            const scale = dragX.interpolate({
                                                inputRange: [-100, 0],
                                                outputRange: [0.7, 0]
                                            })

                                            return(
                                                <TouchableOpacity style={{ backgroundColor: 'white', justifyContent: 'center' }}
                                                  onPress={() => {
                                                      this.deleteFromCart(item.barcode)
                                                  }
                                                  }
                                                >
                                                    <Animated.Image source={trashIcon} style={{
                                                        transform: [{ scale }]
                                                    }}>
                                                    </Animated.Image>

                                                </TouchableOpacity>
                                            );
                                        }
                                    }
                                    //renderLeftActions={this.renderLeftActions}
                                >
                                    <View style={styles.row}>
                                        <View style={styles.iconContainer}>
                                            <Image source={basketIcon} style={styles.icon}/>
                                        </View>

                                        <View style={styles.info}>
                                            {item.items > 1 && (
                                                <Text style={styles.items}>{item.items} stuks</Text>
                                            )}
                                            {item.items < 2 && (
                                                <Text style={styles.items}>{item.items} stuk</Text>
                                            )}
                                            <Text style={styles.description}>{item.description}</Text>
                                        </View>
                                        <TouchableOpacity onPress={() => {
                                            this.addOneItem(item.id, item.items)
                                        }} style={styles.addOneTouchable}>
                                            <Image source={plusIcon} style={styles.plusIcon}/>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => {
                                            this.deleteOneFromCart(item.barcode, item.id, item.items)
                                        }} style={styles.deleteOneTouchable}>
                                            <Image source={minusIcon} style={styles.minusIcon}/>
                                        </TouchableOpacity>
                                        <View style={styles.total}>
                                            <Text style={styles.unitprice}>{item.unitprice}</Text>
                                            <Text style={styles.price}>€{item.total}</Text>
                                        </View>
                                    </View>
                                </Swipeable>
                            </View>
                        )}
                        keyExtractor={(item) => item.barcode.toString()}
                    />
                    <View style={styles.totalCartRow}>
                        <Ionicons name="cart-outline" size={40} color="red"/>
                        <View style={styles.info}>
                            <Text style={styles.items}>TOTAAL</Text>
                            {this.state.cart.items === 1 && (
                                <Text style={styles.unitprice}>{this.state.cart.items} product</Text>
                            )}
                            {this.state.cart.items !== 1 && (
                                <Text style={styles.unitprice}>{this.state.cart.items} producten</Text>
                            )}
                        </View>
                        <View style={styles.cartTotal}>
                            <Text style={styles.price}>€{this.state.cart.totalPrice}</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
        
    }
    
}


/*
<TouchableOpacity onPress = {() => {this.setState({ modalVisible: true})}}>
                <View style={styles.optionsIconContainer}>
                  <Image source={trashIcon} style={styles.optionsIcon}></Image>
                </View>
              </TouchableOpacity>
*/

//onPress={() => this.deleteFromCart(item.barcode)}
const styles = StyleSheet.create({
    modal: {
        margin: 0,
        backgroundColor: 'white',
        height: 200,
        flex: 0,
        top: '35%',
        position: 'absolute',
        width: '100%'
    },
    mainContainer: {
        flex: 1,
        backgroundColor: "#fff",
    },
    title: {
        backgroundColor: "#fe0127",
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
        padding: 10,
        paddingTop: 40,
        textAlign: "center",
    },
    row: {
        borderColor: "#f1f1f1",
        borderBottomWidth: 1,
        flexDirection: "row",
        marginLeft: 10,
        marginRight: 10,
        paddingTop: 20,
        paddingBottom: 20,
    },
    totalCartRow: {
        borderColor: "#f1f1f1",
        backgroundColor: '#f1f1f1',
        borderTopWidth: 5,
        borderTopColor: 'green',
        flexDirection: "row",
        paddingTop: 20,
        paddingBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
    },
    iconContainer: {
        alignItems: "center",
        backgroundColor: "#fe0127",
        borderColor: "#fe0127",
        borderRadius: 25,
        borderWidth: 1,
        justifyContent: "center",
        height: 50,
        width: 50,
    },
    icon: {
        tintColor: "#fff",
        height: 22,
        width: 22,
    },
    addOneTouchable: {
        left: 34,
        bottom: 10,
    },
    plusIcon: {
        justifyContent: "center",
        alignItems: "center",
        height: 38,
        width: 38,
    },
    deleteOneTouchable: {
        right: 3,
        top: 35,
    },
    minusIcon: {
        justifyContent: "center",
        alignItems: "center",
        height: 38,
        width: 38,
    },
    info: {
        flex: 1,
        paddingLeft: 25,
        paddingRight: 25,
    },
    items: {
        fontWeight: "bold",
        fontSize: 16,
        marginBottom: 5,
    },
    description: {
        color: "#777676",
        fontSize: 14,
        width: '160%'
    },
    total: {
        width: 110,
        paddingRight: 5,
        alignItems: 'flex-end'
    },
    cartTotal: {
        width: 130,
        paddingRight: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    unitprice: {
        fontSize: 12,
        marginBottom: 5,
    },
    price: {
        color: "#1cad61",
        fontSize: 25,
        fontWeight: "bold",
    },
    rightSwipeItem: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 20
    },


    screenEstate: {
        flex: 1,
    },
    statusBar: {
        backgroundColor: '#fe0127',
        height: Constants.statusBarHeight
    },
});

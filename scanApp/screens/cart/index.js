import React, {Component} from "react";
import {StyleSheet, View, FlatList, Image, Text, TouchableOpacity, Alert} from "react-native";
import Constants from 'expo-constants';
import ajax from "./fetchCart";
import delAjax from "./deleteItem";
import updateOneQuantityAjax from "./updateQuantityByOne";
//import { GestureHandler } from 'expo'
//import * as Swipeable from 'react-native-gesture-handler';
//import SwipeItem from "./swipeable";
import Swipeable from 'react-native-gesture-handler/Swipeable';
import TopBar from "../../components/TopBar";

const basketIcon = require("./basket.png");
const plusIcon = require("./plus.png");
const minusIcon = require("./minus.png");
const trashIcon = require("./trash.png");

export default class CartScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false,
            cart: [],
        }
    }

    async componentDidMount() {
        const cart = await ajax.fetchCart(Constants.installationId);
        this.setState({cart});
    }

    async deleteFromCart(barcode) {
        const temp = await delAjax.deleteItem(Constants.installationId, barcode);
        const cart = await ajax.fetchCart(Constants.installationId);
        this.setState({cart});
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
                    text: 'Nee', onPress: () => {}
                }
            ], {cancelable: false});
        } else {
            const temp = await updateOneQuantityAjax.updateOneQuantityItem(Constants.installationId, productID, quantity - 1);
            const cart = await ajax.fetchCart(Constants.installationId);
            this.setState({cart});
        }
    }

    async addOneItem(productID, quantity) {
        const temp = await updateOneQuantityAjax.updateOneQuantityItem(Constants.installationId, productID, quantity + 1);
        const cart = await ajax.fetchCart(Constants.installationId);
        this.setState({cart});
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <View style={styles.statusBar} />
                <TopBar page={"Winkelwagen"}></TopBar>
                <View style={styles.screenEstate}>
                <FlatList
                    data={this.state.cart}
                    renderItem={({item}) => (
                        <View>
                            <Swipeable
                                renderRightActions={() => {
                                    return (
                                        <TouchableOpacity onPress={() => {
                                            this.deleteFromCart(item.barcode)
                                        }} style={styles.swipeDelete}>
                                            <Image source={trashIcon} style={styles.trashIcon}></Image>
                                        </TouchableOpacity>
                                    )
                                }}
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
                                        <Image source={plusIcon} style={styles.plusIcon}></Image>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        this.deleteOneFromCart(item.barcode, item.id, item.items)
                                    }} style={styles.deleteOneTouchable}>
                                        <Image source={minusIcon} style={styles.minusIcon}></Image>
                                    </TouchableOpacity>
                                    <View style={styles.total}>
                                        <Text style={styles.unitprice}>{item.unitprice}</Text>
                                        <Text style={styles.price}>€{item.total}</Text>
                                    </View>
                                </View>
                            </Swipeable>
                        </View>
                    )}
                    keyExtractor={(item) => item.barcode}
                />
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
    unitprice: {
        fontSize: 12,
        marginBottom: 5,
    },
    price: {
        color: "#1cad61",
        fontSize: 25,
        fontWeight: "bold",
    },
    swipeDelete: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "red",
        width: 100,
    },
    trashIcon: {
        height: 60,
        width: 60,
    },
    screenEstate: {
        flex: 1,
    },
    statusBar: {
        backgroundColor: '#fe0127',
        height: Constants.statusBarHeight
    },
});

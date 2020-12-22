import React, {Component} from 'react'
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Alert,
} from 'react-native'
import Modal from 'react-native-modal';
import {Dimensions} from 'react-native';
import {BarCodeScanner} from 'expo-barcode-scanner';
import ajaxFetch from "./fetchProduct";
import ajaxDelete from "../cart/deleteItem";
import cart from "./addToCart";
import Constants from "expo-constants";

const basketIcon = require("../cart/basket.png");
const trashIcon = require("../cart/trash.png");

export default class ScannerScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            productID: null,
            barcode: null,
            productDescription: null,
            unitPrice: null,
            productPrice: null,
            totalPrice: null,
            productQuatity: 1,
            scanned: false,
            hasCameraPermission: false
        }
    }

    componentDidMount() {
        this.requestCameraPermission().catch(e => { console.log(e) })
    }

    requestCameraPermission = async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        this.setState({
            hasCameraPermission: status === 'granted',
        });
    };

    showModal = () => this.setState({visible: true})

    hideModal = () => this.setState({visible: false})

    async addToCart() {
        const response = await cart.addToCart(Constants.installationId, this.state.productID, this.state.productQuatity);
        this.setState({
            productID: null,
            barcode: null,
            productDescription: null,
            unitPrice: null,
            productPrice: null,
            totalPrice: null,
            productQuatity: 1,
            scanned: false
        });
        this.hideModal();
    }

    async deleteFromCart() {
        const response = await ajaxDelete.deleteItem(Constants.installationId, this.state.barcode);
        this.setState({
            productID: null,
            barcode: null,
            productDescription: null,
            unitPrice: null,
            productPrice: null,
            totalPrice: null,
            productQuatity: 1,
            scanned: false
        });
        this.hideModal();
    }

    handleBarCodeScanned = async ({type, data}) => {
        this.setState({scanned: true});
        const product = await ajaxFetch.fetchProduct(Constants.installationId, data);
        if (product.barcode != null) {
            let quantity = product.quantity;
            let price = product.price * quantity;
            price = (Math.round(price * 100) / 100).toFixed(2);
            this.setState({
                productID: product.id,
                barcode: product.barcode,
                productQuatity: product.quantity,
                productDescription: product.description,
                unitPrice: product.unitprice,
                productPrice: product.price,
                totalPrice: price
            });
            this.showModal();
        } else {
            Alert.alert("", "Barcode onbekend in systeem!", [{
                text: 'OK', onPress: () => {
                    this.setState({scanned: false})
                }
            }], {cancelable: false});
        }
    };

    addOne() {
        let quantity = this.state.productQuatity + 1;
        let price = this.state.productPrice * quantity;
        price = (Math.round(price * 100) / 100).toFixed(2);
        this.setState({
            productQuatity: quantity,
            totalPrice: price
        });
    }

    deleteOne() {
        let quantity = this.state.productQuatity - 1;
        if (quantity < 0)
            quantity = 0;
        let price = this.state.productPrice * quantity;
        price = (Math.round(price * 100) / 100).toFixed(2);
        this.setState({
            productQuatity: quantity,
            totalPrice: price
        });
    }

    render() {
        if (this.state.hasCameraPermission === null) {
            return <Text style={styles.error}> Requesting for camera permission</Text>;
        }
        if (this.state.hasCameraPermission === false) {
            return <Text style={styles.error}> No access to camera </Text>;
                }
                return (
                <View style={{flex: 1}}>

                    <BarCodeScanner
                        onBarCodeScanned={this.state.scanned ? undefined : this.handleBarCodeScanned}
                        style={StyleSheet.absoluteFillObject}
                    />

                    <Modal
                        style={styles.modal}
                        isVisible={this.state.visible}
                        shouldCloseOnOverlayClick={false}
                    >
                        <View style={styles.row}>
                            <View style={styles.iconContainer}>
                                <Image source={basketIcon} style={styles.icon}/>
                            </View>
                            <View style={styles.info}>
                                <Text style={styles.items}>{this.state.productDescription}</Text>
                                {this.state.productQuatity !== 1 && (
                                    <Text style={styles.unitprice}>{this.state.productQuatity} stuks</Text>
                                )}
                                {this.state.productQuatity === 1 && (
                                    <Text style={styles.unitprice}>{this.state.productQuatity} stuk</Text>
                                )}
                            </View>
                            <View style={styles.total}>
                                <Text style={styles.unitprice}>{this.state.unitPrice}</Text>
                                <Text style={styles.price}>€{this.state.totalPrice}</Text>
                            </View>
                        </View>
                        <View style={styles.modalFooter}>
                            <View style={styles.divider}></View>
                            <View style={styles.buttonsModal}>
                                <TouchableOpacity style={{...styles.actions, backgroundColor: "#db2828"}}
                                                  onPress={() => this.deleteOne()}>
                                    <Text style={styles.actionText}>-</Text>
                                </TouchableOpacity>

                                {this.state.productQuatity > 0 && (
                                    <TouchableOpacity style={{...styles.submitButton, backgroundColor: "#0a42ee"}}
                                                      onPress={() => this.addToCart()}>
                                        <Image source={basketIcon} style={styles.icon}/>
                                    </TouchableOpacity>
                                )}
                                {this.state.productQuatity < 1 && (
                                    <TouchableOpacity style={{...styles.submitButton, backgroundColor: "#050505"}}
                                                      onPress={() => this.deleteFromCart()}>
                                        <Image source={trashIcon} style={styles.icon}/>
                                    </TouchableOpacity>
                                )}

                                <TouchableOpacity style={{...styles.actions, backgroundColor: "#21ba45"}}
                                                  onPress={() => this.addOne()}>
                                    <Text style={styles.actionText}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </View>
                )
                }
                }

                const styles = StyleSheet.create({
                    modal: {
                    margin: 0,
                    backgroundColor: 'white',
                    height: 200,
                    flex: 0,
                    bottom: 0,
                    position: 'absolute',
                    width: '100%'
                },
                    buttonsModal: {
                    flexDirection: "row",
                    margin: 10,
                    alignItems: "center",
                    justifyContent: "space-around",
                },
                    actions: {
                    width: Dimensions.get('window').width * 0.30,
                    height: 60,
                    borderRadius: 5,
                    alignItems: "center",
                    justifyContent: "center",
                },
                    submitButton: {
                    width: Dimensions.get('window').width * 0.15,
                    height: 60,
                    borderRadius: 5,
                    alignItems: "center",
                    justifyContent: "center"
                },
                    actionText: {
                    color: "#fff",
                    fontSize: 20,
                    fontWeight: "bold"
                },
                    divider: {
                    width: "100%",
                    height: 1,
                    backgroundColor: "lightgray"
                },
                    modalFooter: {},
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
                    paddingTop: 10,
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
                    trashIconContainer: {
                    alignItems: "center",
                    backgroundColor: "black",
                    borderColor: "black",
                    borderRadius: 20,
                    borderWidth: 1,
                    justifyContent: "center",
                    height: 35,
                    width: 35,
                    right: 10,
                },
                    icon: {
                    tintColor: "#fff",
                    height: 22,
                    width: 22,
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
                },
                    total: {
                    width: 130,
                    paddingRight: 15,
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
                    error: {
                        color: "#ff0025",
                        fontSize: 25,
                        fontWeight: "bold",
                        textAlign: 'center',
                    }
                })
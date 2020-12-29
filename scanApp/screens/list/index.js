import Autocomplete from 'react-native-autocomplete-input';
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    FlatList, Image, Animated
} from 'react-native';
import Constants from 'expo-constants';
import ajax from './fetchAllProducts';
import list from './addToList';
import fList from './fetchList';
import dList from './deleteItemFromList'
import TopBar from "../../components/TopBar";
import Swipeable from "react-native-gesture-handler/Swipeable";
import connected from "../checkConnectivity";

const basketIcon = require("../cart/basket.png");
const trashIcon = require("../cart/trash.png");

class ShoppingListScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            shoppingList: [],
            query: '',
            isLoading: false,
        };
    }

    async componentDidMount() {
        await this.updateList();
        this.props.navigation.addListener('focus', () => {
            this.updateList();
        });
    }

    async updateList() {
        const pro = await ajax.fetchAllProducts(Constants.installationId);
        const isConnected = await connected.CheckConnectivity();
        if (isConnected) {
            const list = await fList.fetchList(Constants.installationId);
            this.setState({
                products: pro.products,
                shoppingList: list.products,
                query: ''
            });
        } else {
            connected.showError(this.props.navigation);
        }
    }

    findProducts(query) {
        if (query === '') {
            return [];
        }
        const {products} = this.state;

        const regex = new RegExp(`${query.trim()}`, 'i');
        return products.filter(product => product.description.search(regex) >= 0);
    }

    async addToList(product) {
        const response = await list.addToList(Constants.installationId, product);
        await this.updateList();
    }

    async deleteFromList(product) {
        const response = await dList.deleteItemFromList(Constants.installationId, product);
        await this.updateList();
    }

    render() {
        const {query} = this.state;
        const products = this.findProducts(query);
        const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();

        return (
            <View style={styles.mainContainer}>
                <View style={styles.statusBar}/>
                <TopBar page={"Winkellijst"}/>
                <View style={styles.screenEstate}>
                    <Text style={styles.searchTitle}>
                        Zoek naar een product voor je lijstje!
                    </Text>
                    <Autocomplete
                        autoCapitalize="none"
                        autoCorrect={false}
                        containerStyle={styles.autocompleteContainer}
                        data={products.length === 1 && comp(query, products[0].description) ? [] : products}
                        defaultValue={query}
                        onChangeText={text => this.setState({query: text})}
                        placeholder="Wat wil je kopen?"
                        renderItem={({item, i}) => (
                            <TouchableOpacity onPress={() => this.addToList(item.id)}>
                                <Text style={styles.itemText}>
                                    {item.description}
                                </Text>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item) => item.id.toString()}
                    />

                    {this.state.shoppingList.length === 0 && (
                        <Text style={styles.infoText}>
                            Je winkel lijstje is nog leeg!
                        </Text>
                    )}
                    {this.state.shoppingList.length > 0 && (
                        <FlatList
                            data={this.state.shoppingList}
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
                                                                          this.deleteFromList(item.id);
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
                                    >
                                        <View style={styles.row}>
                                            <View style={styles.iconContainer}>
                                                <Image source={basketIcon} style={styles.icon}/>
                                            </View>

                                            <View style={styles.info}>
                                                    <Text style={styles.items}>{item.description}</Text>
                                            </View>
                                            <View style={styles.total}>
                                                <Text style={styles.unitprice}>{item.unitprice}</Text>
                                                <Text style={styles.price}>€{item.total}</Text>
                                            </View>
                                        </View>
                                    </Swipeable>
                                </View>
                            )}
                            keyExtractor={(item) => item.id.toString()}
                        />
                    )}
                </View>
            </View>
        );
    }
}

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
        justifyContent: 'center'
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
        paddingLeft: 15,
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
    container: {
        backgroundColor: '#F5FCFF',
        flex: 1,
        paddingTop: 25
    },
    autocompleteContainer: {
        marginLeft: 10,
        marginRight: 10
    },
    itemText: {
        fontSize: 15,
        margin: 2
    },
    descriptionContainer: {
        // `backgroundColor` needs to be set otherwise the
        // autocomplete input will disappear on text input.
        backgroundColor: '#F5FCFF',
        marginTop: 8
    },
    infoText: {
        textAlign: 'center',
        marginTop: 15
    },
    searchTitle: {
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 15,
        marginBottom: 15
    },
    titleText: {
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 10,
        marginTop: 10,
        textAlign: 'center'
    },
    directorText: {
        color: 'grey',
        fontSize: 12,
        marginBottom: 10,
        textAlign: 'center'
    },
    openingText: {
        textAlign: 'center'
    },
});

export default ShoppingListScreen;

import React, { Component } from "react";
import { StyleSheet, View, FlatList, Image, Text, Pressable } from "react-native";
import ajax from "./fetchCart";
import delAjax from "./deleteItem";

const basketIcon = require("./basket.png");
const trashIcon = require("./trash.png");

export default class CartScreen extends React.Component {

  state = {
    cart: [],
  };

  async componentDidMount() {
    const cart = await ajax.fetchCart();
    this.setState({ cart });
  }

  async deleteFromCart(barcode) {
    const temp = await delAjax.deleteItem(barcode);
    alert(temp)
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <FlatList
          data={this.state.cart}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <View style={styles.iconContainer}>
                <Image source={basketIcon} style={styles.icon} />
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
              <Pressable onPress={() => this.deleteFromCart(item.barcode)}>
                <View style={styles.trashIconContainer}>
                  <Image source={trashIcon} style={styles.icon}></Image>
                </View>
              </Pressable>
              <View style={styles.total}>
                <Text style={styles.unitprice}>{item.unitprice}</Text>
                <Text style={styles.price}>€{item.total}</Text>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.barcode}
        />
      </View>
    );
  }
}


const styles = StyleSheet.create({
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
    width: 80,
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
});

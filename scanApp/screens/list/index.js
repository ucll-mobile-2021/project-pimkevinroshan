import Autocomplete from 'react-native-autocomplete-input';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList
} from 'react-native';
import Constants from 'expo-constants';
import ajax from './fetchAllProducts';
import list from './addToList';

//const URI = `http://mobiele.kc-productions.org/getAllProducts.php?`;

class ShoppingListScreen extends Component {
  static renderProduct(product) {
    const { description} = product;
    return (
      <View>
        <Text style={styles.titleText}>{description}</Text>
        {/* <FlatList
                    data={this.state.items}
        /> */}
      </View>
    );
  }

  constructor(props) {
    super(props);
    this.state = {
      products: [],
      query: '',
      isLoading: false,
      //items: ["boter", "steak"],
    };
  }

  async componentDidMount() {
    const pro = await ajax.fetchAllProducts();
    let products = Object.values(pro)[0];
    this.setState({ products });

  }

  findProducts(query) {
    if (query === '') {
      return [];
    }
    const { products } = this.state;

    const regex = new RegExp(`${query.trim()}`, 'i');
    return products.filter(product => product.description.search(regex) >= 0);
  }

  async addToList() {
    const response = await list.addToList(Constants.installationId, this.state.productID, this.state.productQuatity);
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
}

  render() {
    const { query } = this.state;
    const products = this.findProducts(query);
    console.log(products);
    const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();

    return ( 
      <View style={styles.container}>
        <Autocomplete
          autoCapitalize="none"
          autoCorrect={false}
          containerStyle={styles.autocompleteContainer}
          data={products.length === 1 && comp(query, products[0].description) ? [] : products}
          defaultValue={query}
          onChangeText={text => this.setState({ query: text })}
          placeholder="What do you want to buy?"
          renderItem={({ item, i }) => (
            /*<TouchableOpacity onPress={() => this.setState({ query: item.description })}>
              <Text style={styles.itemText}>
                {item.description}
              </Text>
            </TouchableOpacity>*/
            <TouchableOpacity onPress={() => this.addToList()}>
                <Text style={styles.itemText}>
                    {item.description}
                </Text>
            </TouchableOpacity>
          )}
        />
        <View style={styles.descriptionContainer}>
          {products.length > 0 ? (
            ShoppingListScreen.renderProduct(products[0])
          ) : (
            <Text style={styles.infoText}>
                Your shopping list is empty.
            </Text>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
    textAlign: 'center'
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
  }
});

export default ShoppingListScreen;

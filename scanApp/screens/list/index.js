import React, {useState} from 'react';
import {View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, Image, Modal} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import TopBar from '../../components/TopBar';
import Constants from 'expo-constants';
import CheckBox from '@react-native-community/checkbox';


const ShoppingListScreen = ({}) => {
    const [data, setData] = useState([{id: 1, title: 'Kaas en Salami', active: false}]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [itemName, setItem] = useState('');
    const renderItem=({item, index})=>{
        return (
            <View style={styles.groceryItem}>
                <CheckBox
    disabled={false}
    value={item.active}
    onValueChange={(newValue) => setToggleCheckBox(newValue, index)}
  />
                <Text style={styles.subtitle}>{item.title}</Text>
            </View>
        );
    };

    const openModal=()=>{
        setIsModalVisible(true);
    };
    const closeModal=()=>{
        setIsModalVisible(false);
    };
    const addItem=()=>{
        let shoppingList = [...data];
        shoppingList.push({id:shoppingList.length + 1, title: itemName, active: false});
        setData(shoppingList)
    };
    const setToggleCheckBox = (value, index) => {
        let newArr=[...data];
        newArr[index].active=!newArr[index].active;
        setData(newArr);

    }
    return (
        <View style={styles.container}>
            <View style={styles.statusBar}/>
            <TopBar page={"Scan code aan kassa"}/>
            <SafeAreaView styles ={styles.contentContainer}>
                <FlatList data={data} renderItem={renderItem} />
                <TouchableOpacity style={styles.addBtnWrapper} onPress={openModal}>
                <Image 
                    style={styles.addIcon} 
                    source={require('../cart/plus.png')} 
                />
            </TouchableOpacity>
            </SafeAreaView>
            <Modal transparent={true} visible={isModalVisible}>
                <View style={styles.modalContentWrapper}>
                    <TouchableOpacity style={styles.closeBtnWrapper} onPress={closeModal}>
                        <Image style={styles.closeIcon} source={require('../../assets/close.png')}/>
                    </TouchableOpacity>

                    <View style={styles.inputWrapper}>
                        <TextInput style={styles.textInput} placeholder={'What you want to buy?'} onChangeText= {(text)=>setItem(text)} />
                        <TouchableOpacity style={styles.btnWrapper} onPress={addItem}>
                            <Text style={{textAlign: 'center'}}>ADD</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    screenEstate: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    statusBar: {
        backgroundColor: '#fe0127',
        height: Constants.statusBarHeight
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    contentContainer: {
        display: 'flex',
        flex: 1,
    },
    addIcon:{
        width: 50,
        height: 50,
    },
    addBtnWrapper:{
        alignItems: 'center',
    },
    modalContentWrapper: {
        height: '50%',
        marginTop: 'auto',
        backgroundColor: '#fe0127',
    },
    closeIcon: {
        width: 50,
        height: 50,
    },
    closeBtnWrapper:{
        alignItems: 'flex-end',
    },
    inputWrapper: {
        marginTop: 60,
    },
    textInput: {
        padding: 15,
        backgroundColor: 'white',
        fontSize: 20,
    },
    btnWrapper: {
        backgroundColor: 'white',
        marginTop: 30,
        padding: 15,
    },
    groceryItem:{
        flexDirection:'row',
        alignItems: 'center',
    },
    subtitle:{
        fontSize: 20,
        marginLeft: 15,
    }
});

export default ShoppingListScreen;
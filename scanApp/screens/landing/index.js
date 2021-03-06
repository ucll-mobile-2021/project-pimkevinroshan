import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert, SafeAreaView} from 'react-native';
import {CheckBox} from "native-base";
import Constants from 'expo-constants';
import TopBar from '../../components/TopBar';
import {TextInput} from 'react-native-paper';
import ajax from "./getCredentials";
import upload from "./uploadUser";
import connected from "../checkConnectivity";
import {Card} from 'react-native-elements';
import Ionicons from '@expo/vector-icons/Ionicons';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    error: {
        color: "#ff0025",
        fontSize: 25,
        fontWeight: "bold",
        textAlign: 'center',
    },
    screenEstate: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    form: {
        marginLeft: 15,
        marginRight: 15,
        marginTop: 15,
        marginBottom: 15,
    },
    formText: {
        fontSize: 20,
        marginBottom: 15,
        fontWeight: 'bold'
    },
    cardText: {
        fontSize: 20,
        marginBottom: 15,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingBottom: 25,
        paddingTop: 25
    },
    centerBox: {
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputBox: {
        marginBottom: 20,
        marginTop: 20,
    },
    statusBar: {
        backgroundColor: '#fe0127',
        height: Constants.statusBarHeight
    },
    item: {
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 10,
        marginBottom: 10,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    checkBoxTxt: {
        marginLeft: 20
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#34495e',
    },
});

export default class LandingScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            firstName: '',
            email: '',
            points: '0',
            knownUser: 'false',
            selectedBox: 'false'
        }
    }

    setFirstName(text) {
        this.setState({firstName: text});
    }

    setName(text) {
        this.setState({name: text});
    }

    setEmail(text) {
        this.setState({email: text});
    }

    async componentDidMount() {
        await this.updatePage();
        const response = this.getCredentialsUser();
        this.props.navigation.addListener('focus', () => {
            this.updatePage();
        });
    }

    async updatePage() {
        const isConnected = await connected.CheckConnectivity();
        if (!isConnected) {
            this.setState({
                connected: 'false',
            });
        } else {
            await this.getCredentialsUser();
            this.setState({
                connected: 'true',
            });
        }
    }

    async getCredentialsUser() {
        const user = await ajax.fetchUser(Constants.installationId);
        if (user.id != null) {
            this.setState({
                email: user.email,
                name: user.lName,
                firstName: user.fName,
                points: user.points,
                knownUser: 'true'
            });
        }
    }

    async uploadCredentials() {
        if (this.state.name !== '' && this.state.firstName !== '' && this.validateEmail(this.state.email) && this.state.selectedBox === 'true') {
            let response = await upload.uploadUser(Constants.installationId, this.state.name, this.state.firstName, this.state.email);
            this.setState({
                knownUser: 'true'
            });
        } else {
            Alert.alert("Oh Oh!", "Gelieve alle velden correct in te vullen en akkoord te gaan met de voorwaarden.", [
                {
                    text: 'Begrepen', onPress: () => {
                    }
                }
            ], {cancelable: false});
        }
    }

    validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    flipCheckBox() {
        let old = this.state.selectedBox;
        if (old === 'false') {
            this.setState({
                selectedBox: 'true'
            });
        } else {
            this.setState({
                selectedBox: 'false'
            });
        }
    }

    async isConnected() {
        return await connected.CheckConnectivity();
    }

    render() {
        if (this.state.connected === 'false') {
            return (
                <View style={{flex: 1}}>
                    <View style={styles.statusBar}/>
                    <TopBar page={"Oh nee!"}/>
                    <View style={styles.screenEstate}>
                        <Text style={styles.error}> Geen toegang tot het internet! Gelieve uw verbinding met het
                            internet te herstellen.</Text>
                    </View>
                </View>
            );
        } else if (this.state.knownUser === 'false') {
            return (
                <View style={styles.container}>
                    <View style={styles.statusBar}/>
                    <TopBar page={"Welkom"}/>
                    <View style={styles.form}>
                        <View style={styles.centerBox}>
                            <Text style={styles.formText}>Vertel ons wat meer over jezelf!</Text>
                            <Text>Je gegevens zijn enkel nodig als je delhaize punten wenst te verzamelen! (1 punt per
                                uitgegegeven euro) Bij 500 punten heb je recht op een waardebon van €5.</Text>
                        </View>
                        <TextInput
                            style={styles.inputBox}
                            label="Voornaam"
                            value={this.state.firstName}
                            onChangeText={text => this.setFirstName(text)}
                            mode='outlined'
                            theme={{
                                colors: {
                                    placeholder: 'gray', text: 'black', primary: 'red',
                                    underlineColor: 'transparent'
                                }
                            }}
                        />
                        <TextInput
                            style={styles.inputBox}
                            label="Achternaam"
                            value={this.state.name}
                            onChangeText={text => this.setName(text)}
                            mode='outlined'
                            theme={{
                                colors: {
                                    placeholder: 'gray', text: 'black', primary: 'red',
                                    underlineColor: 'transparent'
                                }
                            }}
                        />
                        <TextInput
                            style={styles.inputBox}
                            label="Email"
                            value={this.state.email}
                            onChangeText={text => this.setEmail(text)}
                            mode='outlined'
                            theme={{
                                colors: {
                                    placeholder: 'gray', text: 'black', primary: 'red',
                                    underlineColor: 'transparent'
                                }
                            }}
                        />

                        <View style={styles.item}>
                            <CheckBox checked={this.state.selectedBox === 'true'} color="#fe0127"
                                      onPress={() => this.flipCheckBox()}/>
                            <Text style={styles.checkBoxTxt}
                            >Ik begrijp dat mijn gegevens opgeslagen, en enkel gebruikt zullen worden voor de correcte
                                werking van deze app.</Text>
                        </View>

                        <View style={styles.centerBox}>
                            <TouchableOpacity
                                onPress={() => this.uploadCredentials()}
                                style={{
                                    backgroundColor: 'red',
                                    borderRadius: 5,
                                    width: 200,
                                    flex: 0,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                <Text style={{fontSize: 20, color: '#fff', margin: 15}}>Ga verder</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            );
        } else {
            return (
                <View style={styles.container}>
                    <View style={styles.statusBar}/>
                    <TopBar page={"Welkom"}/>
                    <View style={styles.screenEstate}>
                        <Card>
                            <Text style={styles.cardText}>Welkom terug {this.state.firstName}!</Text>
                            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                <Ionicons name='gift-outline' size={40} color='red'/>
                            </View>
                            {this.state.points === 0 && (
                                <Text style={styles.paragraph}>
                                    Je hebt nog geen punten verzameld. Voltooi je eerste aankoop om punten te verzamelen.
                                </Text>
                            )}
                            {this.state.points === 1 && (
                                <Text style={styles.paragraph}>
                                    Je hebt al {this.state.points} punt verzameld.
                                </Text>
                            )}
                            {this.state.points > 1 && (
                                <Text style={styles.paragraph}>
                                    Je hebt al {this.state.points} punten verzameld.
                                </Text>
                            )}

                            {this.state.points < 500 && (
                                <Text style={styles.paragraph}>
                                    Verzamel nog {500 - this.state.points} punten om een waardebon van €5 te verzilveren!
                                </Text>
                            )}
                            {this.state.points >= 500 && (
                                <Text style={styles.paragraph}>
                                    Proficiat, je hebt recht op een waardebon. Ga naar het onthaal om jouw waardebon van €5 te verzilveren!
                                </Text>
                            )}

                        </Card>
                    </View>
                </View>
            );
        }
    }


}
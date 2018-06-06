import React, { Component} from 'react';
import {
    Text,
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';


export default class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { mail: '', passwd: '' };
    }
    
    onPress = () => {
        if(!this.validateInput()) {
            alert("Überprüfen Sie Ihre Eingaben!")
            return
        }

        // check credentials

        let currentSession = {
            loggedIn: true,
            mail: this.state.mail, 
            firstname: 'peter'
        };
        AsyncStorage.setItem("currentSession", JSON.stringify(currentSession)).then(function() {
            console.log("User logged in!")
          }, function() {
            alert('Error saving session data')
          }
        );
        
        this.props.navigator.switchToTab({tabIndex: 1});
    }
    
    validateInput = () => {
        let mailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    
        if(this.state.passwd.length < 1) {
            return false;
        }
        if(!mailRegEx.test(this.state.mail)) {
            return false;
        }

        return true;
    }

    render() {
        return (
            <View>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder={"Ihre E-Mail Adresse"}
                        placeholderColor={'grey'}
                        keyboardType={'email-address'}
                        style={styles.input}
                        onChangeText={(text) => this.setState({mail: text})}
                        value={this.state.mail}
                    />
                </View> 
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder={"Ihr Passwort"}
                        placeholderColor={'grey'}
                        secureTextEntry={true}
                        style={styles.input}
                        onChangeText={(text) => this.setState({passwd   : text})}
                        value={this.state.passwd}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.onPress}
                    >
                        <Text>Login</Text>
                    </TouchableOpacity>
                </View>                            
            </View>
        );
    }
}
const styles = StyleSheet.create ({
    text: {
        fontSize: 15,
        padding: 10,
        marginTop: 10,
    },
    input: {
        padding: 10,
        borderColor: 'black',
        borderWidth: 1,
        textAlignVertical: 'top'
    },
    inputContainer: {
        padding: 10
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
        marginTop: 10
    }
    
 })
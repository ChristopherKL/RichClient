import React, { Component} from 'react';
import {
    Text,
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity
} from 'react-native';


export default class RegestrationScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { username: '', mail: '', password: '', password2: ''};
    }
    
    onPress = () => {
        if(!this.validateInput()) {
            alert("Überprüfen Sie Ihre Eingaben!")
            return
        }

        // send mail
        this.props.navigator.switchToTab({tabIndex: 1});
    }
    
    validateInput = () => {
        let mailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    
        if(this.state.username.length < 1) {
            return false;
        }
        if(this.state.password.length < 1) {
            return false;
        }
        if(this.state.password.length < 1) {
            return false;
        }
        if(this.state.password != this.state.password2) {
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
                        placeholder={"Ihr Benutzername"}
                        placeholderColor={'grey'}
                        style={styles.input}
                        onChangeText={(text) => this.setState({username   : text})}
                        value={this.state.username}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder={"Ihr Passwort"}
                        placeholderColor={'grey'}
                        style={styles.input}
                        onChangeText={(text) => this.setState({password   : text})}
                        value={this.state.password}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder={"Passwort wiederholen"}
                        placeholderColor={'grey'}
                        style={styles.input}
                        onChangeText={(text) => this.setState({password2   : text})}
                        value={this.state.password2}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.onPress}
                    >
                        <Text>Registrieren</Text>
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




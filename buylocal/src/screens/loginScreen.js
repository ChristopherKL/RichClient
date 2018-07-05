import React, { Component } from 'react';
import {
    Text,
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import { connect } from 'react-redux';
import { loginActionCreator } from '../redux/actions/loginAction';
import { serverKeyActionCreator } from '../redux/actions/serverKeyAction';
import { catsActionCreator } from '../redux/actions/catsAction';
import getServerKey from '../apiCom/getServerKey';
import getCategories from '../apiCom/getCategories';
import login from '../apiCom/login';


export class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { inputUserOrMail: '', inputPasswd: '', isLoading: false };
    }
    

    componentDidMount() {
        if(this.props.cats == null) {
            getCategories().then((res) => { this.props.catsAction(res); });
        }
        if(this.props.serverPublicKey == null) {
            getServerKey().then((res) => { this.props.serverKeyAction(res); });
        
        }
    }

    onPress = () => {
        if(!this.validateInput()) {
            alert("Überprüfen Sie Ihre Eingaben!")
            return
        }
        if(this.props.serverPublicKey == null) {
            alert("Serverkey muss noch geladen werden, bitte warten sie einen Augenblick")
            return
        }
        if(this.props.serverPublicKey == false) {
            alert("Konnte Server nicht erreichen!")
            return
        }
        this.setState({isLoading: true});
        login(this.state.inputUserOrMail, this.state.inputPasswd, this.props.serverPublicKey).then(
            (res) => {
                this.setState({isLoading: false});
                if(typeof res == "string") {
                    alert("Fehler: "+res);
                }
                else {
                    this.props.loginAction(res);
                    
                }
            }
        )

        
        
    }
    
    validateInput = () => {
        let mailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    
        if(this.state.inputPasswd.length < 1) {
            return false;
        }
        if(this.state.inputUserOrMail.indexOf("@") != -1) {
            if(!mailRegEx.test(this.state.inputUserOrMail)) {
                return false;
            }
        }
        else {
            if(this.state.inputUserOrMail.length < 1) {
                return false;
            }            
        }     


        return true;
    }

    render() {
        if(this.state.isLoading) {
            return (
                <View>
                    <Text>Loading...</Text>
                </View>
            )
        }        
        return (
            <View>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder={"Benutzername / E-Mail"}
                        placeholderColor={'grey'}
                        keyboardType={'email-address'}
                        style={styles.input}
                        onChangeText={(text) => this.setState({inputUserOrMail: text})}
                        value={this.state.inputUserOrMail}
                    />
                </View> 
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder={"Ihr Passwort"}
                        placeholderColor={'grey'}
                        secureTextEntry={true}
                        style={styles.input}
                        onChangeText={(text) => this.setState({inputPasswd   : text})}
                        value={this.state.inputPasswd}
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


 const mapStateToProps = (state) => {
    return {
        loggedIn: state.LoginReducer.loggedIn,
        userData: state.LoginReducer.userData,
        serverPublicKey: state.ServerKeyReducer.serverPublicKey,
        cats: state.CatsReducer.cats
    }
}
 
const mapDispatchToProps = (dispatch) => {
    return {
        loginAction: (userData) => { dispatch(loginActionCreator(userData)) },
        serverKeyAction: (serverPublicKey) => { dispatch(serverKeyActionCreator(serverPublicKey))},
        catsAction: (cats) => { dispatch(catsActionCreator(cats))}
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

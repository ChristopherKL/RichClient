import React, { Component} from 'react';
import {
    Text,
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import {loginActionCreator} from '../redux/actions/loginAction';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { serverKeyActionCreator } from '../redux/actions/serverKeyAction';
import getServerKey from '../apiCom/getServerKey';


export class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { inputUserOrMail: '', inputPasswd: '' };
    }
    

    componentDidMount() {
        if(this.props.serverPublicKey == null) {
            getServerKey().then((res) => { this.props.serverKeyAction(res); });
            

        }
    }

    onPress = () => {
        if(!this.validateInput()) {
            alert("Überprüfen Sie Ihre Eingaben!")
            return
        }



        // check credentials
        this.props.loginAction({mail: "xx@abc.de", username: "abc"});
        this.props.navigator.switchToTab({tabIndex: 1});
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
        loggedIn: state.loggedIn,
        userData: state.userData,
        serverPublicKey: state.serverPublicKey
    }
}
 
const mapDispatchToProps = (dispatch) => {
    return {
        loginAction: (userData) => { dispatch(loginActionCreator(userData)) },
        serverKeyAction: (serverPublicKey) => { dispatch(serverKeyActionCreator(serverPublicKey))}
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

import React, { Component} from 'react';
import {
    Text,
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import {loginAction, loginActionCreator} from '../redux/actions/loginAction';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';


export class LoginScreen extends Component {
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
        this.props.loginAction({mail: this.state.mail});
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


 const mapStateToProps = (state) => {
    return {
        loggedIn: state.loggedIn,
        userData: state.userData
    }
}
 
const mapDispatchToProps = (dispatch) => {
    return {
        loginAction: (userData) => { dispatch(loginActionCreator(userData)) }
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
import React, { Component} from 'react';
import {
    Text,
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import editProfile from '../apiCom/editProfile';
import createToken from '../apiCom/createToken';
import {loginActionCreator} from '../redux/actions/loginAction';


export class EditProfileScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { inputUsername: this.props.userData.username, inputMail: this.props.userData.mail};
    }
    
    onPress = () => {
        if(!this.validateInput()) {
            alert("Überprüfen Sie Ihre Eingaben!")
            return
        }
        
        editProfile(createToken(this.props.userData.token, this.props.serverPublicKey), this.state.inputMail, this.state.inputUsername).then(
            (res) => {
                if(res != true) {
                    alert("Fehler: "+ res);
                }
                else {
                    alert("Änderung erfolgreich!");
                    this.props.loginAction({id: this.props.userData.id, 
                        username: this.state.inputUsername, 
                        mail: this.state.inputMail, 
                        token: this.props.userData.token,
                        keyPair: this.props.userData.keyPair
                    });
                    this.props.navigator.pop();
                    
                }
            }
        )
        
    }
    
    validateInput = () => {
        let mailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    
        if(this.state.inputUsername.length < 1) {
            return false;
        }
        if(!mailRegEx.test(this.state.inputMail)) {
            return false;
        }

        return true;
    }

    render() {
        return (
            <ScrollView>

                    <View style={styles.inputContainer}>
                        <TextInput
                            keyboardType={'email-address'}
                            style={styles.input}
                            onChangeText={(text) => this.setState({inputMail: text})}
                            value={this.state.inputMail}
                        />
                    </View> 
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => this.setState({inputUsername   : text})}
                            value={this.state.inputUsername}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={this.onPress}
                        >
                            <Text>Profil bearbeiten</Text>
                        </TouchableOpacity>
                    </View>                            

            </ScrollView>
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
        serverPublicKey: state.ServerKeyReducer.serverPublicKey
    }
}
 
const mapDispatchToProps = (dispatch) => {
    return {
        loginAction: (userData) => { dispatch(loginActionCreator(userData)) },
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(EditProfileScreen);
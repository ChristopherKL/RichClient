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


export class NewMessageScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {  inputMessage: "", 
                        negData: {partnerName: "abc"},

                    };
    }
    handleSelectionChange = ({ nativeEvent: { selection } }) => this.setState({ selection })

    onPress = () => {
        if(this.state.inputMessage.length < 10) {
            alert("Nachrichten müssen min. 10 Zeichen enthalten")
            return
        }


    }
    

    render() {
        return (
            <View>
                <View style={styles.headlineContainer}>
                   <Text style={styles.headline}>Neue Nachricht an {this.state.negData.partnerName}</Text>
                </View>
                <View style={styles.inputBoxContainer}>
                    <TextInput
                        style={styles.inputContainer}
                        multiline = {true}
                        onChangeText={(text) => this.setState({inputMessage: text})}
                        value={this.state.inputMessage}
                        editable = {true}
                        maxLength = {300}
                        underlineColorAndroid='rgba(0,0,0,0)'

                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.onPress}
                    >
                        <Text>Nachricht senden</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create ({
    headline: {
        fontSize: 25,
    },
    headlineContainer: {
        padding: 10,
        marginTop: 10,
    },
    inputBoxContainer: {
        padding: 10
    },
    inputContainer: {
        height: 300,
        borderColor: 'gray', 
        borderWidth: 1,
        textAlignVertical: 'top'
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
        loggedIn: state.loginReducer.loggedIn,
        userData: state.loginReducer.userData,
        serverPublicKey: state.ServerKeyReducer.serverPublicKey
    }
}
 
const mapDispatchToProps = (dispatch) => {
    return {
        loginAction: (userData) => { dispatch(loginActionCreator(userData)) },
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(NewMessageScreen);
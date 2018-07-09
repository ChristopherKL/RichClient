import React, { Component} from 'react';
import {
    Text,
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import beginNegotiation from '../apiCom/beginNegotiation';
import createToken from '../apiCom/createToken';


export class NewMessageScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {  inputMessage: "", 

                    };
    }
    componentDidMount() {

    
    }

    onPress = () => {
        if(this.state.inputMessage.length < 10) {
            alert("Nachrichten müssen min. 10 Zeichen enthalten")
            return
        }
        if(this.props.newNegData != undefined) {
            beginNegotiation(createToken(this.props.userData.token, this.props.serverPublicKey), 
                this.props.newNegData.offerId,
                this.props.newNegData.title,
                this.props.newNegData.recid,
                this.props.newNegData.recKey,
                this.props.userData.keyPair
            ).then(
                (res) => {
                    if(typeof res == "string") {
                        alert("Fehler: "+res);
                    }
                    else {
                        alert("Verhandlung begonnen");
                        this.props.navigator.pop();
                        
                    }
                }
            )
        }

    }
    

    render() {
        return (
            <View>
                <View style={styles.headlineContainer}>
                   <Text style={styles.headline}>Neue Nachricht an {this.props.partnerName}</Text>
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
        loggedIn: state.LoginReducer.loggedIn,
        userData: state.LoginReducer.userData,
        serverPublicKey: state.ServerKeyReducer.serverPublicKey
    }
}
 
const mapDispatchToProps = (dispatch) => {
    return {
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(NewMessageScreen);
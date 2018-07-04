import React, { Component} from 'react';
import {
    Text,
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import editProfile from '../apiCom/editProfile';
import createToken from '../apiCom/createToken';
import {loginActionCreator} from '../redux/actions/loginAction';


export class RateUserScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {  inputMessage: "", 
                        negData: {partnerName: "abc"},
                        starNum: 0
                    };
    }


    onPress = () => {
        if(this.state.inputMessage.length < 10) {
            alert("Nachrichten müssen min. 10 Zeichen enthalten")
            return
        }
    }
    onStarPres = (pos) => {
        this.setState({starNum: pos});
    }
    renderStarContainer = () => (
        <View style={styles.starContainer}>
            <TouchableOpacity
                style={styles.imageButton}
                onPress={() => this.onStarPres(1)}
            >
                <Image
                    key="star1"
                    style={{width: 35, height: 35,}}
                    source={(this.state.starNum < 1) ? require("./../../img/empty.png") : require("./../../img/full.png")}
                />
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.imageButton}
                onPress={() => this.onStarPres(2)}
            >
            <Image
                key="star2"
                style={{width: 35, height: 35,}}
                source={(this.state.starNum < 2) ? require("./../../img/empty.png") : require("./../../img/full.png")}
            />
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.imageButton}
                onPress={() => this.onStarPres(3)}
            >
            <Image
                key="star3"
                style={{width: 35, height: 35,}}
                source={(this.state.starNum < 3) ? require("./../../img/empty.png") : require("./../../img/full.png")}
            />
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.imageButton}
                onPress={() => this.onStarPres(4)}
            >
            <Image
                key="star4"
                style={{width: 35, height: 35,}}
                source={(this.state.starNum < 4) ? require("./../../img/empty.png") : require("./../../img/full.png")}
            />
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.imageButton}
                onPress={() => this.onStarPres(5)}
            >
            <Image
                key="star5"
                style={{width: 35, height: 35,}}
                source={(this.state.starNum < 5) ? require("./../../img/empty.png") : require("./../../img/full.png")}
            />
            </TouchableOpacity>
        </View>   
    )


    

    render() {
        return (
            <View>
                <View style={styles.headlineContainer}>
                   <Text style={styles.headline}>Bewerte {this.state.negData.partnerName}</Text>
                </View>
                
                {this.renderStarContainer()}

                <View style={styles.inputBoxContainer}>
                    <TextInput
                        style={styles.inputContainer}
                        multiline = {true}
                        onChangeText={(text) => this.setState({inputMessage: text})}
                        value={this.state.inputMessage}
                        editable = {true}
                        maxLength = {300}
                        underlineColorAndroid='rgba(0,0,0,0)'
                        placeholder={"Text optional..."}

                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.onPress}
                    >
                        <Text>Bewertung abgeben</Text>
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
    imageButton: {
        padding: 10,
        marginTop: 10
    },
    starContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,

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
 
export default connect(mapStateToProps, mapDispatchToProps)(RateUserScreen);
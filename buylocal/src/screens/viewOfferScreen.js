import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import createToken from '../apiCom/createToken';
import getProfile from '../apiCom/getProfile';


export class ViewOfferScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {profile_username: null};
    }
    componentDidMount() {
        this.setState({             id: "2221",
                                    name: "Endgeiler Schuh",
                                    img_uri: "https://i.otto.de/i/otto/18723170/woodstone-kids-trekking-schuh-rot.jpg",
                                    price: "121321€",
                                    desc: "mega gut ja",
                                    zipcode: '11111'
                                    });
    }
    onPress = () => {
    }
    render() {
        return (
            <View>
                <View style={styles.headlineContainer}>
                   <Text style={styles.headline}>{this.state.name}</Text> :
                </View>
                <Image
                    style={{width: 90, height: 90}}
                    source={{uri: this.state.img_uri}}
                />
                <View style={styles.descContainer}>
                    <Text>Beschreibung: </Text>
                    <Text>{this.state.desc}</Text>
                </View>
                <View style={styles.priceContainer}>
                    <Text>Preis: {this.state.price}</Text>
                </View>
                <Text>Postleitzahl: {this.state.zipcode}</Text>
                <TouchableOpacity
                        style={styles.button}
                        onPress={this.onPress}
                >
                    <Text>Verhandlung beginnen</Text>
                </TouchableOpacity>
                <TouchableOpacity
                            style={styles.button}
                            onPress={this.onPress}
                >
                    <Text>Angebot melden</Text>
                </TouchableOpacity>
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
        flex: 1, 
        flexDirection: 'row',
        alignItems: 'center'        
    },
    descContainer: {
        padding: 10,
        marginTop: 10
    },
    priceContainer: {
        fontSize: 20,
        marginTop: 10,
        color: 'lightgreen'
        
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
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(ViewOfferScreen);

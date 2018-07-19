import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList
} from 'react-native';
import {connect} from 'react-redux';
import createToken from '../apiCom/createToken';
import getProfile from '../apiCom/getProfile';
import deleteOffer from '../apiCom/deleteOffer';

export class MyOffersScreen extends Component {
    constructor(props) {
        super(props)
        this.state = ({isLoading: true});
    }
    componentDidMount() {
        this.getCurrentOffers();
    }
    getCurrentOffers() {
        getProfile(createToken(this.props.userData.token, this.props.serverPublicKey), this.props.userData.id).then(
            (res) => {
                if(typeof res == "string") {
                    alert("Fehler: "+ res);
                    this.props.navigator.pop();
                }
                else {
                    this.setState({ offers: res.Angebote, isLoading: false });
                }
            }

        )
    }
    onDelPress = (id) => {
        deleteOffer(createToken(this.props.userData.token, this.props.serverPublicKey), id).then(
            (res) => {
                if(typeof res == "string") {
                    alert("Fehler: "+ res);
                    this.props.navigator.pop();
                }
                else {
                    this.getCurrentOffers();
                    alert("Angebot geloescht");
                }           
            }

        )
        
        
    }
    onOfferPress = (id) => {
        this.props.navigator.push({
            screen: 'buylocal.viewOfferScreen',
            passProps: {offerId: id},
            title: "Angebot"
        });
    }
    render() {
        if(this.state.isLoading) {
            return (
                <View>
                    <Text>Loading...</Text>
                </View>
            )
        }
        console.log("rendering " + this.props.userData.username)
        return (
            <View>
                <View style={styles.headlineContainer}>
                    <Text>Meine Angebote</Text>
                </View>
                {this.renderOfferList()}

            </View>
        );
    }

    renderOfferList = () => {
        return (
            <View style={styles.offerList}>
                <FlatList
                    ItemSeparatorComponent={this.renderSeparator}
                    data={this.state.offers}
                    renderItem={this.renderOffer}
                    keyExtractor={(item) => "angebot"+item.AngebotID}
                />
            </View>
        )
    }
    renderOffer = ({item}) => (
            <View style={styles.offerContainer}>
                <TouchableOpacity
                    onPress={() => this.onOfferPress(item.AngebotID)}
                    
                >
                    <Text>{item.Titel}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.onDelPress(item.AngebotID)}
                    >
                        <Text>Löschen</Text>
                </TouchableOpacity>
            </View>
        
    )
    renderSeparator = () => {
        return (
          <View
            style={{
              height: 1,
              backgroundColor: "#CED0CE"
            }}
          />
        );
    };
    
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
     button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
        marginTop: 10
    },
    offerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    offerList: {
        margin: 10,
        borderWidth: 1,
        borderColor: '#d6d7da',
        height: 150
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
 
export default connect(mapStateToProps, mapDispatchToProps)(MyOffersScreen);

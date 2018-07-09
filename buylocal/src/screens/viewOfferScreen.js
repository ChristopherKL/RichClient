import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import createToken from '../apiCom/createToken';
import getOffer from '../apiCom/getOffer';



export class ViewOfferScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {imgs: [], hashtags: []};
    }
    componentDidMount() {
        getOffer(createToken(this.props.userData.token, this.props.serverPublicKey), this.props.offerId).then(
            (res) => {
                if(typeof res == "string") {
                    alert("Fehler: "+ res);
                    this.props.navigator.pop();
                }
                else {
                    this.setState(res);
                }
            }

        )

    }
    renderSeparator = () => {
        return (
          <View
            style={{
              height: 1,
              backgroundColor: "#CED0CE"
            }}
          />
        )    
    }
    onImgPress = (item) => {
        this.props.navigator.push({
            screen: 'buylocal.showImageScreen',
            passProps: {imgUrl: item},
            title: "AngebotsBild"
        });
    }
    onHashPress = (item) => {
        alert(item);
    }
    onUserPress = () => {
        this.props.navigator.push({
            screen: 'buylocal.profileScreen',
            passProps: {profileId: this.state.insertUserid},
            title: "Profil"
        });
    }
    onBeginNegPress = () => {
        this.props.navigator.push({
            screen: 'buylocal.newMessageScreen',
            passProps: {newNegData: {offerId: this.props.offerId, title: "Verhandlung zu "+ this.state.Name, recid: this.state.insertUserid,
                        recKey: this.state.insertUserKey}, partnerName: this.state.insertUser},
            title: "Verhandlung beginnen"
        });

    }
    render() {
        return (
            <View>
                <View style={styles.headlineContainer}>
                   <Text style={styles.headline}>{this.state.name}</Text>
                </View>

                <View style={styles.imageContainer}>
                    {this.renderImagesList()}
                </View>

                <View style={styles.miscContainer}>
                    <Text style={styles.misc}>Erstellt {this.state.insertDate}</Text>
                    <TouchableOpacity
                        onPress={this.onUserPress}    
                    >
                        <Text style={styles.userLink}>Anbieter {this.state.insertUser}</Text>
                    </TouchableOpacity>
                    <Text style={styles.misc}>PLZ {this.state.zipcode}</Text>
                </View>
                <Text style={styles.price}>{this.state.price}</Text>
                <View style={styles.hashtagContainer}>
                    {this.renderHashtagList()}
                </View>
                {this.renderSeparator()}

                <View style={styles.descContainer}>
                    <Text>{this.state.desc}</Text>
                </View>
                {this.renderNegButton()}
                <TouchableOpacity
                            style={styles.button}
                            onPress={this.onPress}
                >
                    <Text>Angebot melden</Text>
                </TouchableOpacity>
            </View>
        );
    }
    renderNegButton = () => {
        if(this.props.userData.id == this.state.insertUserid) {
            return null;
        }
        else {
            return (
                <TouchableOpacity
                        style={styles.button}
                        onPress={this.onBeginNegPress}
                >
                    <Text>Verhandlung beginnen</Text>
                </TouchableOpacity>
            )
        }
    }
    renderImagesList = () => (
            this.state.imgs.map((value, index) => (
                <TouchableOpacity
                    onPress={() => this.onImgPress(value)}
                    key={index}
                >
                        <Image
                            style={{width: 70, height: 70, marginRight: 4}}
                            source={{uri: `data:image/gif;base64,${value}`}}
                        />
                </TouchableOpacity>
                )
            )
    )
    renderHashtagList = () => (
        this.state.hashtags.map((value, index) => (
            <TouchableOpacity
                onPress={() => this.onHashPress(value)}
                key={index}
            >
                <View style={{backgroundColor: 'lightgrey', marginRight: 5}}>
                    <Text>{value}</Text>
                </View>
            </TouchableOpacity>
            )
        )
    )

}

const styles = StyleSheet.create ({
    headline: {
        fontSize: 25,
    },
    headlineContainer: {
        padding: 10,
        marginTop: 10,
    },
    miscContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        marginTop: 5
    },
    userLink: {
        color: "blue",
        textDecorationLine: 'underline'
    },
    descContainer: {
        padding: 10,
        marginTop: 10
    },
    price: {
        fontSize: 20,
        padding: 10
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
        marginTop: 10
    },
    imageContainer: {
        flexDirection: 'row',
        padding: 10
    },
    hashtagContainer: {
        flexDirection: 'row',
        padding: 10
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
 
export default connect(mapStateToProps, mapDispatchToProps)(ViewOfferScreen);

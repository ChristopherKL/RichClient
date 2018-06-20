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
import getOffer from '../apiCom/getOffer';


export class ViewOfferScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {imgs: [], hashtags: []};
    }
    componentDidMount() {

        this.setState({             id: "2221",
                                    name: "Endgeiler Schuh",
                                    imgs: [ "https://i.otto.de/i/otto/18723170/woodstone-kids-trekking-schuh-rot.jpg",
                                            "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Smiley.svg/600px-Smiley.svg.png"],
                                    price: "121321€",
                                    desc: "mega gut ja",
                                    zipcode: '11111',
                                    insertDate: "27.01.2018",
                                    insertUser: "BenutzerName",
                                    insertUserid: "1",
                                    hashtags: [ "#aaa", "#bbbb" ]
                                    });
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
            title: "Angebotsbild"
        });
    }
    onHashPress = (item) => {
        alert(item);
    }
    onUserPress = () => {
        this.props.navigator.push({
            screen: 'buylocal.profileScreen',
            passProps: {profileId: this.state.insertUserid},
            title: "Mein Profil"
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
                    <TouchableOpacity>
                        <Text style={styles.userLink}>Anbieter {this.state.BenutzerName}</Text>
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
    renderImagesList = () => (
            this.state.imgs.map((value, index) => (
                <TouchableOpacity
                    onPress={() => this.onImgPress(value)}
                    key={index}
                >
                        <Image
                            style={{width: 70, height: 70, marginRight: 4}}
                            source={{uri: value}}
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

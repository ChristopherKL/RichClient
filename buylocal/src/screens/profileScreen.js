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


export class ProfileScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {profile_username: null};
    }
    componentDidMount() {
        getProfile(createToken(this.props.userData.token, this.props.serverPublicKey), this.props.profile_id,  this.props.serverPublicKey).then(
            (res) => {
                if(typeof res == "string") {
                    alert("Fehler: "+ res);
                    this.props.navigator.pop();
                }
                else {
                    this.setState({ profile_username: res.BenutzerName, 
                        review_score: 3.5, 
                        registrate_date: res.reg_date,
                        last_login: res.last_login});
                }
            }

        )
        this.setState({ offers: [{  id: "2221",
                                    name: "Endgeiler Schuh",
                                    img_uri: "https://i.otto.de/i/otto/18723170/woodstone-kids-trekking-schuh-rot.jpg",
                                    price: "121321€"
                                    }]});
    }
    onPress = () => {
        this.props.navigator.push({
            screen: 'buylocal.resetPasswordScreen',
            title: "Passwort zurücksetzen"
        });
    }
    render() {
        return (
            <View>
                <View style={styles.headlineContainer}>
                    <Text style={styles.headline}>{this.state.profile_username}</Text>
                    { (this.props.profile_id == this.props.userData.id) && this.renderEditProfileButton() }
                </View>
                <View style={styles.dateContainer}>
                    <Text>Zuletzt Online: {this.state.last_login}</Text>
                    <Text>Regestriert am: {this.state.registrate_date}</Text>
                </View>
                {this.renderReviewStars()}
                <View style={{padding: 10}}>
                    <TouchableOpacity
                            style={styles.button}
                            onPress={this.onPress}
                    >
                        <Text>Bewertungen anzeigen</Text>
                    </TouchableOpacity>
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
                    keyExtractor={(item) => item.id}
                />
            </View>
        )
    }
    renderOffer = ({item}) => (
        <View style={styles.offerContainer}>
            <Image
                style={{width: 40, height: 40}}
                source={{uri: item.img_uri}}
            />
            <Text>{item.name}</Text>
            <Text>{item.price}</Text>
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
    
    renderReviewStars = () => {
        starImgs = []
        fullNum = Math.trunc(this.state.review_score);


        for(fullCount = 0; fullCount < fullNum; fullCount++) {
            starImgs.push(require("./../../img/full.png"));
        }
        if(this.state.review_score % 1 == 0.5) {
            starImgs.push(require("./../../img/half.png"));
        }

        emptyNum = 5-starImgs.length;
        for(emptyCount = 0; emptyCount < emptyNum; emptyCount++) {
            starImgs.push(require("./../../img/empty.png"));
        }         

        return (
            <View style={styles.reviewStarContainer}>
                {starImgs.map((starKind, starNum) => {
                    return (
                            <Image
                                key={starNum}
                                style={{width: 35, height: 35, alignSelf: 'flex-end'}}
                                source={starKind}
                            />);
                })}
            </View>
        )

    }

    renderEditProfileButton = () => {
        return (
            <View style={styles.rightContainer}>
                <Image
                    style={{width: 35, height: 35, alignSelf: 'flex-end'}}
                    source={require('./../../img/edit.png')}
                />
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
    reviewStarContainer: {
        padding: 10,
        marginTop: 30,
        flex: 1, 
        flexDirection: 'row',
        alignItems: 'center'        
    },
    rightContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    dateContainer: {
        padding: 10,
        marginTop: 10
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
        marginTop: 10
    },
    offerContainer: {
        flex: 1, 
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
        loggedIn: state.loginReducer.loggedIn,
        userData: state.loginReducer.userData,
        serverPublicKey: state.ServerKeyReducer.serverPublicKey
    }
}
 
const mapDispatchToProps = (dispatch) => {
    return {
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);

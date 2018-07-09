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


export class ProfileScreen extends Component {
    constructor(props) {
        super(props)
        this.state = ({isLoading: true});
    }
    componentDidMount() {
        getProfile(createToken(this.props.userData.token, this.props.serverPublicKey), this.props.profileId).then(
            (res) => {
                if(typeof res == "string") {
                    alert("Fehler: "+ res);
                    this.props.navigator.pop();
                }
                else {
                    this.setState({ profileUsername: res.BenutzerName, 
                        reviewScore: res.Bewertung, 
                        regDate: res.reg_date,
                        lastLogin: res.last_login,
                        isLoading: false});
                    this.setState({ offers: res.Angebote });
                }
            }

        )

    }
    onEditPress = () => {
        this.props.navigator.push({
            screen: 'buylocal.editProfileScreen',
            title: "Profil bearbeiten"
        });
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
                    {
                    (this.props.profileId == this.props.userData.id) ? 
                        <Text style={styles.headline}>{this.props.userData.username}</Text> :
                        <Text style={styles.headline}>{this.state.profileUsername}</Text>
                    }
                    { (this.props.profileId == this.props.userData.id) && this.renderEditProfileButton() }
                </View>
                <View style={styles.dateContainer}>
                    <Text>Zuletzt Online: {this.state.lastLogin}</Text>
                    <Text>Regestriert am: {this.state.regDate}</Text>
                </View>
                {this.renderReviewStars()}
                <View>
                    <TouchableOpacity
                            style={styles.button}
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
                    keyExtractor={(item) => "angebot"+item.AngebotID}
                />
            </View>
        )
    }
    renderOffer = ({item}) => (
        <TouchableOpacity
            onPress={() => this.onOfferPress(item.AngebotID)}
        >
            <View style={styles.offerContainer}>
                <Image
                    style={{width: 40, height: 40}}
                    source={{uri: 'data:image/jpeg;base64,' + item.Bild1}}
                />
                <Text>{item.Titel}</Text>
                <Text>{item.Preis}</Text>
            </View>
        </TouchableOpacity>
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
        fullNum = Math.trunc(this.state.reviewScore);


        for(fullCount = 0; fullCount < fullNum; fullCount++) {
            starImgs.push(require("./../../img/full.png"));
        }
        if(this.state.reviewScore % 1 == 0.5) {
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
                <TouchableOpacity
                        onPress={this.onEditPress}
                >                
                    <Image
                        style={{width: 35, height: 35, alignSelf: 'flex-end'}}
                        source={require('./../../img/edit.png')}
                    />
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
        loggedIn: state.LoginReducer.loggedIn,
        userData: state.LoginReducer.userData,
        serverPublicKey: state.ServerKeyReducer.serverPublicKey
    }
}
 
const mapDispatchToProps = (dispatch) => {
    return {
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);

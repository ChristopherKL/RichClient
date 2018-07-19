import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList
} from 'react-native';
import {connect} from 'react-redux';
import createToken from '../apiCom/createToken';
import getRatings from '../apiCom/getRatings';


export class UserRatingsScreen extends Component {
    static navigatorButtons = { rightButtons: [
		{
		  icon: require('../../img/ic_launcher.png'), // for icon button, provide the local image asset name
		}
	  ]
  	};
    constructor(props) {
        super(props)
        this.state = ({isLoading: true});
    }
    componentDidMount() {
        this.getCurrentOffers();
    }
    getCurrentOffers() {
        getRatings(createToken(this.props.userData.token, this.props.serverPublicKey), this.props.profileId).then(
            (res) => {
                if(typeof res == "string") {
                    alert("Fehler: "+ res);
                    this.props.navigator.pop();
                }
                else {
                    this.setState({ ratings: res.Benutzer.Bewertung, username: res.Benutzer.BenutzerName, isLoading: false });
                }
            }

        )
    }
    render() {
        if(this.state.isLoading) {
            return (
                <View>
                    <Text>Loading...</Text>
                </View>
            )
        }

        return (
            <View>
                <View style={styles.headlineContainer}>
                    <Text>Bewertungen von {this.state.username}</Text>
                </View>
                {this.renderRatingsList()}

            </View>
        );
    }

    renderRatingsList = () => {
        return (
            <View style={styles.ratingList}>
                <FlatList
                    ItemSeparatorComponent={this.renderSeparator}
                    data={this.state.ratings}
                    renderItem={this.renderRating}
                    keyExtractor={(item) => "rating"+item.BewertungID}
                />
            </View>
        )
    }
    renderRating = ({item}) => (
            <View style={styles.ratingContainer}>
                <Text>Sterne: {item.Sterne} </Text>
                
                <Text>{(item.Text != null) ? "Kommentar: " + item.Text : null}</Text>

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
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    ratingList: {
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
 
export default connect(mapStateToProps, mapDispatchToProps)(UserRatingsScreen);

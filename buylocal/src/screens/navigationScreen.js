import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    Image
} from 'react-native';
import { connect } from 'react-redux';
import { logoutActionCreator } from '../redux/actions/loginAction';
import BackgroundFetch from "react-native-background-fetch";


export class NavigationScreen extends Component {
    static navigatorButtons = { rightButtons: [
        {
          icon: require('../../img/ic_launcher.png'), // for icon button, provide the local image asset name
        }
      ]
  };
    constructor(props) {
        super(props);

        this.loggedIn_nav_entries = [
            {
                title: 'Mein Profil',
                key: 'profile'
            },
            {
                title: 'Nachrichten',
                key: 'messages'
            },
            {
                title: 'Suchen',
                key: 'search'
            },
            {
                title: 'Verkaufen',
                key: 'sell'
            },
            {
                title: 'Meine Angebote',
                key: 'myoffers'                
            },
            {
                title: 'Gespeicherte Suchen',
                key: 'savedsearches'
            },
            {
                title: 'Logout',
                key: 'logout'                
            }            
        ];


        this.unlogged_nav_entries = [
            {
                title: 'Login',
                key: 'login'
            },
            {
                title: 'Registrieren',
                key: 'registration'
            },
            {
                title: 'Passwort zurücksetzen',
                key: 'resetpasswd'
            }
        ];
    }
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

    alertItemName = (item) => {
        if(this.props.loggedIn) {
            switch(item.key) {
                case 'profile':
                    this.props.navigator.push({
                        screen: 'buylocal.profileScreen',
                        passProps: {profileId: this.props.userData.id},
                        title: "Mein Profil"
                    });
                    break;
                case 'sell':
                    this.props.navigator.push({
                        screen: 'buylocal.newOfferScreen',
                        title: "Neues Angebot"
                    });
                    break;
                case 'messages':
                    this.props.navigator.push({
                        screen: 'buylocal.negotiationListScreen',
                        title: "Nachrichten"
                    });
                    break;
                case 'logout':
                    this.props.logoutAction();
                    BackgroundFetch.stop()
                    this.props.navigator.switchToTab({tabIndex: 1});
                    break;
                case 'search':
                    this.props.navigator.push({
                        screen: 'buylocal.searchScreen',
                        title: "Suchen"
                    });
                    break;
                case 'myoffers':
                    this.props.navigator.push({
                        screen: 'buylocal.myOffersScreen',
                        title: "Meine Angebote"
                    });
                    break;
                case 'savedsearches':
                    this.props.navigator.push({
                        screen: 'buylocal.savedSearchesScreen',
                        title: "Gespeicherte Suchen"
                    });
                break;
                default:
                    alert(item.title);
                    break;
            }
        }
        else {
            switch(item.key) {
                case 'resetpasswd':
                    this.props.navigator.push({
                        screen: 'buylocal.resetPasswordScreen',
                        title: "Passwort zurücksetzen"
                    });
                    break;
                case 'registration':
                    this.props.navigator.push({
                        screen: 'buylocal.registrationScreen',
                        title: "Registrieren"
                    });
                    break;
                case 'login':
                    this.props.navigator.switchToTab({tabIndex: 1});
                    break;
                default:
                    alert(item.title);
                    break;
                
            }
        }

    }    
    render() {
        return (
            <View> 
                <FlatList
                    data={ (this.props.loggedIn == true) ? this.loggedIn_nav_entries : this.unlogged_nav_entries}
                    ItemSeparatorComponent={this.renderSeparator}
                    renderItem={({item}) => (
                            <TouchableOpacity
                                key = {item.key}
                                style = {styles.container}
                                onPress = {() => this.alertItemName(item)}>
                        
                                <Text style = {styles.text}>
                                    {item.title}
                                </Text>
                                <View style={styles.rightContainer}>
                                    <Image
                                        style={{width: 50, height: 35, alignSelf: 'flex-end'}}
                                        source={require('./../../img/pfeil.png')}
                                    />
                                </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create ({
   container: {
        padding: 10,
        marginTop: 3,
        flex: 1, 
        flexDirection: 'row',
        alignItems: 'center'
    },
    rightContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    }
})

const mapStateToProps = (state) => {
    return {
        loggedIn: state.LoginReducer.loggedIn,
        userData: state.LoginReducer.userData
    }
}
 
const mapDispatchToProps = (dispatch) => {
    return {
        logoutAction: () => { dispatch(logoutActionCreator()) }
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(NavigationScreen);

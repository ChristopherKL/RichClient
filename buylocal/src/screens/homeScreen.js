import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';
import LoginScreen from './loginScreen'
import { connect } from 'react-redux';
import BackgroundFetch from "react-native-background-fetch";
import createToken from '../apiCom/createToken';
import executeSavedSearches from '../apiCom/backgroundFetch';
import PushNotification from 'react-native-push-notification';

export class HomeScreen extends Component {
    constructor(props) {
        super(props)
    }


    componentWillReceiveProps(nextProps) {
        if(nextProps.loggedIn) {
            BackgroundFetch.configure({
                minimumFetchInterval: 15, // <-- minutes (15 is minimum allowed)
              }, () => {
                console.log("[js] Received background-fetch event");
                executeSavedSearches(createToken(nextProps.userData.token, nextProps.serverPublicKey)).then(
                    (res) => {
                        if(typeof res == "string") {
                            alert("Fehler: "+res);
                        }
                        else {
                            let title = "Neue Angebote wurden für Sie eingestellt!";
                            let bigText = "Suchanfragen: "
                            
                            res.Resultate.forEach(element => {
                                if(element.neueAngebot.length > 0)
                                    bigText += element.suchanfrageName + " (" + element.neueAngebot.length + "), "
                            });
                            bigText = bigText.substring(0, bigText.length - 2);
                            if(bigText != "Suchanfragen: ") {
                                PushNotification.localNotification({
                                    autoCancel: true, // (optional) default: true
                                    largeIcon: "ic_launcher", // (optional) default: "ic_launcher"
                                    smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher"
                                    bigText: bigText, // (optional) default: "message" prop
                                    color: "blue", // (optional) default: system default
                                    vibrate: true, // (optional) default: true
                                    vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
        
                                
                                    /* iOS and Android properties */
                                    title: title, // (optional)
                                    message: "My Notification Message", // (required)
                                    playSound: false, // (optional) default: true
                                    soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
                                });
                            }
                        }
                    }
                )
                BackgroundFetch.finish(BackgroundFetch.FETCH_RESULT_NEW_DATA);
              }, (error) => {
                console.log("[js] RNBackgroundFetch failed to start");
              });
        } 
            

    }
    render() {
        return (this.props.loggedIn) ? this.renderLoggedInScreen() : this.renderLoginScreen();
    }

    renderLoginScreen() {
        return (
            <LoginScreen { ...this.props }/>
        );
    }
    renderLoggedInScreen() {
        return (
            <Text>Logged in as {this.props.userData.username}</Text>
        )
    }
}



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
 
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
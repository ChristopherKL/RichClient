import React, { Component } from 'react';
import {
  Text,
  View,
  AsyncStorage
} from 'react-native';
import LoginScreen from './loginScreen'


export default class HomeScreen extends Component {
    constructor(props) {
        super(props)
    }

    updateLoggedIn() {
        console.log("called me");
    }

    renderLoggedInHome() {
        return (
            <Text>Logged in as </Text>
        )
    }
    render() {
        return (
            <View>
                <LoginScreen { ...this.props } updateLoggedIn={this.updateLoggedIn()}/>
            </View>
        );
    }

}
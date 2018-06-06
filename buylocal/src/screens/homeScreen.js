import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';
import LoginScreen from './loginScreen'
 

export default class HomeScreen extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View>
                <LoginScreen { ...this.props }/>
            </View>
        );
    }

}
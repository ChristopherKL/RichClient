import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';


export default class InfoScreen extends Component {
    static navigatorButtons = { rightButtons: [
        {
          icon: require('../../img/ic_launcher.png'), // for icon button, provide the local image asset name
        }
      ]
  };
    render() {
        return (
            <View>
                <Text>
                    Buylocal FH Bielefeld 2018 Christopher Kluck, Karl Piplies, Stefan Schuck
                </Text>
            </View>
        );
    }
}
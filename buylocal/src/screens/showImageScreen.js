import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet
} from 'react-native';
import FitImage from 'react-native-fit-image';


export default class ShowImageScreen extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View>
                <FitImage
                    source={{ uri: `data:image/gif;base64,${this.props.imgUrl}` }}
                    style={styles.fitImage}
                />
            </View>
        )
    }
}

var styles = StyleSheet.create({
    fitImage: {
      borderRadius: 20,
    },
    fitImageWithSize: {
      height: 100,
      width: 30,
    },
  });
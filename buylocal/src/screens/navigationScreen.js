import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    Image
} from 'react-native';

export default class NavigationScreen extends Component {
    constructor(props) {
        super(props);

        this.nav_entries = [
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
        alert(item.title);
    }    
    render() {
        return (
            <View> 
                <FlatList
                    data={this.nav_entries}
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
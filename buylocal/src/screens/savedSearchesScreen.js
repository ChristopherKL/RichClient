import React, { Component } from 'react';
import {
    View,
    FlatList,
    Text,
    TouchableOpacity,
    StyleSheet
} from "react-native";
import startSavedSearch from "../apiCom/startSavedSearch";
import getSavedSearches from "../apiCom/getSavedSearches";
import createToken from "../apiCom/createToken";
import deleteSavedSearch from "../apiCom/deleteSavedSearch";
import { connect } from 'react-redux';

export class SavedSearchesScreen extends Component {
    static navigatorButtons = { rightButtons: [
		{
		  icon: require('../../img/ic_launcher.png'), // for icon button, provide the local image asset name
		}
	  ]
  	};
    constructor(props) {
        super(props);
        this.state = {
            searchArray: [],
            isLoading: true
         };
    }

    componentDidMount() {
        this.refreshSavedSearches();
    }

    refreshSavedSearches(){
        getSavedSearches(createToken(this.props.userData.token, this.props.serverPublicKey)).then(
            (res) => {
                if (typeof res == "string") {
                    alert("Fehler: " + res);
                }
                else {
                    this.setState({ searchArray: res.suchanfragen, isLoading: false });
                }
            }
        )
    }

    onSearchPress = (id) => {
        startSavedSearch(createToken(this.props.userData.token, this.props.serverPublicKey), id).then(
            (res) => {
                if (typeof res == "string") {
                    alert("Fehler: " + res);
                }
                else {
                    this.props.navigator.push({
                        screen: 'buylocal.searchResultsScreen',
                        passProps: { results: res.Resultate },
                        title: "Suchergebnisse"
                    });
                }
            }
        )
    };

    onDelPress = (id) => {
        deleteSavedSearch(createToken(this.props.userData.token, this.props.serverPublicKey), id).then(
            (res) => {
                if (typeof res == "string") {
                    alert("Fehler: " + res);
                    this.props.navigator.pop();
                }
                else {
                    this.refreshSavedSearches();
                    alert("Suche geloescht");
                }
            }
        )
    };

    renderItem = ({ item }) => {
        return(
        <View style={styles.offerContainer}>
            <TouchableOpacity
                style={{flex: 1}}
                onPress={() => this.onSearchPress(item.SuchanfrageID)}
            >
                <Text style={{marginLeft: 10, marginRight: 10}}>{item.Name}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => this.onDelPress(item.SuchanfrageID)}
            >
                <Text>Löschen</Text>
            </TouchableOpacity>
        </View>
        )
    };

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

    render() {
        if (this.state.isLoading) {
            return (
                <View>
                    <Text>Loading...</Text>
                </View>
            )
        }
        return (
            <View style={styles.offerList}>
                <FlatList
                    ItemSeparatorComponent={this.renderSeparator}
                    data={this.state.searchArray}
                    renderItem={this.renderItem}
                    ListEmptyComponent={<Text>Keine gespeicherten Suchen vorhanden</Text>}
                    keyExtractor={(item) => "suche" + item.SuchanfrageID}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
    },
    offerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    offerList: {
        margin: 10,
        borderWidth: 1,
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

export default connect(mapStateToProps, mapDispatchToProps)(SavedSearchesScreen);
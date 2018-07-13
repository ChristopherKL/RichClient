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

export class SavedSearchesScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { searchArray: [] };
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
                    this.setState({ searchArray: res.suchanfragen })
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
                        screen: 'buylocal.searchResultScreen',
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
        <View style={styles.offerContainer}>
            <TouchableOpacity
                onPress={this.onSearchPress(item.SuchanfrageID)}
            >
                <Text>{item.Name}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => this.onDelPress(item.SuchanfrageID)}
            >
                <Text>Löschen</Text>
            </TouchableOpacity>
        </View>
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
        return (
            <View>
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
        marginTop: 10
    },
    offerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
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
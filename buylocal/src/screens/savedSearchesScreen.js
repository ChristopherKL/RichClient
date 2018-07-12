import React, { Component } from 'react';
import {
    View,
    FlatList,
    Text,
    TouchableOpacity,
    StyleSheet
} from "react-native";

export class SavedSearchesScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { searchArray: [] };
    }

    componentDidMount() {
        //TODO gespeicherte Suchen abfragen
        // this.setState({searchArray: res.Suchen})
    }

    onSearchPress = (id) => {
        //TODO gespeicherte Suche mit ID aufrufen
    };

    onDelPress = (id) => {
        //TODO gespeicherte Suche löschen
    };

    renderItem = ({ item }) => {
        <View style={styles.offerContainer}>
            <TouchableOpacity
                onPress={this.onSearchPress(item.SuchID)}
            >
                <Text>{item.SuchName}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => this.onDelPress(item.SuchID)}
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
                    keyExtractor={(item) => "suche" + item.SuchID}
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

export default SavedSearchesScreen;
import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    FlatList
} from 'react-native';
import { connect } from 'react-redux';

export class SearchResultsScreen extends Component {
    constructor(props) {
        super(props);
    }

    onOfferPress = (id) => {
        this.props.navigator.push({
            screen: 'buylocal.viewOfferScreen',
            passProps: { offerId: id },
            title: "Angebot"
        });
    }

    render() {
        return (
            <View>
                {this.renderOfferList()}
            </View>
        );
    }

    renderOfferList = () => {
        return (
            <View style={styles.offerList}>
                <FlatList
                    ItemSeparatorComponent={this.renderSeparator}
                    data={this.props.results}
                    renderItem={this.renderOffer}
                    keyExtractor={(item) => "angebot" + item.AngebotID}
                />
            </View>
        )
    }

    renderOffer = ({ item }) => (
        <TouchableOpacity
            onPress={() => this.onOfferPress(item.AngebotID)}
        >
            <View style={styles.offerContainer}>
                <Image
                    style={{ width: 40, height: 40 }}
                    source={{ uri: 'data:image/jpeg;base64,' + item.Bild1 }}
                />
                <Text>{item.Titel}</Text>
                <Text>{item.Preis}</Text>
            </View>
        </TouchableOpacity>
    )

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

}

const styles = StyleSheet.create({
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultsScreen);

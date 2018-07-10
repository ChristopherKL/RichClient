import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import createToken from '../apiCom/createToken';
import getNegotiations from '../apiCom/getNegotiations';

export class NegotiationListScreen extends Component {
    constructor(props) {
        super(props)
        this.state = ({ isLoading: false });
    }

    componentDidMount() {
        this.refreshNegotiations();
    }

    refreshNegotiations() {
        getNegotiations(createToken(this.props.userData.token, this.props.serverPublicKey)).then(
            (res) => {
                if (typeof res == "string") {
                    alert("Fehler: " + res);
                }
                else {
                    this.setState({
                        negotiations: res.negs,
                        isLoading: false
                    })
                }
            }
        )
    }

    onNegotiationPress = (item) => {
        this.props.navigator.push({
            screen: 'buylocal.negotiationScreen',
            passProps: { onChangedNeg: () => { this.refreshNegotiations(); }, negData: item },
            title: "Verhandlung mit " + (this.props.userData.username === item.sender.BenutzerName) ? item.recipient.BenutzerName : item.sender.BenutzerName
        });
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

    renderNegotiation = ({ item }) => (
        <TouchableOpacity
            onPress={() => this.onNegotiationPress(item)}
        >
            <View>
                <View style={styles.flowContainer}>
                    <Text style={item.Gelesen ? {fontWeight: 'normal'}:{fontWeight: 'bold'}}>
                        { (this.props.userData.username === item.sender.BenutzerName) ? item.recipient.BenutzerName : item.sender.BenutzerName }
                    </Text>
                    <Text style={item.Gelesen ? {fontWeight: 'normal'}:{fontWeight: 'bold'}}>
                        {item.last_edited}
                    </Text>
                </View>
                <Text style={item.Gelesen ? {fontWeight: 'normal'}:{fontWeight: 'bold'}}>
                    {item.Betreff}
                </Text>
            </View>
        </TouchableOpacity>
    )

    render() {
        return (
            <View>
                <FlatList
                    ItemSeparatorComponent={this.renderSeparator}
                    data={this.state.negotiations}
                    renderItem={this.renderNegotiation}
                    keyExtractor={(item) => "verhandlung"+item.VerhandlungID}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    flowContainer: {
		flex: 1,
		flexDirection: 'row',
		padding: 10,
		justifyContent: 'space-between'
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
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

export default connect(mapStateToProps, mapDispatchToProps)(NegotiationListScreen);
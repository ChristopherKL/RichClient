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
        this.state = ({ isLoading: true });
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
            <View style={styles.negContainer}>
                <View style={styles.flowContainer}>
                    <Text style={item.ungelesene.length == 0 ? { fontWeight: 'normal' } : { fontWeight: 'bold' }}>
                        {(this.props.userData.username === item.sender.BenutzerName) ? item.recipient.BenutzerName : item.sender.BenutzerName}
                    </Text>
                    <Text style={item.ungelesene.length == 0 ? { fontWeight: 'normal' } : { fontWeight: 'bold' }}>
                        {item.last_edited}
                    </Text>
                </View>
                <Text style={item.ungelesene.length == 0 ? { fontWeight: 'normal' } : { fontWeight: 'bold' }}>
                    {item.Betreff}
                </Text>
            </View>
        </TouchableOpacity>
    )

    render() {
        if (this.state.isLoading) {
            return (
                <View>
                    <Text>Loading...</Text>
                </View>
            )
        }
        return (
            <View>
                <FlatList
                    ItemSeparatorComponent={this.renderSeparator}
                    data={this.state.negotiations}
                    renderItem={this.renderNegotiation}
                    ListEmptyComponent={<Text>Keine Nachrichten vorhanden</Text>}
                    keyExtractor={(item) => "verhandlung"+item.VerhandlungID}

                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    negContainer: {
        paddingLeft: 10,
        paddingTop: 10,
        paddingBottom: 5
    },
    flowContainer: {
        flex: 1,
        flexDirection: 'row',
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
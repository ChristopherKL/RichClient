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
                        negotiations: res.verhandlungen,
                        isLoading: false
                    })
                }
            }
        )
    }

    onNegotiationPress = (id) => {
        this.props.navigator.push({
            screen: 'buylocal.viewNegotiationScreen',
            passProps: { negId: id },
            title: "Verhandlung"
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
            onPress={() => this.onNegotiationPress(item.VerhandlungId)}
        >
            <Text style={item.ungelesene_nachrichten == 0 ? { fontWeight: 'normal' } : { fontWeight: 'bold' }}>
                {item.Betreff}
            </Text>
        </TouchableOpacity>
    )

    render() {
        return (
            <View>
                <FlatList
                    ItemSeparatorComponent={this.renderSeparator}
                    data={this.state.negotiations}
                    renderItem={this.renderNegotiation(item)}
                    keyExtractor={(item) => item.VerhandlungId}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
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
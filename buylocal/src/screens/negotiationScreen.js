import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList
} from 'react-native';
import {connect} from 'react-redux';
import getNegotiation from '../apiCom/getNegotiation';
import createToken from '../apiCom/createToken';
import confirmNegotiation from '../apiCom/confirmNegotiation'


export class NegotiationScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {partnerConfirmed: null, confirmed: null, rated: null, isSender: null, negData: null, messages: [] , imgs: [], hashtags: []};
    }
    componentDidMount() {
        if((this.props.userData.username === this.props.negData.sender.BenutzerName))
            this.setState({isSender: true});
        
        getNegotiation(createToken(this.props.userData.token, this.props.serverPublicKey), this.props.negData.VerhandlungID,
        (this.isSender) ? this.props.negData.AbsenderSchlüssel : this.props.negData.EmpfängerSchlüssel, this.props.userData.keyPair).then(
            (res) => {
                this.props.negData.Bewertung.forEach((rating) => {
                    if(rating.Bewerter == this.props.userData.id) {
                        this.setState({rated: true});
                    }
                })
                this.setState({messages: res.Nachrichten,
                    confirmed: (this.state.isSender) ? this.props.negData.AbsenderCheck : this.props.negData.EmpfängerCheck,
                    partnerConfirmed: (this.state.isSender) ? this.props.negData.EmpfängerCheck : this.props.negData.AbsenderCheck},
                    );
            }
        )
    }

    getMessages() {
        getNegotiation(createToken(this.props.userData.token, this.props.serverPublicKey), this.props.negData.VerhandlungID,
        (this.isSender) ? this.props.negData.AbsenderSchlüssel : this.props.negData.EmpfängerSchlüssel, this.props.userData.keyPair).then(
            (res) => {
                this.setState({messages: res.Nachrichten});
            }
        )
    }
    onNewPress = () => {
        this.props.navigator.push({
            screen: 'buylocal.newMessageScreen',
            passProps: { updateCallback: () => { this.getMessages() }, negData: this.props.negData, partnerName: (this.state.isSender) ?  this.props.negData.recipient.BenutzerName : this.props.negData.sender.BenutzerName},
            title: "Neue Nachricht"
        });

    }
    onConfPress = () => {
        confirmNegotiation(createToken(this.props.userData.token, this.props.serverPublicKey), this.props.negData.VerhandlungID).then(
            (res) => {
                if(typeof res == "string") {
                    alert("Fehler: "+res);
                }
                else {
                    this.props.onChangedNeg();
                    this.setState({confirmed: true});
                    alert("Geschäft bestätigt")
                    
                }
                

            }
        )

    }
    onRatePress = () => {
        this.props.navigator.push({
            screen: 'buylocal.rateUserScreen',
            passProps: { onChangedNeg: this.props.onChangedNeg, 
                updateCallback: () => { this.setState({rated: true}) },
                negId: this.props.negData.VerhandlungID,
                recipient: (this.isSender) ? this.props.negData.Empfänger : this.props.negData.Absender,
            },
            title: "Nutzer bewerten"
        });
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <View style={styles.headlineContainer}>
                   <Text style={styles.headline}>Verhandlung mit {(this.state.isSender) ?  this.props.negData.recipient.BenutzerName : this.props.negData.sender.BenutzerName}</Text>
                </View>

                {this.renderMessageList()}

                <View style={styles.lowButtonBarContainer}>
                    {this.renderLeftButton()}
                    {this.renderRightButton()}
                </View>
            </View>
        );
    }
    renderMessageList() {
        return (
            <FlatList
                    ItemSeparatorComponent={this.renderSeparator}
                    data={this.state.messages}
                    renderItem={this.renderMessage}
                    keyExtractor={(item) => "msg"+item.NachrichtID}
                    
                />
        )
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
    
    renderMessage = ({item}) => {
        return (
            <View style={styles.messageContainer}>
                {(this.props.userData.id != item.Absender) ? 
                    <Image
                        style={{width: 50, height: 40}}
                        source={require('../../img/incomingmsg.png')}
                    />
                    :
                    <Image
                        style={{width: 50, height: 40}}
                        source={require('../../img/outgoingmsg.png')}
                    />
                }
                <View style={styles.messsageContentContainer}>
                    <Text>Datum: {item.Datum}</Text>
                    <Text>{item.Text}</Text>
                </View>
            </View>
        );
        
    }
    renderLeftButton = () => {
        if(this.state.confirmed == null) {
            return (
                <TouchableOpacity
                style={styles.button}
                onPress={this.onConfPress}
                >
                    <Text>Gekauft/Verkauft</Text>
                </TouchableOpacity>
            )
        }
        else if(this.state.rated == null && this.state.partnerConfirmed != null) {
            return (
                <TouchableOpacity
                style={styles.button}
                onPress={this.onRatePress}
                >
                    <Text>Partner bewerten</Text>
                </TouchableOpacity>
            )
        }
        else {
            return (null);
        }
    }
    renderRightButton = () => (
        <TouchableOpacity
        onPress={this.onNewPress}
        >
            <Image
                style={{width: 50, height: 40}}
                source={require('../../img/plus.png')}
            />
        </TouchableOpacity>
    )


}

const styles = StyleSheet.create ({
    headline: {
        fontSize: 25,
    },
    headlineContainer: {
        padding: 10,
        marginTop: 10,
    },
    messageContainer: {
        flex: 1, 
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 10
    },
    messsageContentContainer: {
        backgroundColor: 'lightgrey',
        flex: 1
    },
    lowButtonBarContainer: {
        flex: 1, 
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        padding: 10
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
        marginTop: 10
    }
 })


const mapStateToProps = (state) => {
    return {
        loggedIn: state.LoginReducer.loggedIn,
        userData: state.LoginReducer.userData,
        serverPublicKey: state.ServerKeyReducer.serverPublicKey,
    }
}
 
const mapDispatchToProps = (dispatch) => {
    return {
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(NegotiationScreen);

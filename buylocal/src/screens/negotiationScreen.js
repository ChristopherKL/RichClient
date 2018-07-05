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



export class NegotiationScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {negData: {partnerName: null, confirmed: null, rated: null}, messages: [] , imgs: [], hashtags: []};
    }
    componentDidMount() {
        //getNegotiation(createToken(this.props.userData.token, this.props.serverPublicKey), this.props.negId).then(
        //    (res) => {
        //        if(typeof res == "string") {
        //            alert("Fehler: "+ res);
        //            this.props.navigator.pop();
        //        }
        //        else {
        //            this.setState(res);
        //        }
        //    }
        //)
        this.setState({negData: {partnerName: "robert", confirmed: "1", rated: "0"}});
        this.setState({messages: [  {id: "0", to: "0", date: "21.02.19 22:00", content: "roflrofl\nrofl"},
                                    {id: "11", to: "12", date: "22.02.19 22:00", content: "xxx\naaa"}]});

    }
    onNewPress = () => {
        alert("new msg");
    }
    onConfPress = () => {
        alert("conf");
    }
    onRatePress = () => {
        alert("rate");
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <View style={styles.headlineContainer}>
                   <Text style={styles.headline}>Verhandlung mit {this.state.negData.partnerName}</Text>
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
                    keyExtractor={(item) => item.id}
                    
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
                {("0" == item.to) ? 
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
                    <Text>Datum: {item.date}</Text>
                    <Text>{item.content}</Text>
                </View>
            </View>
        );
        
    }
    renderLeftButton = () => {
        if(this.state.negData.confirmed == "0") {
            return (
                <TouchableOpacity
                style={styles.button}
                onPress={this.onConfPress}
                >
                    <Text>Gekauft/Verkauft</Text>
                </TouchableOpacity>
            )
        }
        else if(this.state.negData.rated == "0") {
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
        serverPublicKey: state.ServerKeyReducer.serverPublicKey
    }
}
 
const mapDispatchToProps = (dispatch) => {
    return {
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(NegotiationScreen);

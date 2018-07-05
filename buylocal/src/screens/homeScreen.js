import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';
import LoginScreen from './loginScreen'
import { connect } from 'react-redux';



export class HomeScreen extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (this.props.loggedIn) ? this.renderLoggedInScreen() : this.renderLoginScreen();
    }

    renderLoginScreen() {
        return (
            <LoginScreen { ...this.props }/>
        );
    }
    renderLoggedInScreen() {
        return (
            <Text>Logged in as {this.props.userData.username}</Text>
        )
    }
}



const mapStateToProps = (state) => {
    return {
        loggedIn: state.LoginReducer.loggedIn,
        userData: state.LoginReducer.userData
    }
}
 
const mapDispatchToProps = (dispatch) => {
    return {
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
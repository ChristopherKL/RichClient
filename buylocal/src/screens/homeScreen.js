import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';
import LoginScreen from './loginScreen'
import {bindActionCreators} from 'redux';
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
            <Text>Logged in as {this.props.userData.mail}</Text>
        )
    }
}



const mapStateToProps = (state) => {
    return {
        loggedIn: state.loggedIn,
        userData: state.userData
    }
}
 
const mapDispatchToProps = (dispatch) => {
    return {
        loginAction: (userData) => { dispatch(loginActionCreator(userData)) }
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
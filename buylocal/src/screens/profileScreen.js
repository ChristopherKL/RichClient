import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';
import LoginScreen from './loginScreen'
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

export class ProfileScreen extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View>
                <Text>Profil XY</Text>
            </View>
        );
    }

//    renderEditProfileButton() {
//        return (
//        );
//    }
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
 
export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);

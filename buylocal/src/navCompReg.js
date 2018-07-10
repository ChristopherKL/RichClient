import {Navigation, ScreenVisibilityListener} from 'react-native-navigation';

import LoginScreen from './screens/loginScreen';
import HomeScreen from './screens/homeScreen';
import InfoScreen from './screens/infoScreen';
import NavigationScreen from './screens/navigationScreen';
import ProfileScreen from './screens/profileScreen';
import ResetPasswordScreen from './screens/resetPasswordScreen';
import RegistrationScreen from './screens/registrationScreen';
import EditProfileScreen from './screens/editProfileScreen';
import NewOfferScreen from './screens/newOfferScreen';
import NegotiationListScreen from './screens/negotiationListScreen';
import ViewOfferScreen from './screens/viewOfferScreen';
import ShowImageScreen from './screens/showImageScreen';
import NegotiationScreen from './screens/negotiationScreen';
import NewMessageScreen from './screens/newMessage';
import RateUserScreen from './screens/rateUserScreen';
import SearchScreen from "./screens/searchScreen";
import MyOffersScreen from './screens/myOffersScreen';
import UserRatingsScreen from './screens/userRatingsScreen';

export function registerScreens(store, Provider) {
  Navigation.registerComponent('buylocal.loginScreen', () => LoginScreen, store, Provider);
  Navigation.registerComponent('buylocal.homeScreen', () => HomeScreen, store, Provider);
  Navigation.registerComponent('buylocal.infoScreen', () => InfoScreen, store, Provider);
  Navigation.registerComponent('buylocal.navigationScreen', () => NavigationScreen, store, Provider);
  Navigation.registerComponent('buylocal.profileScreen', () => ProfileScreen, store, Provider);
  Navigation.registerComponent('buylocal.resetPasswordScreen', () => ResetPasswordScreen, store, Provider);  
  Navigation.registerComponent('buylocal.registrationScreen', () => RegistrationScreen, store, Provider);  
  Navigation.registerComponent('buylocal.newOfferScreen',() => NewOfferScreen, store, Provider);
  Navigation.registerComponent('buylocal.negotiationListScreen',() => NegotiationListScreen, store, Provider);
  Navigation.registerComponent('buylocal.editProfileScreen', () => EditProfileScreen, store, Provider);
  Navigation.registerComponent('buylocal.viewOfferScreen', () => ViewOfferScreen, store, Provider);
  Navigation.registerComponent('buylocal.showImageScreen', () => ShowImageScreen, store, Provider); 
  Navigation.registerComponent('buylocal.negotiationScreen', () => NegotiationScreen, store, Provider);
  Navigation.registerComponent('buylocal.newMessageScreen', () => NewMessageScreen, store, Provider);    
  Navigation.registerComponent('buylocal.rateUserScreen', () => RateUserScreen, store, Provider);  
  Navigation.registerComponent('buylocal.searchScreen', () => SearchScreen, store, Provider);
  Navigation.registerComponent('buylocal.myOffersScreen', () => MyOffersScreen, store, Provider);  
  Navigation.registerComponent('buylocal.userRatingsScreen', () => UserRatingsScreen, store, Provider); 
  
}

export function registerScreenVisibilityListener() {
  new ScreenVisibilityListener({
    willAppear: ({screen}) => console.log(`Displaying screen ${screen}`),
    didAppear: ({screen, startTime, endTime, commandType}) => console.log('screenVisibility', `Screen ${screen} displayed in ${endTime - startTime} millis [${commandType}]`),
    willDisappear: ({screen}) => console.log(`Screen will disappear ${screen}`),
    didDisappear: ({screen}) => console.log(`Screen disappeared ${screen}`)
  }).register();
}

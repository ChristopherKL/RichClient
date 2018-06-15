import {Navigation, ScreenVisibilityListener} from 'react-native-navigation';

import LoginScreen from './screens/loginScreen';
import HomeScreen from './screens/homeScreen';
import InfoScreen from './screens/infoScreen';
import NavigationScreen from './screens/navigationScreen';
import ProfileScreen from './screens/profileScreen';
import ResetPasswordScreen from './screens/resetPasswordScreen';
import RegistrationScreen from './screens/registrationScreen';
import EditProfileScreen from './screens/editProfileScreen';

export function registerScreens(store, Provider) {
  Navigation.registerComponent('buylocal.loginScreen', () => LoginScreen, store, Provider);
  Navigation.registerComponent('buylocal.homeScreen', () => HomeScreen, store, Provider);
  Navigation.registerComponent('buylocal.infoScreen', () => InfoScreen, store, Provider);
  Navigation.registerComponent('buylocal.navigationScreen', () => NavigationScreen, store, Provider);
  Navigation.registerComponent('buylocal.profileScreen', () => ProfileScreen, store, Provider);
  Navigation.registerComponent('buylocal.resetPasswordScreen', () => ResetPasswordScreen, store, Provider);  
  Navigation.registerComponent('buylocal.registrationScreen', () => RegistrationScreen, store, Provider);  
  Navigation.registerComponent('buylocal.editProfileScreen', () => EditProfileScreen, store, Provider);  
}

export function registerScreenVisibilityListener() {
  new ScreenVisibilityListener({
    willAppear: ({screen}) => console.log(`Displaying screen ${screen}`),
    didAppear: ({screen, startTime, endTime, commandType}) => console.log('screenVisibility', `Screen ${screen} displayed in ${endTime - startTime} millis [${commandType}]`),
    willDisappear: ({screen}) => console.log(`Screen will disappear ${screen}`),
    didDisappear: ({screen}) => console.log(`Screen disappeared ${screen}`)
  }).register();
}

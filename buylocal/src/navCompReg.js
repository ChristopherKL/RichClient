import {Navigation, ScreenVisibilityListener} from 'react-native-navigation';

import LoginScreen from './screens/loginScreen';
import HomeScreen from './screens/homeScreen';
import InfoScreen from './screens/infoScreen';
import NavigationScreen from './screens/navigationScreen';


export function registerScreens() {
  Navigation.registerComponent('buylocal.loginScreen', () => LoginScreen);
  Navigation.registerComponent('buylocal.homeScreen', () => HomeScreen);
  Navigation.registerComponent('buylocal.infoScreen', () => InfoScreen);
  Navigation.registerComponent('buylocal.navigationScreen', () => NavigationScreen);

}

export function registerScreenVisibilityListener() {
  new ScreenVisibilityListener({
    willAppear: ({screen}) => console.log(`Displaying screen ${screen}`),
    didAppear: ({screen, startTime, endTime, commandType}) => console.log('screenVisibility', `Screen ${screen} displayed in ${endTime - startTime} millis [${commandType}]`),
    willDisappear: ({screen}) => console.log(`Screen will disappear ${screen}`),
    didDisappear: ({screen}) => console.log(`Screen disappeared ${screen}`)
  }).register();
}
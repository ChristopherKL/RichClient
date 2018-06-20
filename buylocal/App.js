import {Platform} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {registerScreens, registerScreenVisibilityListener} from './src/navCompReg';
import configureStore from './src/redux/configureStore';
import { Provider } from 'react-redux';


const store = configureStore();

// screen related book keeping
registerScreens(store, Provider);
registerScreenVisibilityListener();


const tabs = [{
    label: 'Navigation',
    screen: 'buylocal.navigationScreen',
    title: 'Navigation',
    icon: require('./img/menu.png')
  },
  {
    label: 'Home',
    screen: 'buylocal.homeScreen',
    title: 'Home',
    icon: require('./img/home.png')
  },
  {
    label: 'Info',
    screen: 'buylocal.infoScreen',
    title: 'Info',
    icon: require('./img/info.png')
  }

];

// this will start our app
Navigation.startTabBasedApp({
  tabs,
  animationType: Platform.OS === 'ios' ? 'slide-down' : 'fade',
  tabsStyle: {
    tabBarBackgroundColor: '#003a66',
    tabBarButtonColor: '#ffffff',
    tabBarSelectedButtonColor: '#ff505c',
    tabFontFamily: 'BioRhyme-Bold',
  },
  appStyle: {
    tabBarBackgroundColor: '#003a66',
    navBarButtonColor: '#ffffff',
    tabBarButtonColor: '#ffffff',
    navBarTextColor: '#ffffff',
    tabBarSelectedButtonColor: '#ff505c',
    navigationBarColor: '#003a66',
    navBarBackgroundColor: '#003a66',
    statusBarColor: '#002b4c',
    tabFontFamily: 'BioRhyme-Bold',
    initialTabIndex: 1
  }
});
import React from 'react';
import { Root } from 'native-base';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import Home from './screens/home';
import SideBar from './screens/sidebar';
import VoiceRecognition from './screens/voiceRecognition';
import cloudWords from './screens/cloudWords';

const Drawer = createDrawerNavigator(
  {
    Home: { screen: Home },
    VoiceRecognition: { screen: VoiceRecognition },
    Game: { screen: cloudWords },
  },
  {
    initialRouteName: 'Home',
    contentOptions: {
      activeTintColor: '#e91e63',
      activeBackgroundColor:'#e91e63',
    },
    drawerType:'slide',
    contentComponent: SideBar,
  },
);

const AppNavigator = createStackNavigator(
  {
    Drawer: { screen: Drawer },
  },
  {
    initialRouteName:"Drawer",
    headerMode:"none",
  },
);

const AppContainer = createAppContainer(AppNavigator);

export default () => (
  <Root>
    <AppContainer/>
  </Root>
);

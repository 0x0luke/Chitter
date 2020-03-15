import React from 'react';
import { createAppContainer, createNavigationContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import WelcomeScreen from './screens/WelcomeScreen'
import Login from './screens/Login'
import Register from './screens/Register'
//import HomePage from './screens/HomePage'

// https://www.github.com/0x0luke/Chitter 

const AppStackNav = createStackNavigator({
  Home:{
    screen: WelcomeScreen
  },
  Login:{
    screen: Login
  },
  Register:{
    screen: Register
  },
 /* HomePage:{
    screen: HomePage
  }*/
  },
  {
    initialRouteParams: WelcomeScreen,
    headerMode: 'none',
  });

// crafts an app container so we can navigate around the application
const AppContainer = createAppContainer(AppStackNav);

//tells react to spawn the app container defined above.
export default AppContainer;
import React from 'react';
import { createAppContainer, createNavigationContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import WelcomeScreen from './screens/WelcomeScreen'
import Login from './screens/Login'
import Register from './screens/Register'
import HomePage from './screens/HomePage'
import PostChit from './screens/PostChit'
import LandingPage from './screens/LandingPage'
import AccountEdit from './screens/AccountEdit'
import Search from './screens/Search'

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
 HomePage:{
    screen: HomePage
  },
  PostChit:{
    screen: PostChit
  },
  LandingPage:{
    screen: LandingPage
  },
  Search:{
    screen: Search
  },
  AccountEdit:{
    screen: AccountEdit
  },
  },
  {
    initialRouteParams: WelcomeScreen,
    headerShown: false,
  });

// crafts an app container so we can navigate around the application
const AppContainer = createAppContainer(AppStackNav);

//tells react to spawn the app container defined above.
export default AppContainer;
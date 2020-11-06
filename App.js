import React from 'react';
import { LogBox } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import StartScreen from './screens/StartScreen';
import ActivitySelectScreen from './screens/ActivitySelectScreen';
import Screen1 from './screens/Screen1';
import Screen2 from './screens/Screen2';
import Screen3 from './screens/Screen3';
import Screen4 from './screens/Screen4';

LogBox.ignoreLogs(['Setting a timer']);

export default class App extends React.Component{
  render(){
    return( 
      <AppContainer />
    )
  }
}

const switchNavigator = createSwitchNavigator({
  StartScreen: {screen: StartScreen},
  SelectScreen: {screen: createStackNavigator({
    ActivitySelectScreen: {screen: ActivitySelectScreen, navigationOptions: {headerShown: false}},
    Screen1: {screen: Screen1},
    Screen2: {screen: Screen2},
    Screen3: {screen: Screen3},
    Screen4: {screen: Screen4},
  })},
})

const AppContainer = createAppContainer(switchNavigator);
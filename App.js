import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { Transition } from 'react-native-reanimated';
import StartScreen from './screens/StartScreen';
import ActivitySelectScreen from './screens/ActivitySelectScreen';
import Screen1 from './screens/Screen1';
import Screen2 from './screens/Screen2';
import Screen3 from './screens/Screen3';
import Screen4 from './screens/Screen4';

export default class App extends React.Component{
  constructor(){
    super();
    this.state={
      fontsLoaded: false,
    }
  }
  
  async loadFonts(){
    await Font.loadAsync({
      'PoppinsBold': require('./assets/fonts/Poppins-Bold.ttf'),
      'Poppins': require('./assets/fonts/Poppins-Medium.ttf'),
      'SFBold': require('./assets/fonts/SF-UI-Display-Bold.otf'),
    });
    this.setState({fontsLoaded: true})
  }

  componentDidMount() {
    this.loadFonts();
  }

  render(){
    if(this.state.fontsLoaded){
      return  <AppContainer />   
    }
    else{
      return <AppLoading />
    }
  }
}

const switchNavigator = createAnimatedSwitchNavigator({
  StartScreen: {screen: StartScreen},
  SelectScreen: {screen: createStackNavigator({
    ActivitySelectScreen: {screen: ActivitySelectScreen, navigationOptions: {headerShown: false}},
    Screen1: {screen: Screen1, navigationOptions: {headerShown: false, gestureEnabled: false}},
    Screen2: {screen: Screen2, navigationOptions: {headerShown: false, gestureEnabled: false}},
    Screen3: {screen: Screen3, navigationOptions: {headerShown: false, gestureEnabled: false}},
    Screen4: {screen: Screen4, navigationOptions: {headerShown: false, gestureEnabled: false}},
  })},
}, {
  transition: (
    <Transition.Together>
      <Transition.Out type="slide-top" durationMs={500} interpolation="easeIn" />
      <Transition.In type="slide-bottom" durationMs={500} interpolation="easeIn" />
    </Transition.Together>
  ),
})

const AppContainer = createAppContainer(switchNavigator);
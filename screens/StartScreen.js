import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class StartScreen extends React.Component {
  render(){
    return (
      <View style={styles.container}>
        <TouchableOpacity style={{borderWidth: 3, borderRadius: 50, padding: 7, width: '60%', alignItems: 'center'}}
        onPress={()=>{this.props.navigation.navigate("ActivitySelectScreen")}}>
          <Text>Start Quiz</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

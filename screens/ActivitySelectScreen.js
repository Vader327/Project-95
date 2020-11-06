import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class ActivitySelectScreen extends React.Component {
  render(){
    return (
      <View style={styles.container}>
        <Text style={{marginVertical: 50}}>Select Activity</Text>
        <TouchableOpacity style={styles.button} onPress={()=>{this.props.navigation.navigate("Screen1")}}>
          <Text>Activity 1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={()=>{this.props.navigation.navigate("Screen2")}}>
          <Text>Activity 2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={()=>{this.props.navigation.navigate("Screen3")}}>
          <Text>Activity 3</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={()=>{this.props.navigation.navigate("Screen4")}}>
          <Text>Activity 4</Text>
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
  button:{
    borderWidth: 3,
    borderRadius: 50,
    padding: 7,
    width: '60%',
    alignItems: 'center',
    margin: 10,
  }
});

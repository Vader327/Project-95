import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, PanResponder, Animated } from 'react-native';
import Draggable from "../components/Draggable";

export default class Screen2 extends React.Component {
  constructor(){
    super();
    this.state={
      doneArr: [],
      ciPos: {x: 0, y: 0},
      trPos: {x: 0, y: 0},
      sqPos: {x: 0, y: 0},
      stPos: {x: 0, y: 0},
    }
    this.ciOp = new Animated.Value(1);
    this.sqOp = new Animated.Value(1);
    this.trOp = new Animated.Value(1);
    this.stOp = new Animated.Value(1);
    this.bttonScale = new Animated.Value(1);
  }

  measure=()=>{
    setTimeout(()=>{
      this.triangle.measure((x, y, width, height, pageX, pageY)=>{
        this.setState({trPos: {...this.state.trPos, x: pageX, y: pageY}})
      })
      this.star.measure((x, y, width, height, pageX, pageY)=>{
        this.setState({stPos: {...this.state.stPos, x: pageX, y: pageY}})
      })
      this.circle.measure((x, y, width, height, pageX, pageY)=>{
        this.setState({ciPos: {...this.state.ciPos, x: pageX, y: pageY}})
      })
      this.square.measure((x, y, width, height, pageX, pageY)=>{
        this.setState({sqPos: {...this.state.sqPos, x: pageX, y: pageY}})
      })}, 0);
  }

  componentDidMount(){
    this.measure();
  }

  update=(res, shape)=>{
    var doneArr = this.state.doneArr;
    doneArr.push(res);
    this.setState({doneArr: doneArr}, ()=>{
      Animated.timing(this[shape + "Op"], {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(()=>{
        if(doneArr.length==4){
          Animated.loop(
            Animated.sequence([
              Animated.timing(this.bttonScale, {
                toValue: 1.5,
                duration: 500,
                useNativeDriver: false,
              }),
              Animated.spring(this.bttonScale, {
                toValue: 1,
                useNativeDriver: false,
                duration: 500,
                friction: 2,
                tension: 70,
              })
            ]), {iterations: 2}
          ).start();
        }
      });
    });
  }

  render(){
    return(
      <View style={{height: '100%', backgroundColor: '#1c77ff'}}>
        <Image source={require('../assets/logo.png')} style={{width: 80, height: 80, alignSelf: 'center', marginTop: 20}} />
        <Text style={styles.description}>Match The Similar Colors</Text>

        <View style={{flexDirection: 'row'}}>
          <View style={styles.container}>
            <Draggable source={require("../assets/fruits/apple.png")}
            onDone={(res)=>{this.update(res, "ci")}} objPos={this.state.ciPos} />

            <Draggable source={require('../assets/fruits/orange.png')}
            onDone={(res)=>{this.update(res, "sq")}} objPos={this.state.sqPos} />

            <Draggable source={require('../assets/fruits/grapes.png')}
            onDone={(res)=>{this.update(res, "tr")}} objPos={this.state.trPos} />

            <Draggable source={require('../assets/fruits/banana.png')}
            onDone={(res)=>{this.update(res, "st")}} objPos={this.state.stPos} />
          </View>

          <View style={{width: 2, height: '80%', backgroundColor: 'white', alignSelf: 'center', borderRadius: 50, zIndex: -1}} />

          <View style={styles.container}>            
            <Animated.Image ref={view=>{this.square=view}} source={require('../assets/fruits/orange_c.png')}
            style={[styles.shape, {opacity: this.sqOp}]} />            

            <Animated.Image ref={view=>{this.star=view}} source={require('../assets/fruits/yellow.png')}
            style={[styles.shape, {opacity: this.stOp}]} />

            <Animated.Image ref={view=>{this.circle=view}} source={require('../assets/fruits/red.png')}
            style={[styles.shape, {opacity: this.ciOp}]} />

            <Animated.Image ref={view=>{this.triangle=view}} source={require('../assets/fruits/green.png')}
            style={[styles.shape, {opacity: this.trOp}]} />
          </View>
        </View>

        <TouchableOpacity style={[styles.button, {position: 'absolute', bottom: 10, left: 10, width: 100}]}
        onPress={()=>{this.props.navigation.navigate("ActivitySelectScreen")}} >
          <Text style={styles.buttonText}>Home</Text>
        </TouchableOpacity>

        <Animated.View style={{position: 'absolute', bottom: 10, right: 10, width: 100, transform: [{scale: this.bttonScale}]}}>
          <TouchableOpacity style={styles.button} onPress={()=>{this.props.navigation.navigate("Screen3")}} >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button:{
    borderWidth: 3,
    borderRadius: 50,
    borderColor: 'white',
    padding: 7,
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'white',  },
  buttonText:{
    color: '#1c77ff',
    fontSize: 18,
    fontFamily: 'PoppinsBold',
  },
  description:{
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'PoppinsBold',
    alignSelf: 'center'
  },
  shape:{
    width: 50,
    height: 50,
    alignSelf: 'center',
    margin: Dimensions.get("window").width/13,
    zIndex: -100,
  },
  container:{
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flex: 1,
    flexWrap: 'wrap',
  }
});
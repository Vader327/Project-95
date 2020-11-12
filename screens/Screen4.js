import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, Modal, Animated } from 'react-native';
import { color } from 'react-native-reanimated';
import Draggable from "../components/Draggable";

export default class Screen4 extends React.Component {
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

  UNSAFE_componentWillMount(){
    this.doneIMg1 = (<Image source={require('../assets/done.gif')} style={{width: 70, height: 70, alignSelf: 'center'}} />);
    this.doneIMg2 = (<Image source={require('../assets/done.gif')} style={{width: 70, height: 70, alignSelf: 'center', transform: [{rotateY: "180deg"}]}} />);
  }

  update=(res, shape)=>{
    var doneArr = this.state.doneArr;
    doneArr.push(res);
    this.setState({doneArr: doneArr}, ()=>{
      Animated.timing(this[shape + "Op"], {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  }

  modal=()=>(
    <Modal animationType="slide" transparent={true} visible={this.state.doneArr.length==4}>
				<View style={styles.modalContainer}>
          <Text style={[styles.description, {fontSize: 30, color: '#faae19', marginTop: 10}]}>You Won!</Text>

          <TouchableOpacity style={[styles.button, {backgroundColor: '#faae19', position: 'relative', bottom: null, left: null, alignSelf: 'center', margin: 20}]}
            onPress={()=>{this.setState({doneArr: []}); this.props.navigation.navigate("ActivitySelectScreen")}} >
              <Text style={[styles.buttonText, {color: 'white'}]}>Finish</Text>
          </TouchableOpacity>

          <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-evenly'}}>
            {this.doneIMg1}
            {this.doneIMg2}
          </View>
				</View>
			</Modal>
  )

  render(){
    return(
      <View style={{height: '100%', backgroundColor: '#f7d794'}}>
        <Image source={require('../assets/logo.png')} style={{width: 80, height: 80, alignSelf: 'center', marginTop: 20}} />
        <Text style={styles.description}>Match the halves</Text>

        {this.modal()}

        <View style={{flexDirection: 'row'}}>
          <View style={styles.container}>
            <Draggable source={require("../assets/halves/bus1.png")}
            onDone={(res)=>{this.update(res, "ci")}} objPos={this.state.ciPos} />

            <Draggable source={require('../assets/halves/plane1.png')}
            onDone={(res)=>{this.update(res, "sq")}} objPos={this.state.sqPos} />

            <Draggable source={require('../assets/halves/train1.png')}
            onDone={(res)=>{this.update(res, "tr")}} objPos={this.state.trPos} />

            <Draggable source={require('../assets/halves/tree1.png')}
            onDone={(res)=>{this.update(res, "st")}} objPos={this.state.stPos} />
          </View>

          <View style={{width: 2, height: '80%', backgroundColor: 'white', alignSelf: 'center', borderRadius: 50, zIndex: -1}} />

          <View style={styles.container}>            
            <Animated.Image ref={view=>{this.square=view}} source={require('../assets/halves/plane2.png')}
            style={[styles.shape, {opacity: this.sqOp}]} />            

            <Animated.Image ref={view=>{this.star=view}} source={require('../assets/halves/tree2.png')}
            style={[styles.shape, {opacity: this.stOp}]} />

            <Animated.Image ref={view=>{this.circle=view}} source={require('../assets/halves/bus2.png')}
            style={[styles.shape, {opacity: this.ciOp}]} />

            <Animated.Image ref={view=>{this.triangle=view}} source={require('../assets/halves/train2.png')}
            style={[styles.shape, {opacity: this.trOp}]} />
          </View>
        </View>

        <TouchableOpacity style={styles.button}
        onPress={()=>{this.props.navigation.navigate("ActivitySelectScreen")}} >
          <Text style={styles.buttonText}>Home</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button:{
    borderRadius: 50,
    padding: 7,
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 10,
    left: 10,
    width: 100,
  },
  buttonText:{
    color: '#f7d794',
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
  },
  modalContainer:{
    marginTop: Dimensions.get("window").height/4,
		top: '5%',
		width: '80%',
    height: '40%',
    padding: 10,
		alignSelf: 'center',
		borderRadius: 10,
		backgroundColor: '#ffffff',
		shadowColor: "#000",
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.30,
    shadowRadius: 10,
    elevation: 16,
	},
});
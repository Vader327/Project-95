import React from 'react';
import { StyleSheet, Dimensions, PanResponder, Animated } from 'react-native';

export default class Draggable extends React.Component {
  constructor(){
    super();
    this.state={
      objOpacity: new Animated.Value(1),
      animObjPos: new Animated.ValueXY(),
    }
    this.objPos = null;
    this.val={x: 0, y: 0};
    this.state.animObjPos.addListener((value)=>this.val=value);

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gesture) => true,
      onPanResponderMove: Animated.event([
        null, {dx: this.state.animObjPos.x, dy: this.state.animObjPos.y}
      ], {useNativeDriver: false}),
      onPanResponderRelease: (e, gesture) => {
        if(this.isDropArea(gesture)){
          this.props.onDone(true);
          Animated.timing(this.state.objOpacity,{
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }).start();
        }
        else{
          Animated.spring(this.state.animObjPos, {
            toValue: {x: 0, y: 0},
            friction: 5,
            useNativeDriver: true,
          }).start();
        }
      }
    }); 
  }

  componentDidMount(){
    this.objPos = this.props.objPos;
  }
  componentDidUpdate(){
    this.objPos = this.props.objPos;
  }

  isDropArea(gesture){
    var objPos = this.objPos;

    if(gesture.moveX*2>(objPos.x - 100) && gesture.moveX*2<(objPos.x + 100)){
      return (gesture.moveY>(objPos.y - 100) && gesture.moveY<(objPos.y + 100) && 
      gesture.moveX*2>(objPos.x - 100) && gesture.moveX*2<(objPos.x + 100));
    }
    else{
      return (gesture.moveY>(objPos.y - 100) && gesture.moveY<(objPos.y + 100) && 
      gesture.moveX>(objPos.x - 100) && gesture.moveX<(objPos.x + 100));
    }
  }

  render(){
    const panStyle={
      transform: this.state.animObjPos.getTranslateTransform(),
      opacity: this.state.objOpacity,
    }
    return(
      <Animated.Image {...this.panResponder.panHandlers} style={[panStyle, styles.shape]}
      ref={view=>{this.obj=view}} source={this.props.source} />
    );
  }
}

const styles = StyleSheet.create({
  shape:{
    width: 60,
    height: 60,
    alignSelf: 'center',
    margin: Dimensions.get("window").width/13,
  },
});
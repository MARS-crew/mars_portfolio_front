import React from 'react';
import {View, StyleSheet, Dimensions, Image} from 'react-native';
import LottieView from 'lottie-react-native';
import {useSelector} from "react-redux";
import type {RootState} from "../../redux/RootReducer";

const Splash = ({ isSplashVisible }) => {
  if (!isSplashVisible) return null;
  //   const uiRenderer = useSelector((state: RootState) => state.uiRender);

    // if (!uiRenderer.isSplashVisible) return null;

    return (
    <View>
      <LottieView
          autoPlay
          loop={false}
          source={require('../../assets/lottie/Splash.json')}
          style={styles.lottie}
      />
    </View>
  );
};

// get the dimensions of the screen
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const styles = StyleSheet.create({
  // view lottie animation
  lottie: {
    width: width,
    height: height,
      // justifyContent: 'center'
  },
});

export default Splash;

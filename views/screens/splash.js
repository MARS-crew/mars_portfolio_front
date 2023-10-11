import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';

const Splash = ({ isSplashVisible }) => {
  if (!isSplashVisible) return null;

  return (
    <View>
      <LottieView
        source={require('../../assets/lottie/spaceship.json')}
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
    width: width * 0.5,
    height: height * 0.5,
  },
});

export default Splash;

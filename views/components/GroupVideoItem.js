import React from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Image,
  Dimensions,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import MedalItem from './MedalItem';

const {width, height} = Dimensions.get('window');
const widthCol = width / 2;
const heightCol = height / 2;
const GroupVideoItem = ({medal, src}) => {
  if (medal == 'y') {
    return (
      <TouchableOpacity style={styles.outline}>
        <ImageBackground source={src} style={styles.manyImage}>
          <MedalItem />
        </ImageBackground>
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity style={styles.outline}>
        <ImageBackground source={src} style={styles.manyImage} />
      </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  outline: {
    width: width / 2,
    height: height / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },

  manyImage: {resizeMode: 'cover', width: '104%', height: '100%'},
});

export default GroupVideoItem;

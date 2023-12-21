import React from 'react';
import {View, StyleSheet, ImageBackground, Dimensions} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import MedalItem from './MedalItem';

const {width, height} = Dimensions.get('window');
const widthCol = width / 2;
const heightCol = height / 2;
const GroupVideoItem = ({medal, src}) => {
  if (medal == 'y') {
    return (
      <View style={styles.outline}>
        <TouchableOpacity>
          <View style={styles.midLine}>
            <ImageBackground source={src} style={styles.manyImage}>
              <MedalItem />
            </ImageBackground>
          </View>
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <View style={styles.outline}>
        <TouchableOpacity>
          <View style={styles.midLine}>
            <ImageBackground source={src} style={styles.manyImage} />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  outline: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  midLine: {
    width: widthCol,
    height: heightCol,
    justifyContent: 'center',
    alignItems: 'center',
  },
  manyImage: {
    width: width / 1.9,
    height: height / 1.9,
  },
});

export default GroupVideoItem;

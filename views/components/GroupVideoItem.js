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
    flexDirection: 'row',
    justifyContent: 'center',
    border: 0,
  },
  midLine: {
    justifyContent: 'center',
    alignItems: 'center',
    border: 0,
  },
  manyImage: {
    width: widthCol,
    height: heightCol,
    borderColor: '#000000',
    borderStyle: 'solid',
    border: 0,
  },
});

export default GroupVideoItem;

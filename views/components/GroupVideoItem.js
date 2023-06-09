import React from 'react';
import {View, StyleSheet, ImageBackground} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import MedalItem from './MedalItem';

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
    width: 195,
    height: 390,
    borderColor: '#000000',
    borderStyle: 'solid',
    border: 0,
  },
});

export default GroupVideoItem;

import React, { useEffect } from 'react';
import { View, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import MedalItem from './MedalItem';
import { useIndexContext } from '../../IndexContext';

const { width, height } = Dimensions.get('window');
const widthCol = width / 2;
const heightCol = height / 2;
const GroupVideoItem = ({ id, medal, src }) => {
  const { currentIndex, changeIndex, horizontalIndex, changeHorizontalIndex, dataIndex, changeDataIndex, selectedMemId, changeSelectedMemId } = useIndexContext();

  const handlePress = () => {
    if (selectedMemId !== id) {
      changeSelectedMemId(id);
      if (horizontalIndex !== 2) {
        changeHorizontalIndex(2);
      }
    }
  }

  return (
    <View style={styles.outline}>
      <TouchableOpacity onPress={handlePress}>
        <View style={styles.midLine}>
          <ImageBackground source={src} style={styles.manyImage}>
            {medal === 'y' ? (
              <MedalItem />
            ) : null}
          </ImageBackground>
        </View>
      </TouchableOpacity>
    </View>
  );
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

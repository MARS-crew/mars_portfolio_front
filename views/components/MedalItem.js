import React from 'react';
import {View, StyleSheet, Image} from 'react-native';

const MedalItem = () => {
  return (
    <View>
      <Image
        source={require('../../assets/images/Medal.png')}
        style={styles.medal}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  medal: {
    position: 'absolute',
    width: 40,
    height: 40,
    top: 15,
    right: 5,
  },
});
export default MedalItem;

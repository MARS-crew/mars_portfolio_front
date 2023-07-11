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
    width: 30,
    height: 43.16,
    //right: 7,
    top: 15,
    left: 150,
  },
});
export default MedalItem;

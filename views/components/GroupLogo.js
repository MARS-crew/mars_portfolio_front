import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';

const GroupLogo = () => {
  return (
    <View>
      <View>
        <Image
          source={require('../../assets/images/GroupLogo.png')}
          style={styles.image}
          resizeMode="stretch"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    // position: 'absolute',
    width: 70,
    height: 70,
    resizeMode: 'contain',
    left: 20,
    top: 25,
  },
  text: {
    // position: 'absolute',
    color: 'white',
    left: 95,
    top: -5,
    fontSize: 24,
  },
});

export default GroupLogo;

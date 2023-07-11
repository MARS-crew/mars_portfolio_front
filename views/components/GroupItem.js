import React from 'react';
import {Text, View, StyleSheet, Image, ImageBackground} from 'react-native';

import GroupLogo from './GroupLogo';

const GroupItem = ({id, src}) => {
  return (
    <View>
      <View>
        <ImageBackground source={src} style={styles.image}>
          <GroupLogo />
          <Text style={styles.text}>{id}기</Text>
        </ImageBackground>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 400,
    height: 800,
    resizeMode: 'contain',
  },
  text: {
    color: 'white',
    left: 95,
    top: -5,
    fontSize: 24,
  },
});

export default GroupItem;

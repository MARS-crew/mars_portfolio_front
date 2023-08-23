import React from 'react';
import {Text, View, StyleSheet, Image, ImageBackground} from 'react-native';

import GroupLogo from './GroupLogo';
import LoginItem from './LoginItem';

const GroupItem = ({id, src}) => {
  return (
    <View>
      <ImageBackground source={src} style={styles.image}>
        {/* <GroupLogo style={styles.logo} /> */}
        {/* <Text style={styles.text}>{id}기</Text> */}
        {/* <LoginItem style={styles.login} /> */}
      </ImageBackground>
      {/* <GroupLogo style={styles.logo} /> */}
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
    position: 'absolute',
    color: 'white',
    left: 95,
    top: -5,
    fontSize: 24,
  },
  login: {
    position: 'absolute',
  },
  logo: {
    position: 'absolute',
  },
});

export default GroupItem;

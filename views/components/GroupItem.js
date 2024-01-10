import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  ImageBackground,
} from 'react-native';

import GroupLogo from './GroupLogo';
import LoginItem from './LoginItem';
import FAB from './FloatingMenu';

const GroupItem = ({id, src, token}) => {
  return (
    <View style={styles.itemArea}>
      <ImageBackground source={src} style={styles.image}>
        <GroupLogo />
        <Text style={styles.text}>{id}기</Text>
      </ImageBackground>

      <LoginItem token={token} />
    </View>
  );
};

const styles = StyleSheet.create({
  itemArea: {
    flex: 1,
  },

  image: {
    left: -5,
    width: Dimensions.get('window').width * 1.03,
    height: Dimensions.get('window').height / 1,
  },
  text: {
    color: 'white',
    left: 95,
    top: -5,
    fontSize: 24,
  },
});

export default GroupItem;

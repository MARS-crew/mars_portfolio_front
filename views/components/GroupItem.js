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

const GroupItem = ({id, src}) => {
  return (
    <View>
      <View>
        <ImageBackground source={src} style={styles.image}>
          <GroupLogo />
          <Text style={styles.text}>{id}기</Text>
          <LoginItem />
        </ImageBackground>
      </View>
      <FAB />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: Dimensions.get('window').width / 1,
    height: Dimensions.get('window').height / 1,
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

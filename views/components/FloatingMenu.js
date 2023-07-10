import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Album} from '../screens/Album';
import {FloatingAction} from 'react-native-floating-action';
import {useNavigation} from '@react-navigation/native';

const actions = [
  {
    // text: 'Gallery',
    icon: require('../../assets/images/gallery.png'),
    name: 'bt_gallery',
    position: 2,
  },
  {
    // text: 'Share',
    icon: require('../../assets/images/share.png'),
    name: 'bt_share',
    position: 1,
  },
  {
    // text: 'Home',
    icon: require('../../assets/images/home.png'),
    name: 'bt_home',
    position: 3,
  },
  {
    // text: 'Help',
    icon: require('../../assets/images/help.png'),
    name: 'bt_help',
    position: 4,
  },
];

const FloatingMenu = () => {
  const navigation = useNavigation();

  const handleItemPress = name => {
    if (name === 'bt_gallery') {
      navigation.navigate('Album');
    } else if (name === 'bt_share') {
      navigation.navigate('Share');
    } else if (name === 'bt_home') {
      navigation.navigate('Home');
    } else if (name === 'bt_help') {
      navigation.navigate('Help');
    }
  };

  return (
    <View>
      <FloatingAction
        animated={true}
        actions={actions}
        position="right"
        color="#072AC8"
        actionsPaddingTopBottom={10}
        floatingIcon={require('../../assets/images/hamburger.png')}
        onPressItem={handleItemPress}
      />
    </View>
  );
};

export default FloatingMenu;

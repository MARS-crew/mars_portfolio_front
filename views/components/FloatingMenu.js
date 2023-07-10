import React from 'react';
import {View, StyleSheet} from 'react-native';
import {FloatingAction} from 'react-native-floating-action';

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
  return (
    <View>
      <FloatingAction
        animated={true}
        actions={actions}
        position="right"
        color="#072AC8"
        actionsPaddingTopBottom={10}
        floatingIcon={require('../../assets/images/hamburger.png')}
        onPressItem={name => {
          console.log(`selected button: ${name}`);
        }}
      />
    </View>
  );
};

export default FloatingMenu;

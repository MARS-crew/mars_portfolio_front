import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {useNavigation, CommonActions} from '@react-navigation/native';
import ActionButton from 'react-native-action-button';

const styles = StyleSheet.create({
  actionButtonIcon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
});
const FloatingActionMenu = yourData => {
  const navigation = useNavigation();

  const handleItemPress = iconName => {
    if (iconName === 'bt_gallery') {
      navigation.navigate('Album');
    } else if (iconName === 'bt_share') {
      navigation.navigate('Share');
    } else if (iconName === 'bt_home') {
      navigation.dispatch(
        CommonActions.reset({
          routes: [{name: 'Home'}],
        }),
      );
    } else if (iconName === 'bt_help') {
      navigation.navigate('Help', {propName: yourData});
      console.log(yourData);
    }
  };

  return (
    <ActionButton
      // style={styles.floatingActionMain}
      position="right"
      offsetX={40}
      offsetY={100}
      hideShadow={false}
      buttonColor="#072AC8">
      <ActionButton.Item
        buttonColor="#F5F5F5"
        onPress={() => handleItemPress('bt_help')}>
        <Image
          source={require('../../assets/images/help.png')}
          style={styles.actionButtonIcon}
        />
      </ActionButton.Item>
      <ActionButton.Item
        buttonColor="#F5F5F5"
        onPress={() => handleItemPress('bt_home')}>
        <Image
          source={require('../../assets/images/home.png')}
          style={styles.actionButtonIcon}
        />
      </ActionButton.Item>
      <ActionButton.Item
        buttonColor="#F5F5F5"
        onPress={() => handleItemPress('bt_gallery')}>
        <Image
          source={require('../../assets/images/gallery.png')}
          style={styles.actionButtonIcon}
        />
      </ActionButton.Item>
      <ActionButton.Item
        buttonColor="#F5F5F5"
        onPress={() => handleItemPress('bt_share')}>
        <Image
          source={require('../../assets/images/share.png')}
          style={styles.actionButtonIcon}
        />
      </ActionButton.Item>
    </ActionButton>
  );
};

export default FloatingActionMenu;

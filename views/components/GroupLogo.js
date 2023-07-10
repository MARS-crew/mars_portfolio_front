import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';

const GroupLogo = () => {
  return (
    <View>
      <View>
        <Image source={require('../../assets/images/GroupLogo.png')} style={styles.image} resizeMode="stretch"/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    image: {
        width: 70,
        height: 70,
        resizeMode: 'contain',
        left: 20,
        top: 25,
      },
  });

export default GroupLogo;
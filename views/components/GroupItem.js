import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';

const GroupItem = ({id, src}) => {
  return (
    <View>
      <View style={styles.title}>
        <Text style={styles.text}>{id}기 입니다만</Text>
      </View>
      <View>
        <Image source={src} style={styles.image} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 337,
    height: 548,
    resizeMode: 'contain',
    left: 21,
    top: 100,
  },
  title: {
    backgroundColor: '#F8DFC0',
    alignItems: 'center',
    width: 261,
    height: 69,
    left: 57,
    top: 115,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 20,
    top: 22,
  },
});

export default GroupItem;

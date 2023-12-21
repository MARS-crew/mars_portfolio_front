import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Image} from 'react-native';

const LoginItem = () => {
  return (
    <View style={styles.itemArea}>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.text}>로그인</Text>
        <Image
          source={require('../../assets/images/LoginNextItem.png')}
          style={styles.image}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  itemArea: {
    flex: 1,
  },
  button: {
    width: 104,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderStyle: 'solid',
    bottom: 25,
    right: 20,
    borderRadius: 24,
    borderColor: 'white',
    border: 2,
    position: 'absolute',
    flexDirection: 'row',
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
});

export default LoginItem;

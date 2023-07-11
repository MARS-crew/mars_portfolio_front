import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Image} from 'react-native';

const LoginItem = () => {
  return (
    <View>
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
  button: {
    width: 104,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderStyle: 'solid',
    top: 580,
    left: 250,
    borderRadius: 24,
    borderColor: 'white',
    border: 2,
    flexDirection: 'row',
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
});

export default LoginItem;

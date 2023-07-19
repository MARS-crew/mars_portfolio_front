import React from 'react';
import {TouchableOpacity, Text, StyleSheet, Image} from 'react-native';

const LoginButton = props => {
  const handleLoginPress = () => {
    //navigation && navigation.navigate('Login');
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
      <Image source={props.src} style={styles.image} />
      <Text style={styles.title}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 300,
    height: 20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFF',
    borderWidth: 2,
    borderStyle: 'solid',
    marginBottom: 10,
    flexDirection: 'row',
  },
  image: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginRight: 50,
  },
  title: {
    marginRight: 50,
    marginLeft: 20,
    fontSize: 15,
  },
});

export default LoginButton;

import React from 'react';
import {TouchableOpacity, Text, StyleSheet, Image, View} from 'react-native';
import {color} from 'react-native-reanimated';

const LoginButton = props => {
  return (
    <TouchableOpacity style={[styles.button, {backgroundColor: props.color}]}>
      <Image source={props.src} style={styles.image} />
      <View style={styles.textAlign}>
        <Text style={[styles.title, {color: props.textColor}]}>
          {props.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 335,
    height: 50,
    //flex: 1,
    alignItems: 'center',
    //justifyContent: 'center',
    backgroundColor: color,
    borderWidth: 0,
    borderStyle: 'solid',
    marginBottom: 15,
    flexDirection: 'row',
    borderRadius: 50,
    elevation: 5,
  },
  image: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    //marginRight: 0,
    left: 15,
  },
  title: {
    marginRight: 50,
    marginLeft: 20,
    fontSize: 15,
    justifyContent: 'center',
    left: 60,
  },
});

export default LoginButton;

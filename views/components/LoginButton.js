import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  View,
} from 'react-native';

const LoginButton = props => {
  const chooseOkTextStyle = {
    color: props.color == '' ? '##F5F5F5' : props.color, // 프롭스 값으로 텍스트 색상 설정
  };
  const chooseOkBtnStyle = {
    backgroundColor: props.background == '' ? 'black' : props.background, // 프롭스 값으로 텍스트 색상 설정
  };
  return (
    <View>
      <TouchableOpacity
        style={[styles.button, chooseOkBtnStyle]}
        onPress={props.handleLoginPress}>
        <Image source={props.src} style={styles.image} />
        <Text style={[styles.title, chooseOkTextStyle]}>{props.title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    borderRadius: 25,
    width: Dimensions.get('window').width / 1.1,
    paddingVertical: 15,
    flexDirection: 'row',
  },
  image: {
    width: 20,
    height: 20,
    position: 'absolute',
    left: 15,
  },
  title: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 16,
    width: 124,
    height: 21,
  },
});

export default LoginButton;

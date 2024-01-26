import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  View,
} from 'react-native';
import {Shadow} from 'react-native-shadow-2';

const LoginButton = props => {
  const shadowColor = 'rgba(151, 151, 151, 0.36)';
  const chooseOkTextStyle = {
    color: props.color == '' ? '#F5F5F5' : props.color, // 프롭스 값으로 텍스트 색상 설정
  };

  const chooseOkBtnStyle = {
    backgroundColor: props.background, // 프롭스 값으로 텍스트 색상 설정
    borderWidth: props.background == 'white' ? 1 : 0,
    borderColor: '#F5F5F5',
  };
  return (
    <View>
      <Shadow
        style={{
          width: 335,
          height: 50,
          marginBottom: 18,
          borderRadius: 15,
        }}
        distance={3}
        Color={shadowColor}
        offset={[1, 1]}>
        <TouchableOpacity
          style={[styles.button, chooseOkBtnStyle]}
          onPress={props.handleLoginPress}>
          <Image source={props.src} style={styles.image} />
          <Text style={[styles.title, chooseOkTextStyle]}>{props.title}</Text>
        </TouchableOpacity>
      </Shadow>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    paddingVertical: 12,
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
    fontWeight: '900',
    fontSize: 16,
    flex: 1,
  },
});

export default LoginButton;

import React from 'react';
import {StyleSheet, View, Image, Input} from 'react-native';
import LoginButton from '../components/LoginButton';

const Login = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Input inputType={'id'} placeholder={'아이디'} />
      <Input inputType={'password'} placeholder={'비밀번호'} />
    </View>
  );
};

function Main({navigation}) {
  const handleLoginPress = () => {
    navigation && navigation.navigate('Login');
  };

  return (
    <View>
      <View style={styles.contain}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.image}
        />
        <LoginButton
          title={'페이스북'}
          src={require('../../assets/images/facebook.png')}
        />
        <LoginButton
          title={'구글'}
          src={require('../../assets/images/google.png')}
        />
        <LoginButton
          title={'네이버'}
          src={require('../../assets/images/naver.png')}
        />
        <LoginButton
          title={'카카오'}
          src={require('../../assets/images/kakao.png')}
        />
        <View style={styles.marginView} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  contain: {
    backgroundColor: '#FFFF',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    marginBottom: 0,
  },
  image: {
    width: 400,
    height: 400,
    resizeMode: 'contain',
  },
  marginView: {
    margin: 40,
  },
});

export default Main;

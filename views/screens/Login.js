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
    //navigation && navigation.navigate('Login');
  };

  return (
    <View>
      <View style={styles.contain}>
        <Image
          source={require('../../assets/images/logoLogin.png')}
          style={styles.logo}
        />
        <View style={styles.loginButton}>
          <LoginButton
            title={'구글로 로그인'}
            src={require('../../assets/images/google.png')}
            color={'#FFFF'}
          />
          <LoginButton
            title={'카카오톡으로 로그인'}
            src={require('../../assets/images/kakao.png')}
            color={'#FFCD00'}
          />
          <LoginButton
            title={'네이버로 로그인'}
            src={require('../../assets/images/naver.png')}
            color={'#00C35A'}
            textColor={'#FFFF'}
          />
          <LoginButton
            title={'페이스북으로 로그인'}
            src={require('../../assets/images/facebook.png')}
            color={'#1877F2'}
            textColor={'#FFFF'}
          />

          <View style={styles.marginView} />
        </View>
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
  logo: {
    width: 90,
    height: 90,
    top: 196,
    resizeMode: 'contain',
  },
  loginButton: {
    top: 290,
  },
  marginView: {
    margin: 40,
  },
});

export default Main;

import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {useNavigation, CommonActions} from '@react-navigation/native';
import GroupLogo from '../components/GroupLogo';

const LoginGo = ({token}) => {
  const navigation = useNavigation(); // 로그인 페이지로 넘기기 위한 네비게이션 객체
  const image = `../../assets/images/main_group_Image.png`;
  useEffect(() => {
    console.log(`loginItem token ${token}`);
  }, [token]);
  return (
    <ImageBackground source={require(image)} style={styles.container}>
      <GroupLogo />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate('Login');
        }}>
        <Text style={styles.text}>로그인</Text>

      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get('window').width,
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
    border: 2,
    position: 'absolute',
    flexDirection: 'row',
    borderColor: 'white',
  },
  text: {
    color: 'white',
    fontSize: 16
  },
});
export default LoginGo;

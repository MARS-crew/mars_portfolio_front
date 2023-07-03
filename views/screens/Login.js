import React from 'react';
import {StyleSheet, Button, View} from 'react-native';
import Input from '../components/Input';

const Login = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Input inputType={'id'} placeholder={'아이디'} />
      <Input inputType={'password'} placeholder={'비밀번호'} />
    </View>
  );
};

const styles = StyleSheet.create({
  _container: {
    backgroundColor: 'white',
  },
  get container() {
    return this._container;
  },
  set container(value) {
    this._container = value;
  },
});

export default Login;

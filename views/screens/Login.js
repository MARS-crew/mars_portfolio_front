import React from 'react';
import {StyleSheet, View} from 'react-native';
import Input from '../components/Input';

const Login = ({navigation}) => {
  return (
    <View>
      <View style={styles.container}>
        <Input inputType={'id'} placeholder={'아이디'} />
        <Input inputType={'password'} placeholder={'비밀번호'} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
});

export default Login;

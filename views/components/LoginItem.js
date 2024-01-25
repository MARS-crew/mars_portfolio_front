import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  Dimensions,
} from 'react-native';
import {useNavigation, CommonActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginItem = ({token}) => {
  const navigation = useNavigation(); // 로그인 페이지로 넘기기 위한 네비게이션 객체

  useEffect(() => {
    console.log(`loginItem token ${token}`);
  }, [token]);

  return (
    <View style={styles.container}>
      {token ? (
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (token) {
              // 네비게이션 스택을 리셋하고 첫 화면으로 이동
              // clearToken(); // 토큰 초기화

              // 로그인 페이지 이동
              navigation.navigate('Logout');
            }
          }}>
          <Text style={styles.text}>로그아웃</Text>
          {/*<Image*/}
          {/*  source={require('../../assets/images/LoginNextItem.png')}*/}
          {/*  style={styles.image}*/}
          {/*/>*/}
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            // 로그인 페이지 이동
            navigation.navigate('Login');
          }}>
          <Text style={styles.text}>로그인</Text>
          <Image
            source={require('../../assets/images/LoginNextItem.png')}
            style={styles.image}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    width: Dimensions.get('window').width,
  },
  itemArea: {
    flex: 1,
    height: 'auto'
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
    borderColor: 'white',
    border: 2,
    position: 'absolute',
    flexDirection: 'row',
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
});

export default LoginItem;

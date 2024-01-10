import React, {useEffect} from 'react';
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

const LoginGo = ({token}) => {
    const navigation = useNavigation(); // 로그인 페이지로 넘기기 위한 네비게이션 객체

    useEffect(() => {
      console.log(`loginItem token ${token}`);
    }, [token]);
  return (
    <View>
      <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate('Login');
          }}>
          <Text style={styles.text}>로그인</Text>
          <Image
            source={require('../../assets/images/LoginNextItem.png')}
            style={styles.image}
          />
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    itemArea: {
      flex: 1,
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
      borderColor: 'black',
      border: 2,
      position: 'absolute',
      flexDirection: 'row',
    },
    text: {
      color: 'black',
      fontSize: 16,
    },
  });
export default LoginGo;

import React, {useState, useContext} from 'react';
import {SafeAreaView, StyleSheet, View, Image, Dimensions} from 'react-native';
import WebView from 'react-native-webview';
import LoginButton from '../components/LoginButton';
import {useNavigation, CommonActions} from '@react-navigation/native';
import {useUserInfo} from '../../UserInfoContext';

// 디바이스 크기
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Logout = () => {
  const [showWebView, setShowWebView] = useState(false); // WebView 표시 여부 상태
  const navigation = useNavigation(); // 로그아웃 성공 후 페이지를 호출하기 이전 페이지(그룹)로 넘기기 위한 네비게이션 객체
  const {reset, clearToken} = useUserInfo();
  const url = 'http://api.mars-port.duckdns.org/logout'; // base url

  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={{flex: 1}}>
        <WebView
          source={{uri: url}}
          style={{width: width, height: height}}
          onNavigationStateChange={event => {
            if (event.url === 'http://api.mars-port.duckdns.org/login') {
              // 로그아웃 성공 후 리디렉션되는 URL을 확인하고 처리

              clearToken(); // 토큰 초기화
              setShowWebView(false); // 로그아웃 성공 후 WebView 숨기기
              if (navigation.canGoBack()) {
                navigation.goBack(); // 뒤로가기가 가능할 경우 뒤로가기
              } else {
                navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [
                      {name: 'Home'}, // 안되면 home으로 이동
                    ],
                  }),
                );
              }
            }
          }}
        />
      </SafeAreaView>
    </View>
  );
};
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

export default Logout;

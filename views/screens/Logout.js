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
  const navigation = useNavigation(); // 로그인 성공 후 로그인 페이지를 호출하기 이전 페이지(그룹)로 넘기기 위한 네비게이션 객체
  const {reset, clearToken} = useUserInfo();
  const url = 'http://api.mars-port.duckdns.org/logout'; // base url

  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={{flex: 1}}>
        <WebView
          source={{uri: url}}
          style={{width: width, height: height}}
          onNavigationStateChange={event => {
            // 백단의 응답 url에 따라 이후 이벤트 대응(백에서 성공 시 /main으로 넘기고 실패할 경우에는 /login으로 넘김)
            if (event.url === 'http://api.mars-port.duckdns.org/login') {
              // 로그인 성공 후 리디렉션되는 URL을 확인하고 처리
              // 백에서 토큰을 /main에 저장하고 있기 때문에 해당 Url에서 로그인 후 생성된 토큰을 불러옴

              clearToken(); // 토큰 초기화
              setShowWebView(false); // 로그인 성공 후 WebView 숨기기
              navigation.dispatch(CommonActions.goBack()); // 로그인 페이지를 호출하기 이전 페이지로 이동
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

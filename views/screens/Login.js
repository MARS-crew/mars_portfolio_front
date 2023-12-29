import React, {useState, useContext} from 'react';
import {SafeAreaView, StyleSheet, View, Image, Dimensions} from 'react-native';
import WebView from 'react-native-webview';
import LoginButton from '../components/LoginButton';
import {useNavigation, CommonActions} from '@react-navigation/native';
import {useToken} from '../../TokenContext';

// 디바이스 크기
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Login = () => {
  const [showWebView, setShowWebView] = useState(false); // WebView 표시 여부 상태
  const [loginUrl, setLoginUrl] = useState(''); // 접속 url 설정을 위한 변수
  const navigation = useNavigation(); // 로그인 성공 후 로그인 페이지를 호출하기 이전 페이지(그룹)로 넘기기 위한 네비게이션 객체
  const {token, storeToken} = useToken();

  // 로그인 버튼 클릭 핸들러 - 각 버튼 유형에 대응하여 url 할당
  const handleLoginPress = type => {
    let url = 'http://api.mars-port.duckdns.org/auth/'; // base url

    // 넘어온 매개변수 값에 대응
    switch (type) {
      case 'facebook':
        url += 'facebook/callback';
        break;
      case 'google':
        url += 'google/callback';
        break;
      case 'naver':
        url += 'naver/callback';
        break;
      case 'kakao':
        url += 'kakao/callback';
        break;
      default:
        console.log('타입 없음');
        return;
    }

    setLoginUrl(url); // 갱신 url, 변수에 저장
    setShowWebView(true); // WebView를 표시하도록 상태 업데이트
  };

  // // 받아온 토큰값을 저장하기 위한 함수
  // const storeToken = async token => {
  //   try {
  //     await AsyncStorage.setItem('userToken', token);
  //   } catch (error) {
  //     console.error('Error storing the token', error);
  //   }
  // };

  return (
    <View style={{flex: 1}}>
      {showWebView ? ( // 웹뷰 표시 상태일 경우
        <SafeAreaView style={{flex: 1}}>
          <WebView
            source={{uri: loginUrl}}
            style={{width: width, height: height}}
            onNavigationStateChange={event => {
              // 백단의 응답 url에 따라 이후 이벤트 대응(백에서 성공 시 /main으로 넘기고 실패할 경우에는 /login으로 넘김)
              if (event.url === 'http://api.mars-port.duckdns.org/main') {
                // 로그인 성공 후 리디렉션되는 URL을 확인하고 처리
                // 백에서 토큰을 /main에 저장하고 있기 때문에 해당 Url에서 로그인 후 생성된 토큰을 불러옴
                fetch('http://api.mars-port.duckdns.org/main')
                  .then(response => {
                    // 토큰 가져오기
                    const cookie = response.headers.get('set-cookie');

                    // 순수 토큰값을 가져오기 위한 전처리, 넘어오는 토큰 데이터의 형식이 'token={순수 토큰값}; Path' 형식으로 들어옴
                    const token = cookie.split('token=')[1].split(';')[0];

                    console.log('token: ', token);
                    // 토큰 저장
                    storeToken(token);
                  })
                  .catch(error => {
                    console.error('Error:', error);
                  });

                setShowWebView(false); // 로그인 성공 후 WebView 숨기기
                navigation.dispatch(CommonActions.goBack()); // 로그인 페이지를 호출하기 이전 페이지로 이동
              }
            }}
          />
        </SafeAreaView>
      ) : (
        <View style={styles.contain}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.image}
          />
          <LoginButton
            title={'페이스북'}
            src={require('../../assets/images/facebook.png')}
            handleLoginPress={() => handleLoginPress('facebook')} // 각각의 로그인 형식으로 매개변수 전달
          />
          <LoginButton
            title={'구글'}
            src={require('../../assets/images/google.png')}
            handleLoginPress={() => handleLoginPress('google')} // 각각의 로그인 형식으로 매개변수 전달
          />
          <LoginButton
            title={'네이버'}
            src={require('../../assets/images/naver.png')}
            handleLoginPress={() => handleLoginPress('naver')} // 각각의 로그인 형식으로 매개변수 전달
          />
          <LoginButton
            title={'카카오'}
            src={require('../../assets/images/kakao.png')}
            handleLoginPress={() => handleLoginPress('kakao')} // 각각의 로그인 형식으로 매개변수 전달
          />
          <View style={styles.marginView} />
        </View>
      )}
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

export default Login;

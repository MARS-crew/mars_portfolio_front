import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Image, Dimensions } from 'react-native';
import WebView from 'react-native-webview';
import LoginButton from '../components/LoginButton';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { useUserInfo } from '../../UserInfoContext';
import axios from 'axios';

// 디바이스 크기
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Login = () => {
  const [showWebView, setShowWebView] = useState(false); // WebView 표시 여부 상태
  const [loginUrl, setLoginUrl] = useState(''); // 접속 url 설정을 위한 변수
  const navigation = useNavigation(); // 로그인 성공 후 로그인 페이지를 호출하기 이전 페이지(그룹)로 넘기기 위한 네비게이션 객체
  const [userInfoData, setUserInfoData] = useState('');
  const { token, storeToken } = useUserInfo();
  const { name, storeName } = useUserInfo();
  const { id, storeId } = useUserInfo();
  const { email, storeEmail } = useUserInfo();

  // 로그인 버튼 클릭 핸들러 - 각 버튼 유형에 대응하여 url 할당
  const handleLoginPress = type => {
    let url = 'https://api.writeyoume.com/auth/'; // base url

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

  useEffect(() => {
    if (Array.isArray(userInfoData)) {
      const id = JSON.stringify(userInfoData.map(item => item.member_id));
      const name = JSON.stringify(userInfoData.map(item => item.name));
      const email = JSON.stringify(userInfoData.map(item => item.email));
      storeId(id);
      storeName(name);
      storeEmail(email);
      // storeName(userInfoData.map(item => item.name.toString()));
      // storeEmail(userInfoData.map(item => item.email.toString()));
    } else {
      console.log('Data is not an array');
    }
  }, [userInfoData]);

  return (
    <View style={{ flex: 1 }}>
      {showWebView ? ( // 웹뷰 표시 상태일 경우
        <SafeAreaView style={{ flex: 1 }}>
          <WebView
            source={{ uri: loginUrl }}
            style={{ width: width, height: height }}
            onNavigationStateChange={event => {
              // 백단의 응답 url에 따라 이후 이벤트 대응(백에서 성공 시 /main으로 넘기고 실패할 경우에는 /login으로 넘김)
              if (event.url === 'https://api.writeyoume.com/main') {
                // 로그인 성공 후 리디렉션되는 URL을 확인하고 처리
                // 백에서 토큰을 /main에 저장하고 있기 때문에 해당 Url에서 로그인 후 생성된 토큰을 불러옴
                fetch('https://api.writeyoume.com/main')
                  .then(response => {
                    // 토큰 가져오기
                    const cookie = response.headers.get('set-cookie');

                    // 순수 토큰값을 가져오기 위한 전처리, 넘어오는 토큰 데이터의 형식이 'token={순수 토큰값}; Path' 형식으로 들어옴
                    const token = cookie.split('token=')[1].split(';')[0];
                    // 토큰 저장
                    storeToken(token);

                    const source = axios.CancelToken.source();

                    axios({
                      method: 'get',
                      url: `https://api.writeyoume.com/api/v1/userbytoken`,
                      headers: {
                        Authorization: token,
                      },
                      cancelToken: source.token,
                    })
                      .then(response => {
                        console.log('Success:', response.status);
                        //todo
                        const extractedData = response.data.data.map(item => ({
                          member_id: item.member_id,
                          email: item.email,
                          name: item.name,
                        }));

                        setUserInfoData(extractedData);
                      })
                      .catch(error => {
                        console.log('Error Message(getuser):', error.message);
                        console.log('Error Response(getuser):', error.response);
                        console.log('Error Request(getuser):', error.request);
                      });

                    return () => {
                      source.cancel('API 호출이 취소되었습니다.');
                    };
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
            source={require('../../assets/images/login_main_logo.png')}
            style={styles.image}
          />
          <View style={styles.marginView}>
            <LoginButton
              background={'white'}
              title={'구글로 로그인'}
              src={require('../../assets/images/google.png')}
              handleLoginPress={() => handleLoginPress('google')} // 각각의 로그인 형식으로 매개변수 전달
            />
            <LoginButton
              background={'#FFCD00'}
              title={'카카오로 로그인'}
              src={require('../../assets/images/kakao.png')}
              handleLoginPress={() => handleLoginPress('kakao')} // 각각의 로그인 형식으로 매개변수 전달
            />

            <LoginButton
              background={'#00C35A'}
              title={'네이버로 로그인'}
              color={'white'}
              src={require('../../assets/images/naver.png')}
              handleLoginPress={() => handleLoginPress('naver')} // 각각의 로그인 형식으로 매개변수 전달
            />
            <LoginButton
              background={'#1877F2'}
              title={'페이스북으로 로그인'}
              color={'white'}
              src={require('../../assets/images/facebook.png')}
              handleLoginPress={() => handleLoginPress('facebook')} // 각각의 로그인 형식으로 매개변수 전달
            />
          </View>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  contain: {
    backgroundColor: '#FFFF',
    flex: 1,
    paddingHorizontal: 50,

    alignItems: 'center',
  },
  image: {
    width: 90,
    height: 90,

    marginTop: 196,
    marginBottom: 85,
  },
  marginView: {
    marginBottom: 196,
  },
});

export default Login;

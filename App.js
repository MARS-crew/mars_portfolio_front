import React, {useState, useEffect, useRef} from 'react';
import {
  Animated,
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Splash from './views/screens/splash';
import Login from './views/screens/Login';
import Resume from './views/screens/ResumeContents';
import Portfolio from './views/screens/Portfolio/Portfolio';
import Review from './views/screens/Review/Review';
import MyPage from './views/screens/MyPage/MyPage';
import Album from './views/screens/Album';
import Interview from './views/screens/Interview';
import 'react-native-gesture-handler';
import WhichGroup from './views/screens/WhichGroup';
import Help from './views/screens/Help';
import Share from './views/screens/Share';

import GroupVideo from './views/screens/GroupVideo';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import AppContext from './AppContext`';
import {MyProvider} from './MyContext';
import {IndexProvider, useIndexContext} from './IndexContext';
import {UserInfoProvider, useUserInfo} from './UserInfoContext';
import {LoadingProvider, useLoadingContext} from './LoadingContext';
import Logout from './views/screens/Logout';
import LoginGo from './views/screens/LoginGo';
import Loading from './views/screens/Loading';

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

const SCREEN_WIDTH = Dimensions.get('window').width;

const xOffset = new Animated.Value(0);

const Screen = props => {
  return (
    <View style={styles.scrollPage}>
      <Animated.View style={[styles.screen, transitionAnimation(props.index)]}>
        {props.children}
      </Animated.View>
    </View>
  );
};

const Stack = createStackNavigator();

const transitionAnimation = index => {
  return {
    transform: [
      {perspective: 800},
      {
        scale: xOffset.interpolate({
          inputRange: [
            (index - 1) * SCREEN_WIDTH,
            index * SCREEN_WIDTH,
            (index + 1) * SCREEN_WIDTH,
          ],
          outputRange: [0.95, 1, 0.95],
        }),
      },
      {
        rotateX: xOffset.interpolate({
          inputRange: [
            (index - 1) * SCREEN_WIDTH,
            index * SCREEN_WIDTH,
            (index + 1) * SCREEN_WIDTH,
          ],
          outputRange: ['0deg', '0deg', '0deg'], //x각도
        }),
      },
      {
        rotateY: xOffset.interpolate({
          inputRange: [
            (index - 1) * SCREEN_WIDTH,
            index * SCREEN_WIDTH,
            (index + 1) * SCREEN_WIDTH,
          ],
          outputRange: ['35deg', '0deg', '-35deg'], //y각도
        }),
      },
    ],
  };
};

const App = () => {
  return (
    <IndexProvider>
      <UserInfoProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Help"
              component={Help}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Share"
              component={Share}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Album"
              component={Album}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Logout"
              component={Logout}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </UserInfoProvider>
    </IndexProvider>
  );
};

const HomeScreen = () => {
  const {token, id, name, email} = useUserInfo();
  const [modalOpen, setModalOpen] = useState(false);
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const {
    currentIndex,
    changeIndex,
    horizontalIndex,
    changeHorizontalIndex,
    dataIndex,
    changeDataIndex,
    selectedMemId,
    changeSelectedMemId,
    selectedGroupId,
  } = useIndexContext();
  const [oldIndex, setOldIndex] = useState(horizontalIndex);
  const horizontalScrollRef = useRef(null);

  const {loading, changeLoading} = useLoadingContext();

  useEffect(() => {
    if (horizontalScrollRef.current) {
      horizontalScrollRef.current.scrollTo({
        x: horizontalIndex * SCREEN_WIDTH,
        animated: true,
      });
    }
  }, [horizontalIndex, horizontalScrollRef]);

  useEffect(() => {
    AsyncStorage.getItem('isSplashVisible').then(value => {
      if (value !== null) {
        setIsSplashVisible(JSON.parse(value));
      }
    });

    let timer = setTimeout(() => {
      setIsSplashVisible(false);
      console.log('Splash:' + isSplashVisible);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('isSplashVisible', JSON.stringify(isSplashVisible));
  }, [isSplashVisible]);

  // 토큰값 수신 확인 및 반영
  useEffect(() => {
    if (token) {
      console.log('Token 메인: ', token);
      console.log(`id: ${id}, name: ${name}, email: ${email}`);
    }
  }, [token, id, name, email]);

  // 사용자 정보 수신 확인
  useEffect(() => {
    console.log(`id: ${id}, name: ${name}, email: ${email}`);
  }, [id, name, email]);
  // const [indexValue, setIndexValue] = useState(0);

  const handleScroll = event => {
    const offsetX = event.nativeEvent.contentOffset.x;

    const newIndex = Math.round(offsetX / SCREEN_WIDTH);
    // 변경된 인덱스를 처리하는 함수 호출
    if (oldIndex !== newIndex) {
      changeHorizontalIndex(newIndex);
      setOldIndex(newIndex);
      // console.log("newIndex: ", newIndex, ", oldIndex: ", oldIndex, ", horizontalIndex: ", horizontalIndex);
    }
  };
  return (
    <UserInfoProvider>
      <MyProvider>
        <LoadingProvider>
          <AnimatedScrollView
            ref={horizontalScrollRef}
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: xOffset}}}],
              {
                useNativeDriver: true,
                listener: handleScroll,
              },
            )}
            horizontal
            pagingEnabled
            style={styles.scrollView}>
            {token ? ( // 로그인 전이면 그룹 페이지만, 로그인 후면 전체 페이지
              <>
                {isSplashVisible === false ? (
                  <Screen text="Screen 1" index={0}>
                    <WhichGroup token={token} />
                  </Screen>
                ) : null}
                <Screen text="Screen 2" index={1}>
                  <GroupVideo token={token} />
                </Screen>
                <Screen text="Screen 3" index={2}>
                  <Interview token={token} />
                </Screen>
                <Screen text="Screen 4" index={3}>
                  <Portfolio token={token} options={{headerShown: false}} />
                </Screen>
                <Screen text="Screen 5" index={4}>
                  <Resume token={token} />
                </Screen>
                <Screen text="Screen 6" index={5}>
                  <Review token={token} currentUserId={id} />
                </Screen>
                <Screen text="Screen 7" index={6}>
                  <MyPage token={token} options={{headerShown: false}} />
                </Screen>
              </>
            ) : (
              <>
                {isSplashVisible === false ? (
                  <Screen text="Screen 0" index={0}>
                    <LoginGo token={token} />
                  </Screen>
                ) : null}
              </>
            )}
            {loading ? (
              <Modal
                transparent={true}
                visible={loading}
                onRequestClose={() => hideLoading()}>
                <View style={styles.loading}>
                  <Loading />
                </View>
              </Modal>
            ) : null}
          </AnimatedScrollView>
        </LoadingProvider>
      </MyProvider>
    </UserInfoProvider>
  );
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // 투명도가 있는 검은색 배경0
  },
  scrollView: {
    flexDirection: 'row',
    backgroundColor: 'black',
  },
  scrollPage: {
    width: SCREEN_WIDTH,
  },
  screen: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 0,
    backgroundColor: 'white',
  },
  text: {
    fontSize: 45,
    fontWeight: 'bold',
  },
});

export default App;

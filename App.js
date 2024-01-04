import React, { useState, useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
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

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import AppContext from './AppContext`';
import { MyProvider } from './MyContext';
import { IndexProvider, useIndexContext } from './IndexContext';
import { TokenProvider, useToken } from './TokenContext';

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
      { perspective: 800 },
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
      <TokenProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Help"
              component={Help}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Share"
              component={Share}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Album"
              component={Album}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </TokenProvider>
    </IndexProvider>
  );
};

const HomeScreen = () => {
  const { token } = useToken(
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InNuc19pZCI6MjMsIm1lbWJlcl9pZCI6NDksInR5cGUiOiJnb29nbGUiLCJuYW1lIjoi7J2R7J6JIiwiYWNjZXNzX3Rva2VuIjoieWEyOS5hMEFmQl9ieUFZOXJJMktuYzZjNnh2QW5sWGhqZjRFOFZOaEZRRXZQeS1oT2hzZDE1LVNka1lDSGZ0YVUxaXJXV1FsNGRSa3RXTnliM3BUX0FUNGtxU09VY0oycDV2ek5Cb0tSZnBsdHUyNE1GNE5vMkZaeTRDRWR4akRuRVJEdExfam5wQ2RPTXpERXRqQlZpdmd6RU84M3o0a3hoU0ZGQ2ZtaF92YUNnWUtBZjhTQVJJU0ZRSEdYMk1pRVpVS2xYYmRHY1Jyb09FZElnVDhYdzAxNzEiLCJyZWZyZXNoX3Rva2VuIjpudWxsLCJhdXRoX2NvZGUiOm51bGwsImNvbm5lY3RfZGF0ZSI6IjIwMjMtMTEtMTVUMjM6NTY6MDkuMDAwWiJ9LCJpYXQiOjE3MDQyNzkwMTIsImV4cCI6MTcwNDI4MjYxMn0.c9PDaviyLbHGBz4C8dfH97SvAqmQCAQAG-KXqneEAMg',
  );

  const [modalOpen, setModalOpen] = useState(false);
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InNuc19pZCI6MjMsIm1lbWJlcl9pZCI6NDksInR5cGUiOiJnb29nbGUiLCJuYW1lIjoi7J2R7J6JIiwiYWNjZXNzX3Rva2VuIjoieWEyOS5hMEFmQl9ieUFZOXJJMktuYzZjNnh2QW5sWGhqZjRFOFZOaEZRRXZQeS1oT2hzZDE1LVNka1lDSGZ0YVUxaXJXV1FsNGRSa3RXTnliM3BUX0FUNGtxU09VY0oycDV2ek5Cb0tSZnBsdHUyNE1GNE5vMkZaeTRDRWR4akRuRVJEdExfam5wQ2RPTXpERXRqQlZpdmd6RU84M3o0a3hoU0ZGQ2ZtaF92YUNnWUtBZjhTQVJJU0ZRSEdYMk1pRVpVS2xYYmRHY1Jyb09FZElnVDhYdzAxNzEiLCJyZWZyZXNoX3Rva2VuIjpudWxsLCJhdXRoX2NvZGUiOm51bGwsImNvbm5lY3RfZGF0ZSI6IjIwMjMtMTEtMTVUMjM6NTY6MDkuMDAwWiJ9LCJpYXQiOjE3MDQyMDE2NjEsImV4cCI6MTcwNDIwNTI2MX0.5o8VNBGNw8ruqnEYKKsTL-mtoldmw6edi39WPugSas4';
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

  useEffect(() => {
    if (token) {
      console.log('Token 메인: ', token);
    }
  }, [token]);
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
    <TokenProvider>
      <MyProvider>
        <AnimatedScrollView
          ref={horizontalScrollRef}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: xOffset } } }],
            {
              useNativeDriver: true,
              listener: handleScroll,
            },
          )}
          horizontal
          pagingEnabled
          style={styles.scrollView}>
          <Splash isSplashVisible={isSplashVisible} />
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
            <Portfolio token={token} options={{ headerShown: false }} />
          </Screen>
          <Screen text="Screen 5" index={4}>
            <Resume token={token} />
          </Screen>
          <Screen text="Screen 6" index={5}>
            <Review token={token} />
          </Screen>
          <Screen text="Screen 7" index={6}>
            <MyPage token={token} options={{ headerShown: false }} />
          </Screen>
        </AnimatedScrollView>
      </MyProvider>
    </TokenProvider>
  );
};

const styles = StyleSheet.create({
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

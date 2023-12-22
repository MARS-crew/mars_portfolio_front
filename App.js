import React, { useState, useEffect } from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
// import AppContext from './AppContext`';
import { MyProvider } from './MyContext';
import { IndexProvider, useIndexContext } from './IndexContext';

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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const HomeScreen = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InNuc19pZCI6MjEsIm1lbWJlcl9pZCI6NDcsInR5cGUiOiJnb29nbGUiLCJuYW1lIjoi7J207IS47KeEIiwiYWNjZXNzX3Rva2VuIjoieWEyOS5hMEFmQl9ieUQxTDZkWGhwNEtIbXNEcHRERGxDN2tScXN2bGh1akhuSnhXSWNsTjUtMEJ1VlpJTWpNSk1ILWZIWnZLQlNKMmpDZktZek04enJFQTNpbFZlT0s2VGN2d01qdTg3MHYwX1hOeUF4aUdqaTJzV0huSlZRX1pITTc2UE9xdHNSNGtHcGwzcWhDNFdvY1NGNTNURGF6bVZ2R2p5ZEgzQlIzYUNnWUtBYUFTQVJNU0ZRSEdYMk1pZU5RT2pUemxGdGJTa2d5RHlxX2lIZzAxNzEiLCJyZWZyZXNoX3Rva2VuIjpudWxsLCJhdXRoX2NvZGUiOm51bGwsImNvbm5lY3RfZGF0ZSI6IjIwMjMtMTEtMDhUMjI6MTU6MjMuMDAwWiJ9LCJpYXQiOjE3MDMyNDE0ODIsImV4cCI6MTcwMzI0NTA4Mn0.H_64EOwG-OwTCx9APmBriTyeI4Wf7Kj0dgxtcDa_ZGg';
  // const { currentIndex } = useIndexContext();

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
  // const [indexValue, setIndexValue] = useState(0);

  // const userSettings = {
  //   swiperIndex: indexValue,
  //   setIndexValue,
  // };
  // console.log(ind);

  return (
    // <AppContext.Provider value={userSettings}>
    <IndexProvider>
      <MyProvider>
        <Animated.ScrollView
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: xOffset } } }],
            {
              useNativeDriver: true,
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
        </Animated.ScrollView>
      </MyProvider>
      {/* </AppContext.Provider> */}
    </IndexProvider>
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

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
import Group from './views/screens/Group';
import Member from './views/screens/Member';
import Youtube from './views/screens/Youtube';
import Resume from './views/screens/Resume';
import Portfolio from './views/screens/Portfolio/Portfolio';
import Review from './views/screens/Review';
import MyPage from './views/screens/MyPage/MyPage';
import Album from './views/screens/Album';
import Interview from './views/screens/Interview';
import InterviewContents from './views/screens/InterviewContents';
import 'react-native-gesture-handler';
import WhichGroup from './views/screens/WhichGroup';
import Help from './views/screens/Help';
import Share from './views/screens/Share';

import GroupVideo from './views/screens/GroupVideo';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const xOffset = new Animated.Value(0);
const yOffset = new Animated.Value(0);

const Screen = props => {
  return (
    <View style={styles.scrollPage}>
      <Animated.View style={[styles.screen, transitionAnimation(props.index)]}>
        {props.children}
      </Animated.View>
    </View>
  );
};

const ScreenY = props => {
  return (
    <View style={styles.scrollPage}>
      <Animated.View style={[styles.screen, transitionYAnimation(props.index)]}>
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
const transitionYAnimation = index => {
  return {
    transform: [
      { perspective: 800 },
      {
        scale: yOffset.interpolate({
          inputRange: [
            (index - 1) * SCREEN_HEIGHT,
            index * SCREEN_HEIGHT,
            (index + 1) * SCREEN_HEIGHT,
          ],
          outputRange: [1, 1, 1],
        }),
      },
      {
        translateY: yOffset.interpolate({
          inputRange: [
            (index - 1) * SCREEN_HEIGHT,
            index * SCREEN_HEIGHT,
            (index + 1) * SCREEN_HEIGHT,
          ],
          outputRange: [0, 0, 0],
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

const datas = [
  {
    id: 1,
    group: 3,
    interviewData: '',
    portfolioData: '',
    resumeData: '',
    reviewData: '',
  },
  {
    id: 2,
    group: 3,
    interviewData: '',
    portfolioData: '',
    resumeData: '',
    reviewData: '',
  },
  {
    id: 3,
    group: 4,
    interviewData: '',
    portfolioData: '',
    resumeData: '',
    reviewData: '',
  },
  {
    id: 4,
    group: 4,
    interviewData: '',
    portfolioData: '',
    resumeData: '',
    reviewData: '',
  },
  {
    id: 5,
    group: 3,
    interviewData: '',
    portfolioData: '',
    resumeData: '',
    reviewData: '',
  },
];

const HomeScreen = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: yOffset } } }],
    {
      useNativeDriver: true,
      listener: event => {
        const offset = event.nativeEvent.contentOffset.y;
        const currentIndex = Math.round(offset / SCREEN_HEIGHT);
        console.log('Current Index: ', currentIndex);
        setCurrentIndex(currentIndex);
      },
    },
  );

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

  return (
    <Animated.ScrollView
      scrollEventThrottle={16}
      onScroll={handleScroll}
      horizontal
      pagingEnabled
      style={styles.scrollView}>
      <Splash isSplashVisible={isSplashVisible} />
      {isSplashVisible === false ? (
        <Screen text="Screen 1" index={0}>
          <WhichGroup />
        </Screen>
      ) : null}

      <Screen text="Screen 2" index={1}>
        {datas.map((data, index) => (
          <ScreenY>
            <GroupVideo index={index} />
          </ScreenY>
        ))}
      </Screen>
      <Screen text="Screen 3" index={2}>
        {datas.map((data, index) => (
          <ScreenY index={index}>
            <InterviewContents
              path={data.interviewData}
              currentPage={currentPage}
              currentIndex={currentIndex}
              index={index}
              isPlaying={currentIndex === index && isPlaying}
              setIsPlaying={setIsPlaying}
            />
            {/* <Interview /> */}
          </ScreenY>
        ))}
      </Screen>
      <Screen Screen text="Screen 4" index={3}>
        {datas.map((data, index) => (
          <ScreenY index={index}>
            <Resume modalOpen={modalOpen} />
          </ScreenY>
        ))}
      </Screen>
      <Screen text="Screen 5" index={4}>
        {datas.map((data, index) => (
          <ScreenY index={index}>
            <Portfolio options={{ headerShown: false }} />
          </ScreenY>
        ))}
      </Screen>
      <Screen text="Screen 6" index={5}>
        <Review />
      </Screen>
      <Screen text="Screen 7" index={6}>
        <MyPage options={{ headerShown: false }} />
      </Screen>
    </Animated.ScrollView>
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

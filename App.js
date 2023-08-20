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
import Swiper from 'react-native-swiper';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const Stack = createStackNavigator();

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
    <View style={styles.container}>
      <Swiper style={styles.wrapper} showsPagination={false}>
        <View style={styles.slide}>
          <Splash isSplashVisible={isSplashVisible} />
          {isSplashVisible === false ? <WhichGroup index={1} /> : null}
        </View>
        <GroupVideo index={1} />
        <InterviewContents
          index={2}
          path={''}
          currentPage={currentPage}
          currentIndex={currentIndex}
          isPlaying={currentIndex === 2 && isPlaying}
          setIsPlaying={setIsPlaying}
        />
        <Resume modalOpen={modalOpen} index={3} />
        <Portfolio options={{ headerShown: false }} index={4} />
        <Review index={5} />
        <View style={styles.slide}>
          <MyPage options={{ headerShown: false }} index={6} />
        </View>
      </Swiper>
    </View>
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
  wrapper: {
    // backgroundColor: '#f00'
  },
  slide: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  container: {
    flex: 1,
  },
});

export default App;

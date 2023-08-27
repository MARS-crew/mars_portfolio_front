import React, { useState, useEffect } from 'react';
import {
  Animated,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Swiper from 'react-native-swiper';

import Splash from './views/screens/splash';
import Resume from './views/screens/Resume';
import Portfolio from './views/screens/Portfolio/Portfolio';
import Review from './views/screens/Review';
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
import InterviewContents from './views/screens/InterviewContents';

const SCREEN_WIDTH = Dimensions.get('window').width;

const Group1 = ({
  currentPage,
  setCurrentPage,
  currentIndex,
  setCurrentIndex,
  subIndex,
  setSubIndex,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <Swiper
      style={styles.wrapper}
      showsPagination={false}
      index={currentIndex}
      loop={false}
      onIndexChanged={index => setCurrentIndex(index)}>
      <WhichGroup />
      <View style={styles.slide}>
        <GroupVideo />
      </View>
      <View style={styles.slide}>
        <InterviewContents
          index={2}
          path={''}
          currentPage={currentPage}
          currentIndex={currentIndex}
          isPlaying={currentIndex === 2 && isPlaying}
          setIsPlaying={setIsPlaying}
        />
      </View>
      <View style={styles.slide}>
        <Resume />
      </View>
      <View style={styles.slide}>
        <Portfolio options={{ headerShown: false }} />
      </View>
      <View style={styles.slide}>
        <Review />
      </View>
      <View style={styles.slide}>
        <MyPage />
      </View>
    </Swiper>
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
  slide: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  text: {
    fontSize: 45,
    fontWeight: 'bold',
  },
});

export default Group1;

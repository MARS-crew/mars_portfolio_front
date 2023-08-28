import React, {useState, useEffect} from 'react';
import {StyleSheet, View, FlatList, SafeAreaView} from 'react-native';

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
import 'react-native-gesture-handler';
import WhichGroup from './views/screens/WhichGroup';
import Help from './views/screens/Help';
import Share from './views/screens/Share';

import GroupVideo from './views/screens/GroupVideo';
import Swiper from 'react-native-swiper';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

var styles = {
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFF',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFF',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFF',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
};
const Stack = createStackNavigator();
export default () => (
  <Swiper>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="WhichGroup"
          component={WhichGroup}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="GroupVideo"
          component={GroupVideo}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  </Swiper>
);

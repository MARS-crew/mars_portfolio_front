

import React, {useState, useEffect} from 'react';
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
import Main from './views/screens/Main';
import Test from './views/screens/Test';
import Group from './views/screens/Group';
import Member from './views/screens/Member';
import Youtube from './views/screens/Youtube';
import Resume from './views/screens/Resume';
import Portfolio from './views/screens/Portfolio/Portfolio';
import Review from './views/screens/Review';
import Album from './views/screens/Album';
import Interview from './views/screens/Interview';
import 'react-native-gesture-handler';
import WhichGroup from './views/screens/WhichGroup';
import FlatListAdapter from './views/screens/FlatListAdapter';
import {FlatList} from 'react-native-gesture-handler';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

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
  const [alert, setAlert] = useState(true);
  useEffect(() => {
    let timer = setTimeout(() => {
      setAlert(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <Animated.ScrollView
      scrollEventThrottle={16}
      onScroll={Animated.event([{nativeEvent: {contentOffset: {x: xOffset}}}], {
        useNativeDriver: true,
      })}
      horizontal
      pagingEnabled
      style={styles.scrollView}>

{alert === true ? <Splash /> :       <Screen text="Screen 1" index={0}>
        <Login />
      </Screen>}


      <Screen text="Screen 2" index={1}>
        <WhichGroup />
      </Screen>
      <Screen text="Screen 3" index={2}>
        <Member />
      </Screen>
      <Screen text="Screen 4" index={3}>
        <Interview />
      </Screen>
      <Screen text="Screen 5" index={4}>
        <Resume />
      </Screen>
      <Screen text="Screen 6" index={5}>
        <Portfolio options={{headerShown: false}} />
      </Screen>
      <Screen text="Screen 7" index={6}>
        <Review />
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
    padding: 5,
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

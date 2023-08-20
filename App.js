import React, {useState, useEffect} from 'react';
import { View, StyleSheet, ScrollView ,Text} from 'react-native';
import Splash from './views/screens/splash';
import Swiper from 'react-native-swiper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { NavigationContainer } from '@react-navigation/native';


import Group1 from './Group1';
import Group2 from './Group2';

const App = () => {

    const [isSplashVisible, setIsSplashVisible] = useState(true);

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
    <NavigationContainer>
    <View style={styles.container}>
      <Splash isSplashVisible={isSplashVisible} />
        {isSplashVisible === false ? (
      <Swiper
        horizontal={false} 
        showsPagination={false} 
        loop={false}
      >
        <View style={styles.slide}>
          <Group1 />
        </View>
        <View style={styles.slide}>
          <Group2 />
        </View>
      </Swiper>
        ) : null} 
    </View>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;

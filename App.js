import React, { useState, useEffect } from 'react';
import { Animated, View, StyleSheet, ScrollView, Text } from 'react-native';
import Splash from './views/screens/splash';
import Swiper from 'react-native-swiper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { NavigationContainer } from '@react-navigation/native';


import Group1 from './Group1';
import Group2 from './Group2';

const App = () => {

  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);

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
            sensitivity={0.5}
            loop={false}
            index={currentPage}
            onIndexChanged={index => setCurrentIndex(index)}
          >
            <View style={styles.slide}>
              <Group1
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                currentIndex={currentIndex}
                setCurrentIndex={setCurrentIndex}
                subIndex={subIndex}
                setSubIndex={setSubIndex}
              />
            </View>
            <View style={styles.slide}>
              <Group2
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                currentIndex={currentIndex}
                setCurrentIndex={setCurrentIndex}
                subIndex={subIndex}
                setSubIndex={setSubIndex}
              />
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
import React, { useState, useEffect } from 'react';
import { Animated, Dimensions, ScrollView, StyleSheet, View } from 'react-native';

import GroupVideo from './views/screens/GroupVideo';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList } from 'react-native-gesture-handler';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;


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
const transitionAnimation = index => {
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


const ScrollAppComponent = ({ data, renderItem }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: yOffset } } }],
    {
      useNativeDriver: true,
      listener: event => {
        const offset = event.nativeEvent.contentOffset.y;
        const currentIndex = Math.round(offset / SCREEN_HEIGHT);
        setCurrentIndex(currentIndex);
      },
    }
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item, index }) => (
          <Screen key={item.id} index={index}>
            {renderItem(item, currentIndex)}
          </Screen>
        )}
        keyExtractor={item => item.id.toString()}
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        onScroll={handleScroll}
      />
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
});

export default ScrollAppComponent;
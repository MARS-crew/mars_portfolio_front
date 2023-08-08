import React, { useState, useEffect } from 'react';
import {
  Animated,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import InterviewContents from './InterviewContents'; // Interview 컴포넌트를 import
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

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


const interviewFiles = [
  {
    id: 1,
    path: require('../../assets/videos/interviewVideo.mp4'),
  },
  {
    id: 2,
    path: require('../../assets/videos/interviewVideo.mp4'),
  },
  {
    id: 3,
    path: require('../../assets/videos/interviewVideo.mp4'),
  },
];

const Interview = (props) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
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
    }
  );

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        scrollEventThrottle={16}
        onScroll={handleScroll}
        pagingEnabled
        style={styles.scrollView}>
        {interviewFiles.map((interview, index) => (
          <Screen key={interview.id} index={index}>
            <InterviewContents
              path={interview.path}
              currentPage={props.currentPage}
              currentIndex={currentIndex}
              index={index}
              isPlaying={currentIndex === index && isPlaying}
              setIsPlaying={setIsPlaying}
            />
          </Screen>
        ))}
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  scrollView: {
    flex: 1,
    flexDirection: 'column',
  },
  screen: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

export default Interview;
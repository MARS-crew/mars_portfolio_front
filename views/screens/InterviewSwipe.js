import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, SafeAreaView, ImageBackground, Animated } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Interview from './Interview'; // 다른 interview 데이터를 보여줄 Interview 컴포넌트를 불러옴

const interviewsData = [
  [
    { filePath: '' },
    { filePath: '' },
    { filePath: '' },
  ],
];
const windowHeight = Dimensions.get('window').height;


const InterviewSwipe = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const panY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    panY.setOffset(-currentIndex * windowHeight);
  }, [currentIndex]);

  const translateY = panY.interpolate({
    inputRange: [(currentIndex - 1) * windowHeight, currentIndex * windowHeight, (currentIndex + 1) * windowHeight],
    outputRange: [-windowHeight, 0, windowHeight],
    extrapolate: 'clamp',
  });

  const onSwipeDown = () => {
    if (currentIndex < interviewsData.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const onSwipeUp = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <PanGestureHandler
        onGestureEvent={Animated.event([{ nativeEvent: { translationY: panY } }], {
          useNativeDriver: true,
        })}
        onHandlerStateChange={(event) => {
          if (event.nativeEvent.oldState === 4) {
            if (event.nativeEvent.translationY > 0) {
              onSwipeDown();
            } else {
              onSwipeUp();
            }
            Animated.spring(panY, {
              toValue: 0,
              useNativeDriver: true,
            }).start();
          }
        }}
      >
        <Animated.View style={[styles.interviewsContainer, { transform: [{ translateY }] }]}>
          {interviewsData.map((interview, index) => (
            <View key={index} style={styles.interviewContainer}>
              <Interview data={interview} />
            </View>
          ))}
        </Animated.View>
      </PanGestureHandler>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F4F9',
    height: '100%',
    width: '100%',
  },
  interviewsContainer: {
    flexDirection: 'column',
    // height: '100%',
  },
  interviewContainer: {
    height: '100%',
    // width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default InterviewSwipe;
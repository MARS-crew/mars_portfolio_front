import React, { useState, useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import axios from 'axios';
import InterviewContents from './InterviewContents'; // Interview 컴포넌트를 import
import SwiperFlatList from 'react-native-swiper-flatlist';
import { useIndexContext } from '../../IndexContext';

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

const Item = ({ id, path }) => (
  <View>
    <InterviewContents id={id} path={path} />
  </View>
);

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
    path: '../../assets/videos/interviewVideo.mp4',
  },
  {
    id: 2,
    path: require('./interviewVideo.mp4'),
  },
  {
    id: 3,
    path: require('../../assets/video/mars_profil1.mp4'),
  },
];

const Interview = () => {
  const { currentIndex, changeIndex } = useIndexContext();
  const swiperRef = useRef(null);

  useEffect(() => {
    if (swiperRef.current && data.length > 0 && currentIndex !== undefined) {
      swiperRef.current.scrollToIndex({
        index: currentIndex,
        animated: true,
      });
    }
  }, [currentIndex, swiperRef]);

  const height = Dimensions.get('window').height;
  const handleScroll = event => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const newIndex = Math.round(offsetY / height);
    // IndexData.setIndexValue(index);
    changeIndex(newIndex);
  }
  console.log('3번째 스크린 기수 인덱스: ', currentIndex);


  const [data, setData] = useState([]);
  useEffect(() => {
    const source = axios.CancelToken.source();
    axios({
      method: 'get',
      url: 'http://10.0.2.2:3000/api/v1/interview/',
      headers: {
        Authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InNuc19pZCI6MjMsIm1lbWJlcl9pZCI6NDksInR5cGUiOiJnb29nbGUiLCJuYW1lIjoi7J2R7J6JIiwiYWNjZXNzX3Rva2VuIjoieWEyOS5hMEFmQl9ieUFZOXJJMktuYzZjNnh2QW5sWGhqZjRFOFZOaEZRRXZQeS1oT2hzZDE1LVNka1lDSGZ0YVUxaXJXV1FsNGRSa3RXTnliM3BUX0FUNGtxU09VY0oycDV2ek5Cb0tSZnBsdHUyNE1GNE5vMkZaeTRDRWR4akRuRVJEdExfam5wQ2RPTXpERXRqQlZpdmd6RU84M3o0a3hoU0ZGQ2ZtaF92YUNnWUtBZjhTQVJJU0ZRSEdYMk1pRVpVS2xYYmRHY1Jyb09FZElnVDhYdzAxNzEiLCJyZWZyZXNoX3Rva2VuIjpudWxsLCJhdXRoX2NvZGUiOm51bGwsImNvbm5lY3RfZGF0ZSI6IjIwMjMtMTEtMTVUMjM6NTY6MDkuMDAwWiJ9LCJpYXQiOjE3MDA3MDAzODEsImV4cCI6MTcwMDcwMzk4MX0.648SL5NvfKCKtqHeCobRcZZWKqPbKwa4O-fIuNZARlY',
      },
      cancelToken: source.token,
    })
      .then(function (response) {
        const extractedData = response.data.data.map(item => ({
          url: item.url,
        }));
        // setData(extractedData);

        // console.log(extractedData);

        const slicedData = extractedData.slice(1);

        setData(slicedData);

        console.log(slicedData);

      })
      .catch(function (error) {
        console.log(error);
      });

    return () => {
      isMounted = false;
      source.cancel('API 호출이 취소되었습니다.');
    };
  }, []);

  return (
    // <Animated.ScrollView
    //   ref={swiperRef}
    //   scrollEventThrottle={16}
    //   // onScroll={handleScroll}
    //   pagingEnabled
    //   style={styles.scrollView}>
    //   {data.map((item, index) => (
    //     <Animated.View key={index} index={index} style={[styles.screen, transitionAnimation(index)]}>
    //       <InterviewContents path={item.url} />
    //     </Animated.View>
    //   ))}
    // </Animated.ScrollView>
    <SafeAreaView style={styles.container}>
      <SwiperFlatList
        ref={swiperRef}
        vertical={true}
        data={data}
        renderItem={({ item }) => <InterviewContents id={item.id} path={item.url} />}
        index={currentIndex}
        onScroll={handleScroll}
        hideShadow={true}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  scrollView: {
    flex: 1,
    flexDirection: 'column',
  },
  scrollPage: {
    width: SCREEN_WIDTH,
    padding: 0,
  },
  screen: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Interview;

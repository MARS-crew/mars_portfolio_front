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
    path: require('../../assets/videos/interviewVideo.mp4'),
  },
  {
    id: 2,
    path: '',
  },
  {
    id: 3,
    path: '',
  },
];

const Interview = () => {
  const { currentIndex, changeIndex } = useIndexContext();
  const swiperRef = useRef(null);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.scrolltoIndex({
        index: currentIndex,
        animated: true,
      });
    }
  }, [currentIndex, swiperRef]);

  const height = Dimensions.get('window').height;
  const handleScroll = event => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const newIndex = Math.round(offsetY / height);
    changeIndex(newIndex);
  };
  console.log('3번째 스크린 기수 인덱스: ', currentIndex);


  const [data, setData] = useState([]);
  useEffect(() => {
    const source = axios.CancelToken.source();
    axios({
      method: 'get',
      url: 'http://10.0.2.2:3000/api/v1/interview/',
      headers: {
        Authorization:
          'eyJ1c2VyIjp7Im1lbWJlcl9pZCI6NDksImVtYWlsIjoibm5ubm5ubmlhbTFAZ21haWwuY29tIiwibmFtZSI6IuydkeyeiSIsInRlbCI6bnVsbCwiYmlydGgiOm51bGwsImZpbGVfaWQiOm51bGwsImRlbF95biI6Ik4iLCJyZWdfZGF0ZSI6IjIwMjMtMTEtMTVUMjM6NTY6MDkuMDAwWiIsIm1vZF9kYXRlIjoiMjAyMy0xMS0xNVQyMzo1NjowOS4wMDBaIn0sImlhdCI6MTcwMDEyNDk3MCwiZXhwIjoxNzAwMTI4NTcwfQ',
      },
      cancelToken: source.token,
    })
      .then(function (response) {
        const extractedData = response.data.data.map(item => ({
          url: item.url,
        }));
        setData(extractedData);

        console.log(extractedData);

        //console.log(response);
        // console.log(
        //   'file_id--------------------------------------------------',
        // );
        // console.log(
        //   response.data.data.map(item => ({
        //     file_id: item.file_id,
        //   })),
        // );
        // console.log('ext--------------------------------------------------');
        // console.log(
        //   response.data.data.map(item => ({
        //     ext: item.ext,
        //   })),
        // );
        // console.log('uri--------------------------------------------------');
        // console.log(
        //   response.data.data.map(item => ({
        //     url: item.url,
        //   })),
        // );
        // console.log('del_yn--------------------------------------------------');
        // console.log(
        //   response.data.data.map(item => ({
        //     del_yn: item.del_yn,
        //   })),
        // );
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
    <Animated.ScrollView
      scrollEventThrottle={16}
      onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: yOffset } } }], {
        useNativeDriver: true,
      })}
      pagingEnabled
      style={styles.scrollView}>
      {data.map((item, index) => (
        <Screen key={index} index={index}>
          <InterviewContents path={item.url} />
        </Screen>
      ))}
    </Animated.ScrollView>
    // <SafeAreaView style="StyleSheet.container">
    //   <SwiperFlatList
    //     ref={swiperRef}
    //     vertical={true}
    //     data={interviewFiles}
    //     renderItem={({ item }) => <Item id={item.id} path={item.url} />}
    //     initialScrollIndex={currentIndex}
    //     hideShadow={true}
    //     onScroll={handleScroll}
    //   />
    // </SafeAreaView>
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

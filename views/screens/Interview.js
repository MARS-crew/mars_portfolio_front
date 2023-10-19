import React, {useState, useEffect} from 'react';
import {
  Animated,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import axios from 'axios';
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
      {perspective: 800},
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
  const [data, setData] = useState([]);
  useEffect(() => {
    const source = axios.CancelToken.source();
    axios({
      method: 'get',
      url: 'http://10.0.2.2:3000/api/v1/interview/',
      headers: {
        Authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InNuc19pZCI6MjAsIm1lbWJlcl9pZCI6NDYsInR5cGUiOiJnb29nbGUiLCJuYW1lIjoi7Zi465Sx7J20IiwiYWNjZXNzX3Rva2VuIjoieWEyOS5hMEFmQl9ieUN5WG5uUWk5WF9sSGgwM0VERXlpRTNQMmZ3Q25IbGtkYmRIY2l4VGRzNTQtZDRKM285ckYzV2c2YnVGeEg3Yk9aLWxLQlNPNG1qUnpxd2Mzb2RMeF9nYmUzRmhYdElRQldyVEtldnItWS1BMTdxa0tfd2FGT1dfeV9JWjFpVncwRG9PcFZpa3JST0RMa3NqeGtuQWFHVDBfY0NUYUZSYUNnWUtBVFlTQVJNU0ZRR09jTm5DLWdONzNtNkdNQnpHeXA4S0o3b2x1ZzAxNzEiLCJyZWZyZXNoX3Rva2VuIjpudWxsLCJhdXRoX2NvZGUiOm51bGwsImNvbm5lY3RfZGF0ZSI6IjIwMjMtMTAtMDlUMDI6NDk6MjcuMDAwWiJ9LCJpYXQiOjE2OTc2OTY1NTksImV4cCI6MTY5NzcwMDE1OX0.P8khH_mybYKLJAU7e_7hGArt8P8blre6Ky-gNtPe2x0',
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
      onScroll={Animated.event([{nativeEvent: {contentOffset: {y: yOffset}}}], {
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
  );
};

const styles = StyleSheet.create({
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

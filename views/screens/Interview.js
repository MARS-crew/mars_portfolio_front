import React, {useState, useEffect, useRef} from 'react';
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
import {useIndexContext} from '../../IndexContext';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
const yOffset = new Animated.Value(0);

const Interview = ({token}) => {
  const {currentIndex, changeIndex} = useIndexContext();
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
  };
  // console.log('3번째 스크린 기수 인덱스: ', currentIndex);

  const [data, setData] = useState([]);
  useEffect(() => {
    const source = axios.CancelToken.source();
    axios({
      method: 'get',
      url: 'http://172.16.101.59:3000/api/v1/interview/',
      // url: 'http://api.mars-port.duckdns.org/api/v1/interview/',
      headers: {
        Authorization: token,
      },
      cancelToken: source.token,
    })
      .then(function (response) {
        const extractedData = response.data.data.map(item => ({
          memberId: item.member_id, //사용자 아이디
          url: `http://10.0.2.2:3000/${item.url.replace(
            'http://172.20.10.4:3000/',
            '',
          )}`, //인터뷰 url
          heart: item.heart, //찜하기 여부
        }));
        setData(extractedData);
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
    <SafeAreaView style={styles.container}>
      <SwiperFlatList
        ref={swiperRef}
        vertical={true}
        data={data}
        renderItem={({item}) => (
          <InterviewContents id={item.memberId} path={item.url} token={token} />
        )}
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

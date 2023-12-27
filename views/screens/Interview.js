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

const Interview = ({ token }) => {
  const swiperRef = useRef(null);
  const { currentIndex, changeIndex, horizontalIndex, changeHorizontalIndex, dataIndex, changeDataIndex, selectedMemId, changeSelectedMemId } = useIndexContext();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (swiperRef.current && data.length > 0 && currentIndex !== undefined) {
      swiperRef.current.scrollToIndex({
        index: dataIndex,
        animated: true,
      });
    }
  }, [dataIndex, swiperRef]);

  const height = Dimensions.get('window').height;


  const handleVerticalScroll = event => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const newIndex = Math.round(offsetY / height);
    const selectedData = data[newIndex];
    if (selectedData) {
      changeSelectedMemId(selectedData.memberId);
    }
    changeDataIndex(newIndex);
    // if (horizontalIndex !== 0 && horizontalIndex !== 1) {
    //   changeHorizontalIndex(1);
    // }
  };
  useEffect(() => {
    // selectedMemId에 해당하는 memberId를 찾기
    const selectedDataIndex = data.findIndex(item => item.memberId === selectedMemId);
    changeDataIndex(selectedDataIndex !== -1 ? selectedDataIndex : 0);

    // dataIndex 업데이트
    changeDataIndex(dataIndex);
  }, [selectedMemId, data]);

  useEffect(() => {
    const source = axios.CancelToken.source();
    axios({
      method: 'get',
      // url: 'http://api.mars-port.duckdns.org/api/v1/interview/',
      url: 'http://172.20.10.4:3000/api/v1/interview/',
      headers: {
        Authorization: token,
      },
      cancelToken: source.token,
    })
      .then(function (response) {
        console.log(response.data.data);
        const extractedData = response.data.data.map(item => ({
          groupId: item.group_id, // 그룹 아이디
          memberId: item.member_id, //사용자 아이디
          url: `http://10.0.2.2:3000/${item.url.replace(
            'http://172.20.10.4:3000/',
            '',
          )}`, //인터뷰 url
          heart: item.heart, //찜하기 여부
        }));
        setData(extractedData);
        // console.log(extractedData);
        // console.log('datadata::::' + extractedData[0].memberId);
        // console.log('datadata::::' + extractedData[0].url);
        // console.log('datadata::::' + extractedData[0].heart);

        const selectedDataIndex = data.findIndex(item => item.memberId === selectedMemId);
        console.log(selectedDataIndex);
        changeDataIndex(selectedDataIndex !== -1 ? selectedDataIndex : 0);

        // dataIndex 업데이트
        changeDataIndex(dataIndex);
      })
      .catch(function (error) {
        console.log(error);
      });

    return () => {
      isMounted = false;
      source.cancel('API 호출이 취소되었습니다.');
    };
  }, [selectedMemId]);

  return (
    <SafeAreaView style={styles.container}>
      <SwiperFlatList
        ref={swiperRef}
        vertical={true}
        data={data}
        renderItem={({ item }) => (
          <InterviewContents id={item.memberId} path={item.url} token={token} />
        )}
        index={dataIndex}
        onScroll={handleVerticalScroll}
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

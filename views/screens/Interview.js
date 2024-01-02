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
import SwiperFlatList from 'react-native-swiper-flatlist';
import _, { first } from 'lodash';  // lodash 라이브러리 사용
import InterviewContents from './InterviewContents'; // Interview 컴포넌트를 import
import { useIndexContext } from '../../IndexContext';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
const yOffset = new Animated.Value(0);

const Interview = ({ token }) => {
  const swiperRef = useRef(null);
  const { currentIndex, changeIndex,
    horizontalIndex, changeHorizontalIndex,
    dataIndex, changeDataIndex,
    selectedGroupId, changeSelectedGroupId,
    selectedMemId, changeSelectedMemId,
    selectedMember, changeSelectedMember } = useIndexContext();
  const [data, setData] = useState([]);
  const [prevSelectedGroupId, setPrevSelectedGroupId] = useState(selectedGroupId);
  const [prevSelectedMemId, setPrevSelectedMemId] = useState(selectedMemId);
  const [check, setCheck] = useState(!selectedMember);

  useEffect(() => {
    if (swiperRef.current && data.length > 0 && currentIndex !== undefined) {
      swiperRef.current.scrollToIndex({
        index: dataIndex,
        animated: true,
      });
    }
  }, [dataIndex, swiperRef]);

  const height = Dimensions.get('window').height;

  // 스와이프 진행시 인덱스 변경
  const handleVerticalScroll = event => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const newIndex = Math.round(offsetY / height);
    const selectedData = data[newIndex];

    if (horizontalIndex == 2) {
      if (selectedData) {
        changeSelectedMemId(selectedData.memberId);
        console.log("dd");
        if (selectedData.groupId !== selectedGroupId) {
          changeSelectedGroupId(selectedData.groupId);
        }
      }
      changeDataIndex(newIndex);
    }
  };


  useEffect(() => {
    const findFirstMemberIndexInGroup = (groupId) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].groupId === groupId) {
          return i;
        }
      }
      return -1;
    };

    if (horizontalIndex == 1) {
      const firstMemberIndex = findFirstMemberIndexInGroup(selectedGroupId);
      changeSelectedMemId(firstMemberIndex !== -1 ? data[firstMemberIndex].memberId : 1);
      changeDataIndex(firstMemberIndex !== -1 ? firstMemberIndex : 0);
      setPrevSelectedMemId(selectedMemId);
      setPrevSelectedGroupId(selectedGroupId);
    }
    // if (horizontalIndex == 2 && selectedMember) {
    //   console.log("zz");
    //   const memberIndex = data.findIndex(member => member.memberId === selectedMemId);
    //   changeDataIndex(memberIndex);
    //   changeSelectedMember(false);
    // }

  }, [horizontalIndex, currentIndex]);





  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchData = async () => {
      try {
        const response = await axios({
          method: 'get',
          // url: `http://api.mars-port.duckdns.org:3000/api/v1/interview`,
          url: 'http://172.20.10.4:3000/api/v1/interview/',
          headers: {
            Authorization: token,
          },
          cancelToken: source.token,
        });

        const extractedData = response.data.data.map(item => ({
          groupId: item.group_id,
          memberId: item.member_id,
          url: `http://10.0.2.2:3000/${item.url.replace(
            'http://172.20.10.4:3000/',
            '',
          )}`,
          heart: item.heart,
        }));

        const sortedAndGroupedData = _.chain(extractedData)
          .sortBy('groupId', 'memberId')
          .uniqBy('memberId')
          .value();

        setData(Object.values(sortedAndGroupedData));
        console.log(data);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Request canceled', error.message);
        } else {
          console.log(error);
        }
      } finally {
        source.cancel('API 호출이 취소되었습니다.');
      }
    };

    fetchData();

    // Cleanup function
    return () => {
      // Cancel the API call if the component is unmounted
      console.log('Component unmounted. Cancelling API call.');
      source.cancel('API 호출이 취소되었습니다.');
    };
  }, [token]);


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

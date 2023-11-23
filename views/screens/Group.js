import React, { useContext, useState, useRef, useEffect } from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  FlatList,
  Text,
  SafeAreaView,
} from 'react-native';

import GroupItem from '../components/GroupItem';
import SwiperFlatList from 'react-native-swiper-flatlist';
import SwiperFlatListComponent from '../components/SwiperFlatListComponent';
// import AppContext from '../../AppContext';
import { useIndexContext } from '../../IndexContext';


const Item = ({ id, src, medal }) => (
  <View>
    <GroupItem id={id} src={src} medal={medal} />
  </View>
);

const Group = ({ data, swiperIndex, setSwiperIndex }) => {
  // const handleScroll = (event) => {
  //   const { height } = Dimensions.get('window'); // 화면의 높이 가져오기
  //   const offsetY = event.nativeEvent.contentOffset.y;
  //   const index = Math.floor(offsetY / height); // 스크롤 위치를 화면의 높이로 나누어 인덱스 계산
  //   console.log('offsetY:', offsetY);
  //   console.log('index:', index);
  //   setSwiperIndex(index); // 계산된 인덱스를 상태로 설정
  // };
  //const {width, height} = Dimensions.get('window');

  // console.log(swiperIndex)
  // const IndexData = useContext(AppContext);
  const { currentIndex, changeIndex } = useIndexContext();
  const swiperRef = useRef(null);

  // useEffect(() => {
  //   if (swiperRef.current) {
  //     swiperRef.current.scrollToIndex({
  //       index: currentIndex,
  //       animated: true,
  //     });
  //   }
  // }, [currentIndex]);

  useEffect(() => {
    if (swiperRef.current) {
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
    //console.log('스크롤 거리값:', Math.floor(offsetY));
    //console.log('세로 화면  값:', Math.floor(height));
    // console.log('인덱스 값 (전체 거리 /세로 1 화면):', offsetY / height);
  };

  console.log('1번 스크린 기수 비디오:', currentIndex);
  return (
    <SafeAreaView style={StyleSheet.container}>
      <SwiperFlatList
        ref={swiperRef}
        vertical={true}
        data={data}
        renderItem={({ item }) => <Item id={item.id} src={item.src} />}
        index={currentIndex}
        hideShadow={true}
        onScroll={handleScroll}
      />
      {/* <SwiperFlatList
        vertical={true}
        onScroll={handleScroll}
        initialScrollIndex={3} // 0부터 시작하므로 두 번째 페이지는 인덱스 1입니다.
        data={[
          {key: '1', text: 'Page 1'},
          {key: '2', text: 'Page 2'},
          {key: '3', text: 'Page 3'},
          {key: '4', text: 'Page 4'},
        ]}
        renderItem={({item}) => (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              width: width,
              height: height,
              backgroundColor: 'skyblue',
            }}>
            <Text>{item.text}</Text>
          </View>
        )}
      /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
});

export default Group;

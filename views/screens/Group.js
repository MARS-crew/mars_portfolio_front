import React, { useContext, useStater } from 'react';
import { Dimensions, StyleSheet, View, FlatList, SafeAreaView } from 'react-native';

import GroupItem from '../components/GroupItem';
import SwiperFlatList from 'react-native-swiper-flatlist';
import SwiperFlatListComponent from '../components/SwiperFlatListComponent';
import AppContext from '../../AppContext';

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
  const IndexData = useContext(AppContext);
  const height = Dimensions.get('window').width;
  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.floor(offsetY / height);
    IndexData.setIndexValue(index);
    console.log(IndexData.swiperIndex)
  };

  return (
    <SafeAreaView style={StyleSheet.container}>
      <SwiperFlatList
        vertical={true}
        data={data}
        renderItem={({ item }) => <Item id={item.id} src={item.src} />}
        initialScrollIndex={IndexData.swiperIndex}
        hideShadow={true}
        onScroll={handleScroll}

      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
});

export default Group;

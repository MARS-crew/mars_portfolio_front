import React, {useContext, useState, useRef, useEffect} from 'react';
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
import {useIndexContext} from '../../IndexContext';

const Item = ({id, src, medal, token}) => (
  <View>
    <GroupItem id={id} src={src} medal={medal} token={token} />
  </View>
);

const Group = ({data, token}) => {
  const {currentIndex, changeIndex} = useIndexContext();
  const swiperRef = useRef(null);

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
    changeIndex(newIndex);
  };

  return (
    <SafeAreaView style={StyleSheet.container}>
      <SwiperFlatList
        ref={swiperRef}
        vertical={true}
        data={data}
        renderItem={({item}) => (
          <Item id={item.id} src={item.src} token={token} />
        )}
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

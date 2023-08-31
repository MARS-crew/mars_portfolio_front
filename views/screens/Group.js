import {React, useState} from 'react';
import {StyleSheet, View, FlatList, SafeAreaView} from 'react-native';
import {SwiperFlatList} from 'react-native-swiper-flatlist';

import GroupItem from '../components/GroupItem';
import GroupVideo from './GroupVideo';

const Item = ({id, src, medal}) => (
  <View>
    <GroupItem id={id} src={src} medal={medal} />
  </View>
);

const Group = ({data}) => {
  const ITEM_HEIGHT = 100;
  const {pageIndex, setPageIndex} = setPageIndex(0);
  const handleScroll = event => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const pageIndex = Math.floor(offsetY / ITEM_HEIGHT);
    const setPageIndex = item => {
      return item;
    };
    setPageIndex(pageIndex);
  };
  return (
    <SafeAreaView style={styles.container}>
      <SwiperFlatList
        vertical={true}
        data={data}
        renderItem={({item}) => <Item id={item.id} src={item.src} />}
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

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
import {useIndexContext} from '../../IndexContext';

const Item = ({id, src, medal, token}) => (
  <View>
    <GroupItem id={id} src={src} medal={medal} token={token} />
  </View>
);

const Group = ({ data, token, fileData }) => {
  const { currentIndex, changeIndex } = useIndexContext();
  const swiperRef = useRef(null);

  useEffect(() => {
    if (swiperRef.current && fileData && fileData.length > 0) {
      swiperRef.current.scrollToIndex({
        index: currentIndex,
        animated: true,
      });
    }
  }, [currentIndex, fileData]);

  const height = Dimensions.get('window').height;
  const handleScroll = event => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const newIndex = Math.round(offsetY / height);
    changeIndex(newIndex);
  };

  if (!fileData || fileData.length === 0) {
    return <View><Text>Loading...</Text></View>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <SwiperFlatList
        ref={swiperRef}
        vertical={true}
        data={fileData}
        renderItem={({ item }) => (
          <Item id={item.group_id} src={item.url} token={token} />
        )}
        index={currentIndex}
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
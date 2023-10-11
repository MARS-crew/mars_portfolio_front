import { React, useState } from 'react';
import { StyleSheet, View, FlatList, SafeAreaView } from 'react-native';

import GroupItem from '../components/GroupItem';
import SwiperFlatList from 'react-native-swiper-flatlist';
import SwiperFlatListComponent from '../components/SwiperFlatListComponent';

const Item = ({ id, src, medal }) => (
  <View>
    <GroupItem id={id} src={src} medal={medal} />
  </View>
);

const Group = ({ data }) => {
  const Item_HEIGHT = 100;
  const { pageIndex, setPageIndex } = useState(0);
  const handleScroll = event => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const pageIndex = Math.floor(offsetY / Item_HEIGHT);
    const setPageIndex = item => {
      return item;
    };
    setPageIndex(pageIndex);
  };

  return (
    <SwiperFlatListComponent
      data={data}
      renderItem={({ item }) => <Item id={item.id} src={item.src} />}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
});

export default Group;

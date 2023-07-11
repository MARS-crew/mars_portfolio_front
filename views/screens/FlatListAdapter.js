import React from 'react';
import {Text, Dimensions, StyleSheet, View} from 'react-native';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import Interview from './Interview';
import Portfolio from './Portfolio';

const colors = ['tomato', 'thistle', 'skyblue', 'teal'];

const DATA = [
  {id: 1, page: <Portfolio />},
  {id: 2, page: <Portfolio />},
  {id: 3, page: <Portfolio />},
  {id: 4, page: <Portfolio />},
];

const FlatListAdapter = () => (
  <View>
    <SwiperFlatList
      vertical={true}
      index={0}
      showPagination
      data={DATA}
      renderItem={({item}) => item.page}
    />
  </View>
);

const {width} = Dimensions.get('window');
const {height} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {flex: 1, width, height, backgroundColor: 'black'},
  child: {width, height, justifyContent: 'center'},
});

export default FlatListAdapter;

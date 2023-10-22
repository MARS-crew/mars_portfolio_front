import React, { useState, useEffect, useContext } from 'react';
import {
  Animated,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
  SafeAreaView
} from 'react-native';
import InterviewContents from './InterviewContents'; // Interview 컴포넌트를 import
import SwiperFlatList from 'react-native-swiper-flatlist';
import SwiperFlatListComponent from '../components/SwiperFlatListComponent';

import AppContext from '../../AppContext';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const DATA = [
  {
    group: '1기',
    id: 'nn',
    path: require('../../assets/videos/interviewVideo.mp4'),
    merdal: 'n'

  },
  {
    group: '1기',
    id: 'n1',
    path: require('../../assets/videos/interviewVideo.mp4'),
    merdal: 'n'

  },
  {
    group: '1기',
    id: 'n2',
    path: "",
    merdal: 'n'

  },
  {
    group: '1기',
    id: 'n3',
    path: "",
    merdal: 'n'

  },
  {
    group: '1기',
    id: 'n4',
    path: "",
    merdal: 'n',
  }
];

const InterviewItem = ({ id, path, merdal }) => {
  return (
    <View>
      <InterviewContents id={id} path={path} merdal={merdal} />
    </View>
  );

}

const Interview = ({ data }) => {
  const IndexData = useContext(AppContext);
  const height = Dimensions.get('window').width;
  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.floor(offsetY / height);
    IndexData.setIndexValue(index);
    console.log(IndexData.swiperIndex)
  };

  return (
    <SafeAreaView style={styles.containbox}>
      <SwiperFlatList
        vertical={true}
        data={DATA}
        renderItem={({ item }) => (
          <InterviewItem id={item.id} path={item.path} merdal={item.merdal} />
        )}
        initialScrollIndex={IndexData.swiperIndex}
        hideShadow={true}
        onScroll={handleScroll}
      />
    </SafeAreaView>

  );
};
const styles = StyleSheet.create({
  containbox: {
    flex: 1,
    backgroundColor: 'white',
  },
  button: {
    width: 40,
    height: 20,
    position: 'absolute',
  },
  container: {
    backgroundColor: 'white',
  },
  manyRow: {
    flex: 1,
    flexDirection: 'row',
  },
});

export default Interview;
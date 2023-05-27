import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Dimensions,
} from 'react-native';

import PortfolioItem from '../components/PortfolioItem';
import Camera from '../../assets/images/camera.png';
import Link from '../../assets/images/Link.png';
const DATA = [
  {
    id: 'Video',
    title: '(TEST)_영상 데이터 영역',
    img: require('../../assets/images/camera.png'),
  },
  {
    id: 'Photo',
    title: '(TEST)_사진 데이터 영역',
    img: require('../../assets/images/camera.png'),
  },
  {
    id: 'Link',
    title: '(TEST)_링크 데이터 영역',
    img: require('../../assets/images/Link.png'),
  },
  {
    id: 'Project',
    title: '(TEST)_참여 프로젝트 영역',
    img: require('../../assets/images/camera.png'),
  },
  {
    id: 'More',
    title: '(TEST)_추가 데이터 영역',
    img: require('../../assets/images/add.png'),
  },
];
const Item = ({title}) => (
  <View>
    <PortfolioItem></PortfolioItem>
  </View>
);

const Portfolio = () => {
  const numColumns = 2;
  return (
    <View>
      <SafeAreaView style={{marginTop: 0}}>
        <View>
          <FlatList
            data={DATA}
            renderItem={({item}) => <Item title={item.title} />}
            keyExtractor={(item, index) => index}
            numColumns={numColumns}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};
const styles = StyleSheet.create({
  image: {
    width: 60,
    height: 60,
  },
});
export default Portfolio;

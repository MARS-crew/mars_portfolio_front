import React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import ResumeBox from '../components/ResumeBox';

const DATA = [
  {
    id: '1',
    title: '간단소개',
  },
  {
    id: '2',
    title: '기본정보',
  },
  {
    id: '3',
    title: '경력',
  },
  {
    id: '4',
    title: '수상내역',
  },
  {
    id: '5',
    title: '관심분야',
  },
  {
    id: '6',
    title: '전문분야',
  },
  {
    id: '7',
    title: '보유기술',
  },
];

const Resume = () => {
  const renderItem = ({item}) => <ResumeBox item={item} />;
  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 400,
    padding: 25,
    flex: 2,
    backgroundColor: '#F3F6FE',
  },
});

export default Resume;

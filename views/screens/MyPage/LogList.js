import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Title from '../../components/Title';
import {SwipeListView} from 'react-native-swipe-list-view';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textContainer: {
    width: '100%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  styledText: {
    color: '#111',
    fontWeight: 'bold',
  },
  swipeListItem: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderBottomColor: '#F5F5F5',
    borderBottomWidth: 1,
    height: 40,
    backgroundColor: '#FDFDFD',
  },
  swipeHiddenItemContainer: {
    flex: 1,
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  swipeHiddenItem: {
    backgroundColor: '#FFE9EA',
    width: 70,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  swipeHiddenItemText: {
    color: 'white',
    fontSize: 14,
  },
});

const LogList = list => {
  const [text, setText] = useState('Not Pressed');
  const [listData, setListData] = useState(selectedData());
  const LIST__DATA = Array();

  function selectedData() {
    if (list == '방문기록') return LIST_VIEW_DATA;
    else if (list == '좋아요') return LIST_LIKE_DATA;
    else if (list == '찜하기') return LIST_WANT_DATA;
  }

  var data = '2023.11.';
  const LIST_VIEW_DATA = Array(30)
    .fill('')
    .map((_, i) => ({
      key: `${i}`,
      text: `김채린님이 회원님을 방문하였습니다.`,
      date: `${data}${i + 1}`,
    }));

  const LIST_LIKE_DATA = Array(8)
    .fill('')
    .map((_, i) => ({
      key: `${i}`,
      text: `조호연님이 회원님의 리뷰에 좋아요를 눌렀습니다.`,
    }));
  const LIST_WANT_DATA = Array(20)
    .fill('')
    .map((_, i) => ({
      key: `${i}`,
      text: `김건우님이 회원님의 인터뷰 영상을 찜하였습니다.`,
    }));

  console.log(listData);

  return (
    <SafeAreaView style={styles.container}>
      <SwipeListView
        data={LIST_VIEW_DATA}
        renderItem={({item}) => (
          <View style={styles.swipeListItem}>
            <Title color={'black'}>{item.text}</Title>
            <Title>{item.date}</Title>
          </View>
        )}
        renderHiddenItem={(data, rowMap) => (
          <View style={styles.swipeHiddenItemContainer}>
            <TouchableOpacity></TouchableOpacity>
            <TouchableOpacity onPress={() => setText('right is pressed')}>
              <View style={styles.swipeHiddenItem}>
                <Title color={'#FF3040'} fontSize={16} fontWeight={'700'}>
                  삭제
                </Title>
              </View>
            </TouchableOpacity>
          </View>
        )}
        leftOpenValue={70}
        rightOpenValue={-70}
      />
    </SafeAreaView>
  );
};
export default LogList;

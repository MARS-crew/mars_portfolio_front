import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import Title from '../../components/commonComponent/Title';
import {SwipeListView} from 'react-native-swipe-list-view';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  swipeListItem: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#F5F5F5',
    borderBottomWidth: 1,
    backgroundColor: '#FDFDFD',
  },
  swipeHiddenItemContainer: {
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
});

const LogList = ListData => {
  const [text, setText] = useState('Not Pressed');
  const [myListData, setMyListData] = useState(ListData.ListData);

  return (
    <SafeAreaView style={styles.container}>
      <SwipeListView
        data={myListData}
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

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
  log: {
    paddingHorizontal: 15,
  },
  list: {
    height: 41,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#F5F5F5',
    borderBottomWidth: 1,
    backgroundColor: '#FDFDFD',
  },
  item: {paddingVertical: 12, paddingHorizontal: 15},
  deleteButton: {
    backgroundColor: '#FFE9EA',
    width: 90,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const LogList = () => {
  const [data, setData] = useState([
    {
      key: 1,
      text: `이세진님이 회원님을 방문하였습니다.`,
      date: `2023.11.01`,
      showDelete: false,
    },
    {
      key: 2,
      text: `고희주님이 회원님을 방문하였습니다.`,
      date: `2023.11.02`,
      showDelete: false,
    },
    {
      key: 3,
      text: `이화진님이 회원님을 방문하였습니다.`,
      date: `2023.11.03`,
      showDelete: false,
    },
    {
      key: 4,
      text: `임동현님이 회원님을 방문하였습니다.`,
      date: `2023.11.04`,
      showDelete: false,
    },
    {
      key: 5,
      text: `이가인님이 회원님을 방문하였습니다.`,
      date: `2023.11.05`,
      showDelete: false,
    },
    {
      key: 6,
      text: `김건우님이 회원님을 방문하였습니다.`,
      date: `2023.11.06`,
      showDelete: false,
    },
    {
      key: 7,
      text: `장여운님이 회원님을 방문하였습니다.`,
      date: `2023.11.07`,
      showDelete: false,
    },
    {
      key: 8,
      text: `김채린님이 회원님을 방문하였습니다.`,
      date: `2023.11.08`,
      showDelete: false,
    },
    {
      key: 9,
      text: `이화진님이 회원님을 방문하였습니다.`,
      date: `2023.11.09`,
      showDelete: false,
    },
    {
      key: 10,
      text: `조호연님이 회원님을 방문하였습니다.`,
      date: `2023.11.10`,
      showDelete: false,
    },
    {
      key: 11,
      text: `벡예나님이 회원님을 방문하였습니다.`,
      date: `2023.11.11`,
      showDelete: false,
    },
    {
      key: 12,
      text: `문효찬님이 회원님을 방문하였습니다.`,
      date: `2023.11.12`,
      showDelete: false,
    },
    {
      key: 13,
      text: `박수민님이 회원님을 방문하였습니다.`,
      date: `2023.11.13`,
      showDelete: false,
    },
    {
      key: 14,
      text: `김인후님이 회원님을 방문하였습니다.`,
      date: `2023.11.14`,
      showDelete: false,
    },
    {
      key: 15,
      text: `김주만님이 회원님을 방문하였습니다.`,
      date: `2023.11.15`,
      showDelete: false,
    },
    {
      key: 16,
      text: `김회윤님이 회원님을 방문하였습니다.`,
      date: `2023.11.16`,
      showDelete: false,
    },
  ]);
  const toggleDelete = key => {
    setData(prevData =>
      prevData.map(item =>
        item.key === key ? {...item, showDelete: !item.showDelete} : item,
      ),
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({item}) => (
          <View style={styles.list}>
            <TouchableOpacity
              style={styles.item}
              onPress={() => toggleDelete(item.key)}>
              <Title color={'black'}>{item.text}</Title>
            </TouchableOpacity>
            <View style={styles.log}>
              {!item.showDelete && <Title>{item.date}</Title>}
            </View>

            {item.showDelete && (
              <TouchableOpacity onPress={() => toggleDelete(item.key)}>
                <View style={styles.deleteButton}>
                  <Title color={'#FF3040'} fontSize={16} fontWeight={'700'}>
                    삭제
                  </Title>
                </View>
              </TouchableOpacity>
            )}
          </View>
        )}
        keyExtractor={item => item.key.toString()}
      />
    </View>
  );
};
export default LogList;

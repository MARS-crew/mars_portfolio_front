import {React} from 'react';
import {StyleSheet, View, FlatList, SafeAreaView} from 'react-native';

import ManyGroupItem from '../components/ManyGroupItem';

const DATA = [
  {
    id: '1',
    title: '1기',
    src: require('../../assets/images/Group.png'),
  },
  {
    id: '2',
    title: '2기',
    src: require('../../assets/images/Group.png'),
  },
  {
    id: '3',
    title: '3기',
    src: require('../../assets/images/Group.png'),
  },
  {
    id: '4',
    title: '4기',
    src: require('../../assets/images/Group.png'),
  },
  {
    id: '5',
    title: '5기',
    src: require('../../assets/images/Group.png'),
  },
  {
    id: '6',
    title: '6기',
    src: require('../../assets/images/Group.png'),
  },
  {
    id: '7',
    title: '7기',
    src: require('../../assets/images/Group.png'),
  },
  {
    id: '8',
    title: '8기',
    src: require('../../assets/images/Group.png'),
  },
];

const ManyItem = ({id, src}) => (
  <View>
    <ManyGroupItem id={id} src={src} />
  </View>
);

const Group = ({id}) => {
  return (
    <SafeAreaView style={styles.containbox}>
      <FlatList
        data={DATA}
        renderItem={({item}) => <ManyItem id={item.id} src={item.src} />}
        numColumns={2}
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

export default Group;

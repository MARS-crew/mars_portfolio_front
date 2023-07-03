import {React} from 'react';
import {StyleSheet, View, FlatList, SafeAreaView} from 'react-native';

import Main from './Main';
import GroupItem from '../components/GroupItem';
import GroupLogo from '../components/GroupLogo';

const Item = ({id, src}) => (
  <View>
    <GroupItem id={id} src={src} />
  </View>
);

const Group = ({data}) => {
  return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={data}
          renderItem={({item}) => <Item id={item.id} src={item.src} />}
        />
      </SafeAreaView>
    // </View>
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

import {React} from 'react';
import {StyleSheet, View, FlatList, SafeAreaView} from 'react-native';

import GroupItem from '../components/GroupItem';

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
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
});

export default Group;

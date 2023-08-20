import {React} from 'react';
import {StyleSheet, View, FlatList, SafeAreaView} from 'react-native';

import GroupItem from '../components/GroupItem';

const Item = ({id, src, medal}) => (
  <View>
    <GroupItem id={id} src={src} medal={medal} />
  </View>
);

const Group = ({data}) => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={({item}) => <Item id={item.id} src={item.src}  />}
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

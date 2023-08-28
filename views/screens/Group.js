import {React} from 'react';
import {StyleSheet, View, FlatList, SafeAreaView} from 'react-native';
import {SwiperFlatList} from 'react-native-swiper-flatlist';

import GroupItem from '../components/GroupItem';

const Item = ({id, src, medal}) => (
  <View>
    <GroupItem id={id} src={src} medal={medal} />
  </View>
);

const Group = ({data}) => {
  return (
    <SafeAreaView style={styles.container}>
      <SwiperFlatList
        vertical={true}
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

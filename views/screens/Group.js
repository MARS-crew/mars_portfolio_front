import {React} from 'react';
import {StyleSheet, View, FlatList, SafeAreaView, Text} from 'react-native';

import GroupItem from '../components/GroupItem';
import {SwiperFlatList} from 'react-native-swiper-flatlist';

const Item = ({id, src, medal}) => (
  <View>
    <GroupItem id={id} src={src} medal={medal} />
  </View>
);

const Group = ({data}) => {
  return (
    <SafeAreaView>
      <SwiperFlatList
        vertical={true}
        data={data}
        renderItem={({item}) => <Item id={item.name} src={item.url} />}
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

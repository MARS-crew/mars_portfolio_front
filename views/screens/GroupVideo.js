import {React} from 'react';
import {StyleSheet, View, FlatList, SafeAreaView} from 'react-native';

import ManyGroupItem from '../components/ManyGroupItem';
import GroupVideoItem from '../components/GroupVideoItem';

const VideoItem = ({id, video}) => (
  <View>
    <GroupVideoItem id={id} video={video} />
  </View>
);

const GroupVideo = ({data}) => {
  return (
    <SafeAreaView style={styles.containbox}>
      <FlatList
        data={data}
        renderItem={({item}) => <VideoItem id={item.id} src={item.video} />}
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

export default GroupVideo;

import {React} from 'react';
import {StyleSheet, View, FlatList, SafeAreaView} from 'react-native';

//import ManyGroupItem from '../components/ManyGroupItem';
import GroupVideoItem from '../components/GroupVideoItem';

const DATA = [
  {
    id: '1',
    title: '1기',
    src: require('../../assets/images/Group.png'),
    video: require('../../assets/images/GroupVideo.png'),
    medal: 'y',
  },
  {
    id: '2',
    title: '2기',
    src: require('../../assets/images/Group.png'),
    video: require('../../assets/images/GroupVideo.png'),
    medal: 'n',
  },
  {
    id: '3',
    title: '3기',
    src: require('../../assets/images/Group.png'),
    video: require('../../assets/images/GroupVideo.png'),
    medal: 'n',
  },
  {
    id: '4',
    title: '4기',
    src: require('../../assets/images/Group.png'),
    video: require('../../assets/images/GroupVideo.png'),
    medal: 'n',
  },
  {
    id: '5',
    title: '5기',
    src: require('../../assets/images/Group.png'),
    video: require('../../assets/images/GroupVideo.png'),
    medal: 'n',
  },
  // {
  //   id: '6',
  //   title: '6기',
  //   src: require('../../assets/images/Group.png'),
  // },
  // {
  //   id: '7',
  //   title: '7기',
  //   src: require('../../assets/images/Group.png'),
  // },
  // {
  //   id: '8',
  //   title: '8기',
  //   src: require('../../assets/images/Group.png'),
  // },
];

const VideoItem = ({id, src, medal}) => (
  <View>
    <GroupVideoItem id={id} src={src} medal={medal} />
  </View>
);

const GroupVideo = () => {
  return (
    <SafeAreaView style={styles.containbox}>
      <FlatList
        data={DATA}
        renderItem={({item}) => (
          <VideoItem id={item.id} src={item.src} medal={item.medal} />
        )}
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

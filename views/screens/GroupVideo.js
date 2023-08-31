import {React, useContext} from 'react';
import {StyleSheet, View, FlatList, SafeAreaView} from 'react-native';
import {SwiperFlatList} from 'react-native-swiper-flatlist';

//import ManyGroupItem from '../components/ManyGroupItem';
import GroupVideoItem from '../components/GroupVideoItem';
import FAB from '../components/FloatingMenu';
import PageIndexContext from '../screens/Context';

const DATA = [
  {
    id: '1',
    title: '1기',
    src: require('../../assets/images/test_member1.jpeg'),
    video: require('../../assets/images/GroupVideo.png'),
    medal: 'y',
  },
  {
    id: '2',
    title: '1기',
    src: require('../../assets/images/test_member4.jpeg'),
    video: require('../../assets/images/GroupVideo.png'),
    medal: 'n',
  },
  {
    id: '3',
    title: '1기',
    src: require('../../assets/images/test_member2.jpeg'),
    video: require('../../assets/images/GroupVideo.png'),
    medal: 'n',
  },
  {
    id: '4',
    title: '2기',
    src: require('../../assets/images/test_member3.jpeg'),
    video: require('../../assets/images/GroupVideo.png'),
    medal: 'n',
  },
  {
    id: '5',
    title: '2기',
    src: require('../../assets/images/test_member1.jpeg'),
    video: require('../../assets/images/GroupVideo.png'),
    medal: 'n',
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

// eslint-disable-next-line react-hooks/rules-of-hooks
const setPageIndex = useContext(setPageIndex);
const VideoItem = ({id, title, src, medal}) => (
  <View>
    {title == setPageIndex ? (
      <GroupVideoItem id={id} src={src} medal={medal} />
    ) : (
      <></>
    )}
  </View>
);

const GroupVideo = () => {
  // const {state} = useLocation();
  return (
    <SafeAreaView style={styles.containbox}>
      <SwiperFlatList
        vertical={true}
        data={DATA}
        renderItem={({item}) => (
          <VideoItem
            id={item.id}
            title={item.title}
            src={item.src}
            medal={item.medal}
          />
        )}
        numColumns={2}
      />
      <FAB />
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

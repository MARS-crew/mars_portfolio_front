import { React } from 'react';
import { useContext } from 'react';
import { Dimensions, StyleSheet, View, FlatList, SafeAreaView } from 'react-native';

//import ManyGroupItem from '../components/ManyGroupItem';
import GroupVideoItem from '../components/GroupVideoItem';
import FAB from '../components/FloatingMenu';
import SwiperFlatListComponent from '../components/SwiperFlatListComponent';
import SwiperFlatList from 'react-native-swiper-flatlist';
import AppContext from '../../AppContext';

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
    title: '2기',
    src: require('../../assets/images/test_member4.jpeg'),
    video: require('../../assets/images/GroupVideo.png'),
    medal: 'n',
  },
  {
    id: '3',
    title: '3기',
    src: require('../../assets/images/test_member3.jpeg'),
    video: require('../../assets/images/GroupVideo.png'),
    medal: 'n',
  },
  {
    id: '4',
    title: '4기',
    src: require('../../assets/images/test_member4.jpeg'),
    video: require('../../assets/images/GroupVideo.png'),
    medal: 'n',
  },
  {
    id: '5',
    title: '5기',
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

const VideoItem = ({ id, src, medal }) => (
  <View>
    <GroupVideoItem id={id} src={src} medal={medal} />
  </View>
);


const GroupVideo = ({ data }) => {
  // console.log(swiperIndex)
  const IndexData = useContext(AppContext);
  const height = Dimensions.get('window').width;
  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.floor(offsetY / height);
    IndexData.setIndexValue(index);
    console.log(IndexData.swiperIndex)
  };

  return (
    <SafeAreaView style={styles.containbox}>
      <SwiperFlatList
        vertical={true}
        data={DATA}
        renderItem={({ item }) => (
          <VideoItem id={item.id} src={item.src} medal={item.medal} />
        )}
        initialScrollIndex={IndexData.swiperIndex}
        hideShadow={true}
        onScroll={handleScroll}
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

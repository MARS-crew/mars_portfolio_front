import { React } from 'react';
import { useContext, useRef, useEffect } from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  FlatList,
  SafeAreaView,
} from 'react-native';

//import ManyGroupItem from '../components/ManyGroupItem';
import GroupVideoItem from '../components/GroupVideoItem';
import FAB from '../components/FloatingMenu';
import SwiperFlatListComponent from '../components/SwiperFlatListComponent';
import SwiperFlatList from 'react-native-swiper-flatlist';
// import AppContext from '../../AppContext';
import { IndexProvider, useIndexContext } from '../../IndexContext';

const DATA = [
  {
    id: 1,
    title: '3기',
    src: require('../../assets/images/Rectangle3_1.png'),
    video: require('../../assets/images/GroupVideo.png'),
    medal: 'y',
  },
  {
    id: 2,
    title: '3기',
    src: require('../../assets/images/Rectangle3_2.png'),
    video: require('../../assets/images/GroupVideo.png'),
    medal: 'n',
  },
  {
    id: 3,
    title: '3기',
    src: require('../../assets/images/Rectangle3_3.png'),
    video: require('../../assets/images/GroupVideo.png'),
    medal: 'n',
  },
  {
    id: 4,
    title: '3기',
    src: require('../../assets/images/Rectangle3_4.png'),
    video: require('../../assets/images/GroupVideo.png'),
    medal: 'n',
  },
  {
    id: 5,
    title: '4기',
    src: require('../../assets/images/Rectangle4_1.png'),
    video: require('../../assets/images/GroupVideo.png'),
    medal: 'n',
  },
  {
    id: 6,
    title: '4기',
    src: require('../../assets/images/Rectangle4_2.png'),
    video: require('../../assets/images/GroupVideo.png'),
  },
  {
    id: 7,
    title: '4기',
    src: require('../../assets/images/Rectangle4_3.png'),
    video: require('../../assets/images/GroupVideo.png'),
  },
  {
    id: 8,
    title: '4기',
    src: require('../../assets/images/Rectangle4_4.png'),
    video: require('../../assets/images/GroupVideo.png'),
  },
  {
    id: 9,
    title: '5기',
    src: require('../../assets/images/Rectangle5_2.png'),
    video: require('../../assets/images/GroupVideo.png'),
    medal: 'n',
  },
  {
    id: 10,
    title: '5기',
    src: require('../../assets/images/Rectangle5_1.png'),
    video: require('../../assets/images/GroupVideo.png'),
  },
  {
    id: 11,
    title: '5기',
    src: require('../../assets/images/Rectangle5_3.png'),
    video: require('../../assets/images/GroupVideo.png'),
    medal: 'y',
  },
  {
    id: 12,
    title: '5기',
    src: require('../../assets/images/Rectangle.png'),
    video: require('../../assets/images/GroupVideo.png'),
  },
];

const VideoItem = ({ id, src, medal }) => (
  <View>
    <GroupVideoItem id={id} src={src} medal={medal} />
  </View>
);

const GroupVideo = ({ token }) => {
  const { currentIndex, changeIndex, horizontalIndex, changeHorizontalIndex, dataIndex, changeDataIndex, selectedMemId, changeSelectedMemId } = useIndexContext();
  const swiperRef = useRef(null);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.scrollToIndex({
        index: currentIndex,
        animated: true,
      });
    }
  }, [currentIndex, swiperRef]);

  const height = Dimensions.get('window').height;

  const handleScroll = event => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const newIndex = Math.round(offsetY / height);
    console.log(newIndex, ", ", currentIndex);
    if (newIndex !== currentIndex) {
      changeIndex(newIndex);
    }
  };
  useEffect(() => {
    console.log("selectedMemId: ", selectedMemId);
  }, [selectedMemId]);

  return (
    <SafeAreaView style={styles.containbox}>
      <SwiperFlatList
        ref={swiperRef}
        vertical={true}
        data={DATA}
        renderItem={({ item }) => (
          <VideoItem id={item.id} src={item.src} medal={item.medal} />
        )}
        index={currentIndex}
        hideShadow={true}
        // onScroll={handleScroll}
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

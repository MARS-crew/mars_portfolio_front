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
    src: require('../../assets/images/test_member5.png'),
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
    src: require('../../assets/images/test_member5.png'),
    video: require('../../assets/images/GroupVideo.png'),
  },
  {
    id: '7',
    title: '7기',
    src: require('../../assets/images/test_member4.jpeg'),
    video: require('../../assets/images/GroupVideo.png'),
  },
  {
    id: '8',
    title: '8기',
    src: require('../../assets/images/test_member4.jpeg'),
    video: require('../../assets/images/GroupVideo.png'),
  },
  {
    id: '9',
    title: '9기',
    src: require('../../assets/images/test_member5.png'),
    video: require('../../assets/images/GroupVideo.png'),
    medal: 'n',
  },
  {
    id: '10',
    title: '10기',
    src: require('../../assets/images/test_member3.jpeg'),
    video: require('../../assets/images/GroupVideo.png'),
  },
  {
    id: '11',
    title: '11기',
    src: require('../../assets/images/test_member3.jpeg'),
    video: require('../../assets/images/GroupVideo.png'),
  },
  {
    id: '12',
    title: '12기',
    src: require('../../assets/images/test_member3.jpeg'),
    video: require('../../assets/images/GroupVideo.png'),
  },
];

const VideoItem = ({ id, src, medal }) => (
  <View>
    <GroupVideoItem id={id} src={src} medal={medal} />
  </View>
);

const GroupVideo = ({ data }) => {
  // console.log(swiperIndex)
  // const IndexData = useContext(AppContext);
  const { currentIndex, changeIndex } = useIndexContext();
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
    // IndexData.setIndexValue(index);
    changeIndex(newIndex);

    //console.log('스크롤 거리값:', Math.floor(offsetY));
    //console.log('세로 화면  값:', Math.floor(height));
    // console.log('인덱스 값 (전체 거리 /세로 1 화면):', offsetY / height);
  };

  console.log('2번 스크린 기수 비디오:', currentIndex);

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

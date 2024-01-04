import { React } from 'react';
import { useContext, useRef, useEffect } from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  FlatList,
  SafeAreaView,
} from 'react-native';
import _ from 'lodash';  // lodash 라이브러리 사용
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
    group: 3,
    src: require('../../assets/images/Rectangle3_1.png'),
    video: require('../../assets/images/GroupVideo.png'),
    medal: 'y',
  },
  {
    id: 2,
    group: 3,
    src: require('../../assets/images/Rectangle3_2.png'),
    video: require('../../assets/images/GroupVideo.png'),
    medal: 'n',
  },
  {
    id: 3,
    group: 3,
    src: require('../../assets/images/Rectangle3_3.png'),
    video: require('../../assets/images/GroupVideo.png'),
    medal: 'n',
  },
  {
    id: 4,
    group: 3,
    src: require('../../assets/images/Rectangle3_4.png'),
    video: require('../../assets/images/GroupVideo.png'),
    medal: 'n',
  },
  {
    id: 32,
    group: 4,
    src: require('../../assets/images/Rectangle4_1.png'),
    video: require('../../assets/images/GroupVideo.png'),
    medal: 'n',
  },
  {
    id: 33,
    group: 4,
    src: require('../../assets/images/Rectangle4_2.png'),
    video: require('../../assets/images/GroupVideo.png'),
  },
  {
    id: 38,
    group: 4,
    src: require('../../assets/images/Rectangle4_3.png'),
    video: require('../../assets/images/GroupVideo.png'),
  },
  {
    id: 44,
    group: 4,
    src: require('../../assets/images/Rectangle4_4.png'),
    video: require('../../assets/images/GroupVideo.png'),
  },
  {
    id: 49,
    group: 5,
    src: require('../../assets/images/Rectangle5_2.png'),
    video: require('../../assets/images/GroupVideo.png'),
    medal: 'n',
  },
  {
    id: 39,
    group: 5,
    src: require('../../assets/images/Rectangle5_1.png'),
    video: require('../../assets/images/GroupVideo.png'),
  },
  {
    id: 47,
    group: 5,
    src: require('../../assets/images/Rectangle5_3.png'),
    video: require('../../assets/images/GroupVideo.png'),
    medal: 'y',
  },
  {
    id: 50,
    group: 5,
    src: require('../../assets/images/Rectangle.png'),
    video: require('../../assets/images/GroupVideo.png'),
  },
];

const VideoItem = ({ id, group, src, medal }) => (
  <View>
    <GroupVideoItem id={id} group={group} src={src} medal={medal} />
  </View>
);

const GroupVideo = ({ token }) => {
  const { currentIndex, changeIndex, horizontalIndex, changeHorizontalIndex, dataIndex, changeDataIndex, selectedMemId, changeSelectedMemId, selectedGroupId, changeSelectedGroupId } = useIndexContext();
  const swiperRef = useRef(null);

  // id를 오름차순으로 정렬하고 그룹화
  const sortedAndGroupedData = _.chain(DATA)
    .sortBy('id')
    .groupBy('group')
    .values()
    .value();

  const groups = Object.values(sortedAndGroupedData);

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
    if (newIndex !== currentIndex) {
      if (newIndex < groups.length) {
        const newGroup = groups[newIndex][0].group;
        if (newGroup !== selectedGroupId) {
          changeSelectedGroupId(newGroup);
        }
      }
    }
  };
  // useEffect(() => {
  //   if (selectedMemId !== -1) {
  //     const selectedGroupIndex = groups.findIndex(group => group[0].group == selectedGroupId);
  //     if (selectedGroupIndex !== -1 && currentIndex !== selectedGroupIndex) {
  //       changeIndex(selectedGroupIndex);
  //     }
  //   }
  // }, [selectedGroupId, groups]);

  const selectedGroupFechData = async () => {
    if (selectedMemId !== -1) {
      const selectedGroupIndex = groups.findIndex(group => group[0].group == selectedGroupId);
      if (selectedGroupIndex !== -1 && currentIndex !== selectedGroupIndex) {
        changeIndex(selectedGroupIndex);
      }
    }
  };

  useEffect(() => {
    selectedGroupFechData();
  }, [selectedGroupId, groups]);

  const renderGroup = ({ item: groupItems }) => (
    <FlatList
      data={groupItems}
      renderItem={({ item }) => (
        <VideoItem id={item.id} group={item.group} src={item.src} medal={item.medal} />
      )}
      keyExtractor={item => item.id.toString()}
      numColumns={2}
      listKey={`group_${groupItems[0].group}`}
    />
  );

  return (
    <SafeAreaView style={styles.containbox}>
      <SwiperFlatList
        ref={swiperRef}
        vertical={true}
        data={groups}
        renderItem={renderGroup}
        index={currentIndex}
        hideShadow={true}
        onScroll={handleScroll}
        listKey="root"
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

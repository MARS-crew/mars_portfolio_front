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
import {useDispatch, useSelector} from "react-redux";
import {getCurrentGroupIdSelector, getScreenTypeSelector, setCurrentMemberIdRx} from "../../redux/slice/UiRenderSlice";
import {SCREEN_2, SCREEN_3} from "../../AppConst";

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
    id: 83,
    group: 5,
    src: require('../../assets/images/Rectangle5_2.png'),
    video: require('../../assets/images/GroupVideo.png'),
    medal: 'n',
  },
  {
    id: 86,
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
    id: 100,
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

const GroupVideo = ({ token, idx }) => {
  const { currentIndex, changeIndex, horizontalIndex, changeHorizontalIndex, dataIndex, changeDataIndex, selectedMemId, changeSelectedMemId, selectedGroupId, changeSelectedGroupId } = useIndexContext();
  const swiperRef = useRef(null);
  const _screenType = useSelector(getScreenTypeSelector);
  const _currentGroupId = useSelector(getCurrentGroupIdSelector);

  // id를 오름차순으로 정렬하고 그룹화
  const sortedAndGroupedData = _.chain(DATA)
    .sortBy('id')
    .groupBy('group')
    .values()
    .value();

  const groups = Object.values(sortedAndGroupedData);

  const dispatch = useDispatch();


  useEffect(() => {
    if(_screenType == SCREEN_2) {
      const mem_id = groups[_currentGroupId][0].id
      dispatch(setCurrentMemberIdRx(mem_id))
    }
  }, [_screenType]);


  return (
    <SafeAreaView style={styles.containbox}>
      <FlatList
          data={groups[_currentGroupId]}
          renderItem={({ item }) => (
              <VideoItem id={item.id} group={item.group} src={item.src} medal={item.medal} />
          )}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          listKey={`group_${groups[_currentGroupId][0].id}`}
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

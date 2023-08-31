import 'react-native-gesture-handler';
import {Reac, useContext} from 'react';
import {View, FlatList, SafeAreaView} from 'react-native';
import {CubeNavigationHorizontal} from 'react-native-3dcube-navigation';
import {useNavigate} from 'react-router-dom';

import Group from './Group';
import ManyGroup from './ManyGroup';
import GroupVideo from './GroupVideo';
import GroupVideoItem from '../components/GroupVideoItem';
import Swiper from 'react-native-swiper';
import {GroupTitle} from './PageNav';

// const callBackAfterSwipe = () => {
//   // 스와이프 후의 동작 정의
// };

const DATA = [
  {
    id: '1',
    title: '1기',
    src: require('../../assets/images/Group.png'),
    member: [
      {
        mem: require('../../assets/images/test_member1.jpeg'),
        medal: 'y',
      },
      {
        mem: require('../../assets/images/test_member2.jpeg'),
        medal: 'n',
      },
      {
        mem: require('../../assets/images/test_member3.jpeg'),
        medal: 'n',
      },
      {
        mem: require('../../assets/images/test_member4.jpeg'),
        medal: 'n',
      },
    ],
  },
  {
    id: '2',
    title: '2기',
    src: require('../../assets/images/Group.png'),
    member: [
      {
        mem: require('../../assets/images/test_member1.jpeg'),
        medal: 'y',
      },
      {
        mem: require('../../assets/images/test_member2.jpeg'),
        medal: 'n',
      },
      {
        mem: require('../../assets/images/test_member3.jpeg'),
        medal: 'n',
      },
    ],
  },
  {
    id: '3',
    title: '3기',
    src: require('../../assets/images/Group.png'),
    video: require('../../assets/images/GroupVideo.png'),
  },
  {
    id: '4',
    title: '4기',
    src: require('../../assets/images/Group.png'),
    video: require('../../assets/images/GroupVideo.png'),
  },
  {
    id: '5',
    title: '5기',
    src: require('../../assets/images/Group.png'),
    video: require('../../assets/images/GroupVideo.png'),
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

// const VideoItem = item => (
//   <View>
//     <GroupVideoItem id={item.member.mem} src={item.member.medal} />
//   </View>
// );

const WhichGroup = () => {
  const {groupTitle, setGroupTitle} = useContext(GroupTitle);

  // <VideoItem />;
  return <Group />;
};

export default WhichGroup;

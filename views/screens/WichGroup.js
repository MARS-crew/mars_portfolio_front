import 'react-native-gesture-handler';
import {React} from 'react';
import {CubeNavigationHorizontal} from 'react-native-3dcube-navigation';

import Group from './Group';
import ManyGroup from './ManyGroup';
import GroupVideo from './GroupVideo';

// const callBackAfterSwipe = () => {
//   // 스와이프 후의 동작 정의
// };

const DATA = [
  {
    id: '1',
    title: '1기',
    src: require('../../assets/images/Group.png'),
    video: require('../../assets/images/GroupVideo.png'),
  },
  {
    id: '2',
    title: '2기',
    src: require('../../assets/images/Group.png'),
    video: require('../../assets/images/GroupVideo.png'),
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

const WhichGroup = () => {
  if (DATA.length <= 6) {
    <GroupVideo data={DATA} />;
    return (
      //<CubeNavigationHorizontal callBackAfterSwipe={callBackAfterSwipe}>
      <Group data={DATA} />
      //</CubeNavigationHorizontal>
    );
  } else {
    return <ManyGroup data={DATA} />;
  }
};

export default WhichGroup;

import { React } from 'react';

import Group from './Group';
import ManyGroup from './ManyGroup';
import GroupVideo from './GroupVideo';
import { set } from 'react-native-reanimated';
//import { View } from 'react-native';

const DATA = [
  {
    id: '1',
    title: '1기',
    src: require('../../assets/images/Group.png'),
    video: require('../../assets/images/GroupVideo.png'),
    merdal: 'y',
  },
  {
    id: '2',
    title: '2기',
    src: require('../../assets/images/Group.png'),
    video: require('../../assets/images/GroupVideo.png'),
    merdal: 'n',
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

const WhichGroup = ({ swiperIndex, setSwiperIndex }) => {
  if (DATA.length <= 6) {
    return <Group data={DATA} />;
  } else {
    return <ManyGroup data={DATA} />;
  }
};

export default WhichGroup;

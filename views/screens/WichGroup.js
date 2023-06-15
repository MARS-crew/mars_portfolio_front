import {React} from 'react';

import Group from './Group';
import ManyGroup from './ManyGroup';

const DATA = [
  {
    id: '1',
    title: '1기',
    src: require('../../assets/images/Group.png'),
  },
  {
    id: '2',
    title: '2기',
    src: require('../../assets/images/Group.png'),
  },
  {
    id: '3',
    title: '3기',
    src: require('../../assets/images/Group.png'),
  },
  {
    id: '4',
    title: '4기',
    src: require('../../assets/images/Group.png'),
  },
  {
    id: '5',
    title: '5기',
    src: require('../../assets/images/Group.png'),
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

const WhichGroup = ({id}) => {
  if (DATA.length <= 6) {
    return <Group data={DATA} />;
  } else {
    return <ManyGroup data={DATA} />;
  }
};

export default WhichGroup;
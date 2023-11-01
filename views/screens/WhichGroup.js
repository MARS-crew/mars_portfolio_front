import {React} from 'react';

import Group from './Group';
import ManyGroup from './ManyGroup';
import GroupVideo from './GroupVideo';
//import { View } from 'react-native';
import axios from 'axios';

const getGroup = async() => {
  const headers = {
    Authorization: 
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InNuc19pZCI6MTgsIm1lbWJlcl9pZCI6NDQsInR5cGUiOiJnb29nbGUiLCJuYW1lIjoi6rmA7LGE66awIiwiYWNjZXNzX3Rva2VuIjoieWEyOS5hMEFmQl9ieUEwV1JnQllHMmFrOWc5Q0dNTllCdUdfelVLRFhlY2JoSi02MEh6c3U3Z24tYTB4RWNDUjM3b0t1QXRWTFJnQVBLTGRid2ozc1ZnNVhDN1RRV1hYREU1NTVzcDdNVGx1bC1CTk8weEpZeTlKcXlfWE10dW9XdjRUQVY3cHpldjI2bVU0emtsVWIySUd6dTNTMmI0eHliN3lJY0ZiU3ZHYUNnWUtBYU1TQVJJU0ZRR09jTm5DX19XUUoxSXVKMk5WdXhIYVRWSUFldzAxNzEiLCJyZWZyZXNoX3Rva2VuIjpudWxsLCJhdXRoX2NvZGUiOm51bGwsImNvbm5lY3RfZGF0ZSI6IjIwMjMtMTAtMDVUMDM6MzE6MDUuMDAwWiJ9LCJpYXQiOjE2OTg4NDY0MzgsImV4cCI6MTY5ODg1MDAzOH0.F1XTzrdGbiYnIh3BX0lBR7P1RRQmterrr9fdjn3SpLc'
  };

  try{
    const result = await axios.get('http://10.0.2.2:3000/api/v1/img/group/3기',{headers})
    console.log(result.data);

  }catch(error){
    console.log(error)
  }
}
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
  {
    id: '3',
    title: '3기',
    src: require('../../assets/images/Group.png'),
    video: require('../../assets/images/GroupVideo.png'),
    merdal: 'n',
  },
  {
    id: '4',
    title: '4기',
    src: require('../../assets/images/Group.png'),
    video: require('../../assets/images/GroupVideo.png'),
    merdal: 'n',
  },
  {
    id: '5',
    title: '5기',
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

const WhichGroup = () => {
  getGroup();
  if (DATA.length <= 6) {
    return <Group data={DATA} />;
  } else {
    return <ManyGroup data={DATA} />;
  }
};

export default WhichGroup;

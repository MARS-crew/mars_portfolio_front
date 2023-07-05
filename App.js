import 'react-native-gesture-handler';
import React from 'react';
import {CubeNavigationHorizontal} from 'react-native-3dcube-navigation';

import Splash from './views/screens/splash';
import WhichGroup from './views/screens/WhichGroup';
import GroupVideo from './views/screens/GroupVideo';

const App = () => {
  const callBackAfterSwipe = () => {
    // 스와이프 후의 동작 정의
  };

  return (
    <CubeNavigationHorizontal callBackAfterSwipe={callBackAfterSwipe}>
      <Splash />
      <WhichGroup />
      <GroupVideo />
    </CubeNavigationHorizontal>
  );
};

export default App;

import "react-native-gesture-handler";
import React from 'react';
import { View } from 'react-native';
import { CubeNavigationHorizontal } from 'react-native-3dcube-navigation';

import Splash from "./views/screens/splash";
import Main from "./views/screens/Main";
import Test from "./views/screens/Test";
import WhichGroup from "./views/screens/WichGroup";
import GroupVideo from "./views/screens/GroupVideo";

const App = () => {
  const callBackAfterSwipe = () => {
    // 스와이프 후의 동작 정의
  };

  return (
      <CubeNavigationHorizontal callBackAfterSwipe={callBackAfterSwipe}>
          <Splash />
          <Main />
          <Test />
          <WhichGroup/>
          {/* <GroupVideo /> */}
      </CubeNavigationHorizontal>
  );
};

export default App;

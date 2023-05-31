import "react-native-gesture-handler";
import React, { useState, useEffect } from 'react';
import { View,LogBox } from 'react-native';
import { CubeNavigationHorizontal } from 'react-native-3dcube-navigation';

import Splash from "./views/screens/splash";
import Main from "./views/screens/Main";
import Test from "./views/screens/Test";
import Group from "./views/screens/Group";
import Member from "./views/screens/Member";
import Youtube from "./views/screens/Youtube";
import Resume from "./views/screens/Resume";
import Portfolio from "./views/screens/Portfolio";
import Review from "./views/screens/Review";
import Album from "./views/screens/Album";


//프로토타입 입니다
const App = () => {

  LogBox.ignoreLogs([
    'Animated.event now requires a second argument for options',
    'Animated: `useNativeDriver` was not specified',
  ]);

  const callBackAfterSwipe = () => {
    // 스와이프 후의 동작 정의
  };
  const [alert, setAlert] = useState(true);
  useEffect(() => {
    let timer = setTimeout(() => {
      setAlert(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);


  return (
      <CubeNavigationHorizontal callBackAfterSwipe={callBackAfterSwipe}>
          {alert === true ? <Splash /> : <Group />}
          <Member/>
          <Youtube />
          <Resume />
          <Portfolio 
          options={{headerShown: false}}/>
          <Review />
          <Album />
      </CubeNavigationHorizontal>
  );
};

export default App;

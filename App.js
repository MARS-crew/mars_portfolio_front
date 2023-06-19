import 'react-native-gesture-handler';
import {LogBox} from 'react-native';
import {CubeNavigationHorizontal} from 'react-native-3dcube-navigation';

import Splash from './views/screens/Splash';
import Main from './views/screens/Main';
import Portfolio from './views/screens/Portfolio/Portfolio';

const App = () => {
  LogBox.ignoreLogs([
    'Animated.event now requires a second argument for options',
    'Animated: `useNativeDriver` was not specified',
  ]);
  const callBackAfterSwipe = () => {
    // 스와이프 후의 동작 정의
  };

  return (
    <CubeNavigationHorizontal callBackAfterSwipe={callBackAfterSwipe}>
      <Splash />
      <Main />
      <Portfolio options={{headerShown: false}} />
    </CubeNavigationHorizontal>
  );
};

export default App;

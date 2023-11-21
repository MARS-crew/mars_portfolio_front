import 'react-native-gesture-handler';
import React from 'react';
import Swiper from 'react-native-swiper';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// import Splash from './views/screens/Splash';
import WhichGroup from './views/screens/WhichGroup';
import Group from './views/screens/Group';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Swiper>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
          {/* <Stack.Screen name="Splash" component={Splash} /> */}
          <Stack.Screen name="Main" component={WhichGroup} />
        </Stack.Navigator>
      </NavigationContainer>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Group" component={Group} />
        </Stack.Navigator>
      </NavigationContainer>
    </Swiper>
  );
};

export default App;

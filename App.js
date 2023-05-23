import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Splash from './views/screens/splash';
import Main from './views/screens/Main';
import Login from './views/screens/Login';
import Portfolio from './views/screens/Portfolio';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen
          name="Portfolio"
          options={{headerShown: false}}
          component={Portfolio}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

/**
 * @format
 */
import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import App from './App';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { name as appName } from './app.json';


const RootComponent = () => (
  <GestureHandlerRootView style={{ flex: 1 }}>
    <App />
  </GestureHandlerRootView>
);
AppRegistry.registerComponent(appName, () => RootComponent);

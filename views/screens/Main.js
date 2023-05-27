import React from 'react';
import {View, Button} from 'react-native';

function Main({navigation}) {
  return (
    <View>
      <Button
        title="로그인"
        onPress={() => navigation.navigate('Login')}></Button>
    </View>
  );
}

export default Main;

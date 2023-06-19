import React from 'react';
import {View, Button, StyleSheet} from 'react-native';

function Main({navigation}) {
  const handleLoginPress = () => {
    navigation && navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Button title="로그인" onPress={handleLoginPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
export default Main;

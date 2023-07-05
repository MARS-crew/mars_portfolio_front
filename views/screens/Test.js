import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {CubeNavigationVertical} from 'react-native-3dcube-navigation';
import Login from './Login';

const Test = () => {
  const callBackAfterSwipe = () => {
    // 스와이프 후의 동작 정의
  };

  return (
    <View>
      <View style={styles.container}>
        <CubeNavigationVertical callBackAfterSwipe={callBackAfterSwipe}>
          <Login />
          <View style={[styles.pageContainer, {backgroundColor: '#A3F989'}]}>
            <Text style={styles.text}>Horizontal Page 2</Text>
          </View>
        </CubeNavigationVertical>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: '600',
    color: 'white',
  },
});

export default Test;

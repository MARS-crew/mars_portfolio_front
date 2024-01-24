import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Image, Dimensions } from 'react-native';


const Loading = () => {


  return (
    <>
      <Image
        style={styles.image}
        source={require('../../assets/loading2.gif')}
      />
      {/* <View style={styles.overlay} /> */}
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)', // 투명도가 있는 검은색 배경0
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
});

export default Loading;

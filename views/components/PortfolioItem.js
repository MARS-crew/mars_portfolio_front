import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';

import Camera from '../../assets/images/camera.png';
import Link from '../../assets/images/Link.png';
import Add from '../../assets/images/add.png';

const Portfolio = () => {
  return (
    <View
      style={{
        width: Dimensions.get('window').width / 2,
        height: Dimensions.get('window').height / 2,
        display: 'flex',
        justifyContent: 'center',
        //borderCollapse: 'collapse',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#000',
      }}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => alert('[onPress] = 포트폴리오 생성 및 등록')}
        onLongPress={() =>
          alert('[onLongPress] 포트폴리오 설정 Modify or Delete')
        }>
        <View style={styles.header}>
          <Image source={Add} style={styles.image} />
        </View>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  image: {
    width: 60,
    height: 60,
  },
});
export default Portfolio;

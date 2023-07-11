import React from 'react';
import {
  View,
  Button,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import people_ex from '../../assets/images/people_ex.png';

function Main3() {
  return (
    <View style={styles.container}>
      <Text style={styles.text1}>로그인</Text>
      <TouchableOpacity style={styles.group_main}>
        <Text>마스외전 3기를 소개합니다</Text>
      </TouchableOpacity>
      <Image source={people_ex} style={styles.p_image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  text1: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  p_image: {
    top: 150,
    left: 40,
    width: '80%',
    height: '50%',
  },
  TouchableOpacity: {
    width: 60,
    height: 60,
    backgroundColor: '#fe5746',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Main3;

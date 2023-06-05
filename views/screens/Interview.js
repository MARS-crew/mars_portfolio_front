import React, { useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  Animated,
  TouchableWithoutFeedback,
  Easing,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import EmptyImg from '../../assets/images/EmptyImg.png';
import Modall from '../components/Modall';



const Interview = () => {
  const opacity = useRef(new Animated.Value(0)).current;
  const [heart, setHeart] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [interviewImg, setInterviewImg] = useState(EmptyImg);

  var lastTap = null;

  const handleDoubleTap = () => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;
    //두번째 tap이 지난 tap을 한지 0.03초 이내에 이뤄졌을 때 -> Double tap
    if (lastTap && now - lastTap < DOUBLE_PRESS_DELAY) {
      toggleHeart();
    } else {
      lastTap = now;
    }
  };

  const toggleHeart = () => {
    setHeart(previousState => !previousState);
    fillHeart();
  };

  const fillHeart = () => {
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 400,
        easing: Easing.quad,
        useNativeDriver: true,
      }),
      Animated.delay(600),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const findImgUrl = (code) => {
    const item = jsonData.find(data => data.code === code);
    return item.data[0].file_url;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bar}>
        <View style={styles.iconbar}>
          <TouchableOpacity onPress={toggleHeart} style={styles.icon}>
            {heart ? (
              <Icon name="heart" size={23} color={'#3D3D3D'}></Icon>
            ) : (
              <Icon name="hearto" size={23} color={'#595959'}></Icon>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Alert.alert('공유')}
            style={styles.icon}>
            <Icon name="sharealt" size={23} color={'#3D3D3D'} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.section}>
        <TouchableWithoutFeedback
          onPress={handleDoubleTap}
          onLongPress={() => setModalOpen(true)}>
          <ImageBackground
            resizeMode="contain"
            source={interviewImg}
            style={styles.img}
          />
        </TouchableWithoutFeedback>
        {/* Animated로 변경, opacity 값 */}
        <Animated.View style={[styles.animate, heartStyle(opacity).heart]}>
          {heart ? (
            <Icon name="heart" size={100} color={'red'}></Icon>
          ) : (
            <Icon name="hearto" size={100} color={'gray'}></Icon>
          )}
        </Animated.View>
      </View>
      {/* <Modall isOpen={open} /> */}
      <Modall
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        interviewImg={interviewImg}
        setInterviewImg={setInterviewImg}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // padding: 10,
  },
  bar: {
    borderTopWidth: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  section: {
    borderTopWidth: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 10,
    padding: 15,
    // backgroundColor: 'red',
  },
  iconbar: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  icon: {
    width: 25,
    height: 25,
    marginLeft: 10,
  },
  animate: {
    position: 'absolute',
  },
  img: {
    width: '100%',
    height: '100%',
  },
});
const heartStyle = opacity =>
  StyleSheet.create({
    heart: {
      opacity: opacity,
    },
  });

export default Interview;

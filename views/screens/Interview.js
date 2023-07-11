/* eslint-disable no-dupe-keys */
import React, {useRef, useState} from 'react';
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
  Dimensions,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import EmptyImg from '../../assets/images/EmptyImg.png';
import InterviewModal from '../components/InterviewModal';
import Video from 'react-native-video';

const Interview = () => {
  const opacity = useRef(new Animated.Value(0)).current; //하트 이미지 보일 때 사용

  const [heart, setHeart] = useState(false); // 하트 상태
  const [modalOpen, setModalOpen] = useState(false); // 수정 모달 상태
  const [filePath, setFilePath] = useState(); // video 주소
  //video 재생
  const [isPlaying, setIsPlaying] = useState(true);

  // 이중탭
  var lastTap = null;
  const handleDoubleTap = () => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 500;
    //두번째 tap이 지난 tap을 한지 0.03초 이내에 이뤄졌을 때 -> Double tap
    if (lastTap && now - lastTap < DOUBLE_PRESS_DELAY) {
      toggleHeart();
    } else {
      lastTap = now;
    }
  };
  //찜 기능
  const toggleHeart = () => {
    //video 데이터가 없을 땐 찜 기능 안되도록
    if (filePath !== undefined) {
      setHeart(previousState => !previousState);
      fillHeart();
    } else {
      Alert.alert('데이터가 없습니다.');
    }
  };
  //하트채우기
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.iconBar}>
        <TouchableOpacity onPress={toggleHeart} style={styles.icon}>
          {heart ? (
            <Icon name="heart" size={30} color={'red'}></Icon>
          ) : (
            <Icon name="heart" size={30} color={'#E4E3E8'}></Icon>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Alert.alert('공유')}
          style={styles.icon}>
          <Icon name="sharealt" size={30} color={'#3D3D3D'} />
        </TouchableOpacity>
      </View>
      <View style={styles.section}>
        <TouchableWithoutFeedback
          onPress={() => {
            handleDoubleTap();
            // handleVideoPress();
          }}
          onLongPress={() => setModalOpen(true)}>
          {/* 저장된 video가 있으면 video 출력. 없으면  마스외전 로고 출력*/}
          {filePath ? (
            <Video
              source={{uri: filePath}}
              style={[styles.content]}
              controls={true}
              resizeMode="cover"
              repeat={true}
              paused={!isPlaying} // isPlaying 상태에 따라 재생/일시정지 제어
              onEnd={() => {
                setIsPlaying(false);
              }}
            />
          ) : (
            <Image
              resizeMode="cover"
              source={EmptyImg}
              style={styles.content}
              imageStyle={styles.imgStyle}
            />
          )}
        </TouchableWithoutFeedback>
        {/* Animated로 변경, opacity 값 */}
        <Animated.View style={[styles.animate, heartStyle(opacity).heart]}>
          {heart ? (
            <Icon name="heart" size={100} color={'white'}></Icon>
          ) : (
            <Icon name="hearto" size={100} color={'gray'}></Icon>
          )}
        </Animated.View>
      </View>
      <InterviewModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        filePath={filePath}
        setFilePath={setFilePath}
        heart={heart}
        setIsPlaying={setIsPlaying}
        setHeart={setHeart} // deletePopModal에 전달 - 인터뷰 삭제시 하트 취소
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F4F9',
    // padding: 10,
  },
  iconBar: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  icon: {
    width: 30,
    height: 30,
    marginLeft: 15,
  },
  section: {
    height: 623,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.8,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
    backgroundColor: 'red',
  },
  animate: {
    position: 'absolute',
  },
  content: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
});

const heartStyle = opacity =>
  StyleSheet.create({
    heart: {
      opacity: opacity,
    },
  });

export default Interview;

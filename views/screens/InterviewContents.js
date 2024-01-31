import React, { useCallback, useEffect, useRef, useState } from 'react';
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
import axios from 'axios';
import Icon from 'react-native-vector-icons/AntDesign';
import EmptyImg from '../../assets/images/Empty.png';
import InterviewModal from '../components/InterviewModal';
import Video from 'react-native-video';
import InterviewAlert from '../components/InterviewAlert';
import { useFocusEffect } from '@react-navigation/native';
import { getVideoThumbnail } from 'react-native-video-thumbnails';
import { useUser } from '../../LoginUserContext';
import {toggleInterviewHeart} from "../../api/v1/interview";
import {useSelector} from "react-redux";
import {getReviewListSelector} from "../../redux/slice/ReviewSlice";
import {userIdSelector} from "../../redux/slice/UserInfoSlice";

const InterviewContents = ({ interviewId, id, path, token }) => {
  const { user, storeUser } = useUser();

  const player = useRef(null);
  const opacity = useRef(new Animated.Value(0)).current; //하트 이미지 보일 때 사용

  const [heart, setHeart] = useState(false); // 하트 상태
  const [modalOpen, setModalOpen] = useState(false); // 수정 모달 상태
  const [filePath, setFilePath] = useState(path); // video 주소
  const _userId = useSelector(userIdSelector);

  //video 재생
  const [isPlaying, setIsPlaying] = useState(true);

  // 데이터 없을 때 alert
  const [showAlert, setShowAlert] = useState(false);

  let firstPress = true;
  let lastTime = new Date().getTime();
  let timer = false;
  var delay = 200;
  const doubleTap = () => {
    const now = new Date().getTime();
    if (firstPress) {
      firstPress = false;
      timer = setTimeout(() => {
        setIsPlaying(!isPlaying);
        firstPress = true;
        timer = false;
      }, delay);
      lastTime = now;
    } else {
      let delta = new Date().getTime() - lastTime < delay;
      if (delta) {
        clearTimeout(timer);
        firstPress = true;
        toggleHeart();
      }
    }
  };
  //하트 상태 변경
  const fetchHeart = () => {
    toggleInterviewHeart(token, {id: id})
    .then(function (res) {
      console.error(res);
    })
    .catch(function (error){
      console.error(error);
    })
  };

  // 찜 기능
  const toggleHeart = () => {
    // video 데이터가 없을 땐 찜 기능 안되도록
    if (filePath) {
      const isVideo = filePath.endsWith('.mp4');
      if (isVideo) {
        setHeart((previousState) => !previousState);
        fillHeart();
        fetchHeart();
      } else {
        setShowAlert(true);
      }
    } else {
      setShowAlert(true);
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
  useFocusEffect(
    useCallback(() => {
      setIsPlaying(false);
      return () => {
        setIsPlaying(false);
      };
    }, []),
  );
  const checkUser = (id) => {
    if (_userId == id) {
      setModalOpen(true);
    } else {
      setModalOpen(false);
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.iconBar}>
        <TouchableOpacity onPress={toggleHeart} style={styles.icon}>
          {!heart ? (
            <Icon name="heart" size={30} color={'red'} />
          ) : (
            <Icon name="heart" size={30} color={'#E4E3E8'} />
          )}
        </TouchableOpacity>
        {/*<TouchableOpacity*/}
        {/*  onPress={() => Alert.alert('공유')}*/}
        {/*  style={styles.icon}>*/}
        {/*  <Icon name="sharealt" size={30} color={'#3D3D3D'} />*/}
        {/*</TouchableOpacity>*/}
      </View>
      <View style={styles.section}>
        <TouchableWithoutFeedback
          onPress={() => {
            doubleTap();
            console.log(filePath);
          }}
          onLongPress={() => checkUser(id)}>
          {/* 저장된 video가 있으w면 video 출력. 없으면  마스외전 로고 출력*/}
          {filePath && filePath.endsWith('.mp4') ? (
            <Video
              ref={player}
              source={{ uri: filePath }}
              style={[styles.content]}
              controls={false}
              resizeMode="cover"
              repeat={true}
              paused={!isPlaying}
              onEnd={() => {
                setIsPlaying(false);
              }}
              onLoad={() => {
               console.log('동영상로드 완료')
                player.current.seek(0);
              }}
            />
          ) : (
            <Image
              source={{ uri: filePath }}
              style={[styles.content]}
              resizeMode="cover"
            />
          )}
        </TouchableWithoutFeedback>
        {/* Animated로 변경, opacity 값 */}

        <Animated.View style={[styles.animate, heartStyle(opacity).heart]}>
          {heart ? (
            <Icon name="heart" size={100} color={'white'} />
          ) : (
            <Icon name="hearto" size={100} color={'gray'} />
          )}
        </Animated.View>
      </View>
      <InterviewModal
        token={token}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        interviewId={interviewId}
        filePath={filePath}
        setFilePath={setFilePath}
        heart={heart}
        setIsPlaying={setIsPlaying}
        setHeart={setHeart} // deletePopModal에 전달 - 인터뷰 삭제시 하트 취소
      />
      <InterviewAlert
        title={'데이터가 없습니다.'}
        alertVisible={showAlert}
        setAlertVisible={setShowAlert}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: '#F5F4F9',
    // padding: 10,
  },
  iconBar: {
    height: 60,
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1000,
    alignItems: 'center',
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
    height: '95%',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    // marginTop: 10,
    // marginLeft: 5,
    // marginRight: 5,
    // borderRadius: 10,
  },
  animate: {
    position: 'absolute',
  },
  content: {
    width: '100%',
    height: '100%',
    // borderRadius: 10,
  },
});

const heartStyle = opacity =>
  StyleSheet.create({
    heart: {
      opacity: opacity,
    },
  });

export default InterviewContents;

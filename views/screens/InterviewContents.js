import React, {useCallback, useEffect, useRef, useState} from 'react';
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
import EmptyImg from '../../assets/images/Empty.png';
import InterviewModal from '../components/InterviewModal';
import Video from 'react-native-video';
import InterviewAlert from '../components/InterviewAlert';
import {useFocusEffect} from '@react-navigation/native';

const InterviewContents = ({id, path}) => {
  const InterviewContents = ({path}) => {
    const opacity = useRef(new Animated.Value(0)).current; //하트 이미지 보일 때 사용

    const [heart, setHeart] = useState(false); // 하트 상태
    const [modalOpen, setModalOpen] = useState(false); // 수정 모달 상태
    const [filePath, setFilePath] = useState(path); // video 주소

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
    //찜 기능
    const toggleHeart = () => {
      //video 데이터가 없을 땐 찜 기능 안되도록
      if (filePath !== '') {
        setHeart(previousState => !previousState);
        fillHeart();
      } else {
        // Alert.alert('데이터가 없습니다.');
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
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.iconBar}>
          <TouchableOpacity onPress={toggleHeart} style={styles.icon}>
            {heart ? (
              <Icon name="heart" size={30} color={'red'} />
            ) : (
              <Icon name="heart" size={30} color={'#E4E3E8'} />
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
              doubleTap();
              console.log(filePath);
            }}
            onLongPress={() => setModalOpen(true)}>
            {/* 저장된 video가 있으w면 video 출력. 없으면  마스외전 로고 출력*/}
            <Video
              ref={useRef(null)}
              source={{uri: filePath}}
              style={[styles.content]}
              controls={false}
              resizeMode="cover"
              repeat={true}
              paused={!isPlaying} // isPlaying 상태에 따라 재생/일시정지 제어
              onEnd={() => {
                setIsPlaying(false);
              }}
            />
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
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
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
};
export default InterviewContents;

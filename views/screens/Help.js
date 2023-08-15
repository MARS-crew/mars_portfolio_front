import React, {useState} from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Swiper from 'react-native-swiper';
import Title from '../components/commonComponent/Title';
import Close from '../../assets/images/slideClose.png';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(33, 33, 33, 0.7)',
  },
  closeButton: {
    position: 'absolute',
    top: 25,
    right: 25,
  },
  close: {
    height: 30,
    width: 30,
  },
  helpArrow1: {
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    height: 215,
    width: 248,
  },
  helpArrow2: {
    marginTop: 80,
    height: 74.5,
  },
  slide1: {
    paddingHorizontal: 64,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Help = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const TITLE_1 = {
    text1: `이전 기수는 위쪽, 다음 기수는 아래쪽\n위아래로 화면을 밀어보세요!`,
    text2: `해당 기수의 멤버를 보고 싶다면\n사진을 클릭!\n또는 화면을 오른쪽으로 밀어보세요!`,
    src1: require('../../assets/images/helpArrow1.png'),
    src2: require('../../assets/images/helpArrow2.png'),
  };
  const TITLE_2 = {
    text1: `원하는 멤버를 클릭해\n멤버의 인터뷰 영상을 확인해보세요!`,
    text2: `화면을 오른쪽으로 밀어서\n확인할 수도 있어요!`,
    src2: require('../../assets/images/helpArrow3.png'),
  };
  const TITLE_3 = {
    text1: `화면을 위아래로 밀면\n다른 멤버가 보여요!`,
    text2: `멤버에 대해 궁금하면\n화면을 좌우로 밀어주세요!`,
    src2: require('../../assets/images/helpArrow4.png'),
  };
  const TITLE_4 = {
    text1: `왼쪽으로 밀어 로그를 삭제할 수 있어요!`,
    src1: require('../../assets/images/helpArrow5.png'),
  };
  const slide2 = {
    paddingHorizontal: 55,
  };
  const slide3 = {
    paddingHorizontal: 55,
  };
  const slide4 = {
    paddingHorizontal: 55,
  };

  const HelpSlid = (text, Horizontal) => {
    return (
      <View style={[styles.slide1, Horizontal]}>
        <TouchableOpacity style={styles.closeButton}>
          <Image source={Close} style={styles.close} />
        </TouchableOpacity>

        <Image source={text.text.src1} style={styles.helpArrow1} />

        <Title textAlign="center" fontSize={18} color={'white'}>
          {text.text.text1}
        </Title>
        <Image
          source={text.text.src2}
          style={[styles.helpArrow1, styles.helpArrow2]}
        />
        <Title textAlign="center" fontSize={18} color={'white'}>
          {text.text.text2}
        </Title>
      </View>
    );
  };

  return (
    <Swiper
      style={styles.container}
      showsButtons
      showsPagination={false}
      loop={false}>
      <HelpSlid text={TITLE_1}></HelpSlid>
      <HelpSlid text={TITLE_2}></HelpSlid>
      <HelpSlid text={TITLE_3}></HelpSlid>
      <HelpSlid text={TITLE_4} Horizontal={slide4}></HelpSlid>
    </Swiper>
  );
};

export default Help;

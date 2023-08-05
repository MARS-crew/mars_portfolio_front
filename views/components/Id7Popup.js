import React, {useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Linking,
  Text,
  View,
  Image,
  Pressable,
  Dimensions,
  ImageBackground
} from 'react-native';
import * as Progress from 'react-native-progress';

import PublicModal from './PublicModal';
import Title from './Title';
import closeblack from '../../assets/images/closeblack.png';
import testImg from '../../assets/images/testImg.png';

const { width, height } = Dimensions.get('window');
const squareSize = Math.min(width, height) * 0.9;



const Id7Popup = ({
  id,
//  src,
//  onModify,
  contentsViewPopVisible,
  setContentsViewPopVisible,
  }) => {
  const [selectedButton, setSelectedButton] = useState(selectedValue());
  const rate = 50;

  function calculateLeftValue(rate) {
    // 규칙에 따른 left 값 계산
    let leftValue = rate; // 초기값은 rate로 설정

    const rules = [
      { min: 0, max: 10, offset: 5 },
      { min: 10, max: 20, offset: 3 },
      { min: 20, max: 30, offset: 2 },
      { min: 30, max: 40, offset: 1 },
      { min: 50, max: 60, offset: -1 },
      { min: 60, max: 70, offset: -2 },
      { min: 70, max: 90, offset: -3 },
      { min: 80, max: 90, offset: -4 },
      { min: 90, max: 101, offset: -5 },
    ];

    for (const rule of rules) {
      if (rate >= rule.min && rate < rule.max) {
        leftValue += rule.offset;
        break; // 조건에 맞는 규칙을 찾았으므로 반복문 종료
      }
    }

    return `${leftValue}%`;
  }


  function selectedValue() {
    if (id === 'java') return 'java';
    else if (id === 'php') return 'php';
    else if (id === 'react') return 'react';
    else if (id === 'mysql') return 'mysql';
    else if (id === 'js') return 'js';
    else if (id === 'html') return 'html';
    else return 'java';
  }

  function selectedTestTitle() {
    if (id === 'java') return 'JAVA';
    else if (id === 'php') return 'PHP';
    else if (id === 'react') return 'REACT';
    else if (id === 'mysql') return 'MySQL';
    else if (id === 'js') return 'JavaScript';
    else if (id === 'html') return 'HTML5';
    else return 'JAVA';
  }

  return (
    <PublicModal
      id={id}
   //   onModify={onModify}
      isModalVisible={contentsViewPopVisible}
      setIsModalVisible={setContentsViewPopVisible}>

      <Pressable onPress={() => setContentsViewPopVisible(true)} style={styles.modalView}>
        <View style={styles.titleView}>
          <Title fontSize={18}>{selectedTestTitle()}</Title>
          <TouchableOpacity onPress={() => setContentsViewPopVisible(false)}>
            <Image source={closeblack} />
          </TouchableOpacity>
        </View>
        {selectedButton === 'java' && (
          <View style={styles.contentView}>
            <View style={styles.imageView}>
              {/* <Image source={testImg} style={styles.image} /> */}
              <Progress.Bar
                progress={rate/100}
                width={320}
                height={10}
                color='#072AC8'
                unfilledColor='#F5F4F9'
                borderColor='#ffffff'
                borderRadius={10}
              >
                </Progress.Bar>
                <ImageBackground
                  source={require('../../assets/images/blackBuble.png')}
                  style={[styles.bubble, {  left: calculateLeftValue(rate),  transform: [{ rotate: '180deg' }] }]}
              >
              <View style={styles.bubbleContent}>
                <Text
                  style={[styles.bubbleText, {transform: [{ rotate: '180deg' }] }]}
                >{rate}</Text>
              </View>
            </ImageBackground>
            </View>

            <Title>
            2015년 공표된 JavaScript의 최신 표준 명세이며, 줄여서 ES6라고도 부릅니다. 기존 자바스크립트에서 문제점이라 지적 되었던 것들, 혹은 필요하다고 생각되는 문법이 많이 추가되어 더 편리한 언어로 거듭되었습니다.
              {'\n'} 
              {'\n'}
              {'\n'}
            구형 브라우저에서는 바로 사용할 수 없으며, 구형 코드로 변환하는 과정이 필요합니다.NodeJS나 Chromium App, Electron 등에서는 바로 사용할 수 있습니다.
            </Title>
          </View>
        )}
        <TouchableOpacity
          style={[styles.pickBtn, styles.chooseOkBtn]}
          onPress={() => {
            setContentsViewPopVisible(false); // pickBtn: 모달 영역 안 (DetailPopup X 닫기)
          }}>
          <Title color={'white'}>확인</Title>
        </TouchableOpacity>
      </Pressable>
    </PublicModal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    width: Dimensions.get('window').width / 1,
    position: 'absolute',
    bottom: 0,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#EEEEEE',
    padding: 20,
    backgroundColor: '#fff',
  },
  titleView: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 45,
    marginRight:0
  },
  image: {
    width: squareSize,
    height: squareSize,
    resizeMode: 'contain',
  },
  pickBtn: {
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#EEEEEE',
    borderWidth: 1,
    borderRadius: 20,
    marginTop: 20,
  },
  chooseOkBtn: { backgroundColor: '#072AC8', borderWidth: 0 },
  bubble:{
    position:'absolute',
    width:36,
    height:36,
   //left:'rate'
    top:12,
    marginLeft:-15,
    marginRight:40
  },
  bubbleContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom:8,

   // marginLeft:20
  },
  bubbleText:{
    color:'#ffffff',
  }
});


export default Id7Popup;

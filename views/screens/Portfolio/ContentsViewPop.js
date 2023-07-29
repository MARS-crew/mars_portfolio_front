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
} from 'react-native';

const {width, height} = Dimensions.get('window');
const squareSize = Math.min(width, height) * 0.9;

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
    marginBottom: 15,
  },

  image: {
    width: squareSize,
    height: squareSize,
    resizeMode: 'contain',
  },
  nullImage: {
    width: Dimensions.get('window').width / 3,
    height: Dimensions.get('window').height / 3,
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
  chooseOkBtn: {backgroundColor: '#072AC8', borderWidth: 0},
});

import PublicModal from '../../components/PublicModal';
import pause from '../../../assets/images/pause.png';
import linkBtn from '../../../assets/images/linkBtn.png';
import closeblack from '../../../assets/images/closeblack.png';
import testImg from '../../../assets/images/testImg.png';

import Title from '../../components/Title';

const ContentsViewPop = ({
  id,
  src,
  onModify,
  contentsViewPopVisible,
  setContentsViewPopVisible,
}) => {
  const [selectedButton, setSelectedButton] = useState(selectedValue());
  const TEST_TITLE = `포트폴리오 사진 상세 팝업 테스트 입니다. \n
          자세한 내용은 추후 업데이트 될 예정입니다.
          \n Graphic design day
          \n Graphic design
          \n day Graphic design
          \n day April 27
          \n
          \n Portfolio.js > ContentsViewPop.js`;

  function selectedValue() {
    if (id == '1') return 'Photo';
    else if (id == '2') return 'Video';
    else if (id == '3') return 'Link';
    else if (id == '5') return 'Null';
    else return 'Photo';
  } // id값을 통해 사진 수정 시 초기 selected 값을 사진으로 적용하여 각 종류에 맞는 DetailPopup이 열려있도록 구현

  function selectedTestTitle() {
    if (id == '1') return '이미지';
    else if (id == '2') return '영상';
    else if (id == '3') return '링크';
    else if (id == '5') return '(비어있음)';
    else return 'Photo';
  } // 테스트용

  // const ContentsView = (title, src) => {
  //   return (
  //     <View style={styles.contentView}>
  //       <View style={styles.imageView}>
  //         <Image source={src} style={styles.image} />
  //       </View>
  //       <Title style={styles.input}>{title}</Title>
  //     </View>
  //   );
  // };

  return (
    <PublicModal
      id={id}
      onModify={onModify}
      isModalVisible={contentsViewPopVisible}
      setIsModalVisible={setContentsViewPopVisible}>
      <Pressable
        onPress={() => setContentsViewPopVisible(true)} // Pressable: Modal 영역 안 클릭 시 Modal 유지 구현을 위해 Pressable로 감싸서 적용
        style={styles.modalView}>
        <View style={styles.titleView}>
          <Title fontSize={18} style={styles.input}>
            {selectedTestTitle()}
          </Title>
          <TouchableOpacity
            onPress={() => {
              setContentsViewPopVisible(false); // pickBtn: 모달 영역 안 (DetailPopup X 닫기)
            }}>
            <Image source={closeblack}></Image>
          </TouchableOpacity>
        </View>

        {selectedButton === 'Photo' && (
          <View style={styles.contentView}>
            <View style={styles.imageView}>
              <Image source={testImg} style={styles.image} />
            </View>
            <Title style={styles.input}>
              포트폴리오 영상 상세 팝업 이미지 부분 테스트 입니다. {'\n'}
              자세한 내용은 추후 업데이트 될 예정입니다.
              {'\n'} Graphic design day
              {'\n'} Graphic design
              {'\n'} day Graphic design
              {'\n'} day April 27
              {'\n'}
              {'\n'}Portfolio.js {'>'} ContentsViewPop.js
            </Title>
          </View>
        )}
        {selectedButton === 'Video' && (
          <View style={styles.contentView}>
            <View style={styles.imageView}>
              <Image source={testImg} style={styles.image} />
            </View>
            <Title style={styles.input}>
              포트폴리오 영상 상세 팝업 이미지 부분 테스트 입니다. {'\n'}
              자세한 내용은 추후 업데이트 될 예정입니다.
              {'\n'} Graphic design day
              {'\n'} Graphic design
              {'\n'} day Graphic design
              {'\n'} day April 27
              {'\n'}
              {'\n'}Portfolio.js {'>'} ContentsViewPop.js
            </Title>
          </View>
        )}
        {selectedButton === 'Link' && (
          <View style={styles.contentView}>
            <View style={styles.imageView}>
              <Image source={testImg} style={styles.image} />
            </View>
            <Title style={styles.input}>
              포트폴리오 링크 상세 팝업 이미지 부분 테스트 입니다. {'\n'}
              자세한 내용은 추후 업데이트 될 예정입니다.
              {'\n'} Graphic design day
              {'\n'} Graphic design
              {'\n'} day Graphic design
              {'\n'} day April 27
              {'\n'}
              {'\n'}Portfolio.js {'>'} ContentsViewPop.js
            </Title>
          </View>
        )}
        {selectedButton === 'Null' && (
          <View style={styles.contentView}>
            <View style={styles.imageView}>
              <Image source={src} style={[styles.nullImage]} />
            </View>
            <Title style={styles.input}>
              포트폴리오 Null 상세 팝업 이미지 부분 테스트 입니다. {'\n'}
              자세한 내용은 추후 업데이트 될 예정입니다.
              {'\n'} Null
              {'\n'}Portfolio.js {'>'} ContentsViewPop.js
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
export default ContentsViewPop;

import React, {useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
  Image,
  Pressable,
} from 'react-native';

const styles = StyleSheet.create({
  modalView: {
    width: 325,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#EEEEEE',
    padding: 20,
    backgroundColor: '#fff',
    marginHorizontal: 25,
  },
  contentView: {
    alignItems: 'center',
  },
  chooseContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    display: 'flex',
    marginBottom: 25,
  },
  chooseBtn: {
    width: 95,
    height: 26,
    borderColor: '#F5F5F5',
    borderBottomWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 5,
  },
  input: {
    borderColor: '#EEEEEE',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 12,
    paddingTop: 14,
    paddingBottom: 14,
    marginBottom: 12,
    width: 285,
    height: 45,
  },
  description: {
    height: 100,
    textAlignVertical: 'top',
  },

  pickBtn: {
    width: 132,
    height: 39,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#EEEEEE',
    borderWidth: 1,
    borderRadius: 20,
  },
  chooseOkBtn: {backgroundColor: '#072AC8', borderWidth: 0, marginLeft: 22},
  inputRightMargin: {
    marginRight: 5,
    marginBottom: 0,
  },
  flexEnd: {
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  flexCenter: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 20,
    flexDirection: 'row',
  },
  PressedBtn: {borderBottomWidth: 2, borderColor: '#072AC8'},
});

import PublicModal from '../../components/PublicModal';
import DetailPopAttachment from './DetailPopAttachment';
import Title from '../../components/Title';
import ChoosePop from '../../components/ChoosePop';
import closeblack from '../../../assets/images/closeblack.png';

const DetailPop = ({
  id,
  portfolio,
  onModify,
  detailPopVisible,
  setDetailPopVisible,
  checkChoosePopOkButton,
  setCheckChoosePopOkButton,
  setTogleButton,
}) => {
  const [selectedButton, setSelectedButton] = useState(selectedValue());
  const [button1Pressed, setButton1Pressed] = useState(selected1Pressed());
  const [button2Pressed, setButton2Pressed] = useState(selected2Pressed());
  const [button3Pressed, setButton3Pressed] = useState(selected3Pressed());
  const [choosePopVisible, setChoosePopVisible] = useState(false);
  const [addPressedIf, SetAddPressedIf] = useState(true);
  // 포트폴리오 아이템에서 Add 버튼 클릭 시 등장하는 디테일 팝업 적용 후 확인을 눌렀는지 확인하는 스테이트

  function selectedValue() {
    if (id == '1') return 'Photo';
    else if (id == '2') return 'Video';
    else if (id == '3') return 'Link';
    else return 'Photo';
  } // id값을 통해 사진 수정 시 초기 selected 값을 사진으로 적용하여 각 종류에 맞는 DetailPopup이 열려있도록 구현

  function selected1Pressed() {
    if (id == '1' || id == '4' || id == '5' || id == '6') return true;
  } // id값을 통해 Photo나 나머지 블럭에서 DetailPopup을 실행한 경우 Photo 버튼의 초기 색상을 설정
  function selected2Pressed() {
    if (id == '2') return true;
  }
  function selected3Pressed() {
    if (id == '3') return true;
  } // id값을 통해 buttonPressed 1~3의 Pressed 값을 useState 초기값으로 설정(버튼의 초기 색상을 담당)

  const handleButtonPress = buttonName => {
    setSelectedButton(buttonName);
  }; // buttonName값을 통해 selectedButton의 Pressed 값을 useState 초기값으로 설정(버튼의 초기 토글을 담당)

  const handleButton1Press = () => {
    setButton1Pressed(true);
    setButton2Pressed(false);
    setButton3Pressed(false);
  };

  const handleButton2Press = () => {
    setButton1Pressed(false);
    setButton2Pressed(true);
    setButton3Pressed(false);
  };

  const handleButton3Press = () => {
    setButton1Pressed(false);
    setButton2Pressed(false);
    setButton3Pressed(true);
  }; // buttonPressed 1~3의 Pressed 여부로 나머지 버튼의 토글 여부를 결정

  return (
    <PublicModal
      id={id}
      onModify={onModify}
      isModalVisible={detailPopVisible}
      setIsModalVisible={setDetailPopVisible}>
      <Pressable
        onPress={() => setDetailPopVisible(true)} // Pressable: Modal 영역 안 클릭 시 Modal 유지 구현을 위해 Pressable로 감싸서 적용
        style={styles.modalView}>
        <View style={styles.flexEnd}>
          <TouchableOpacity
            onPress={() => {
              setDetailPopVisible(false); // pickBtn: 모달 영역 안 (DetailPopup X 닫기)
            }}>
            <Image source={closeblack}></Image>
          </TouchableOpacity>
        </View>
        <View style={styles.contentView}>
          <View style={styles.chooseContainer}>
            <TouchableOpacity
              style={[
                styles.chooseBtn,
                button1Pressed ? styles.PressedBtn : styles.chooseBtn,
              ]}
              onPress={() => [
                handleButtonPress('Photo'),
                handleButton1Press(),
              ]}>
              <Title fontSize={16} color={button1Pressed ? 'blue' : null}>
                이미지
              </Title>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.chooseBtn,
                button2Pressed ? styles.PressedBtn : styles.chooseBtn,
              ]}
              onPress={() => [
                handleButtonPress('Video'),
                handleButton2Press(),
              ]}>
              <Title fontSize={16} color={button2Pressed ? 'blue' : null}>
                영상
              </Title>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.chooseBtn,
                button3Pressed ? styles.PressedBtn : styles.chooseBtn,
              ]}
              onPress={() => [handleButtonPress('Link'), handleButton3Press()]}>
              <Title fontSize={16} color={button3Pressed ? 'blue' : null}>
                링크
              </Title>
            </TouchableOpacity>
          </View>
          {selectedButton === 'Photo' && (
            <View style={styles.TextInputContainer}>
              <DetailPopAttachment></DetailPopAttachment>
              <TextInput
                style={styles.input}
                placeholder="제목"
                placeholderTextColor="#D8D8D8"></TextInput>
              <TextInput
                style={[styles.input, styles.description]}
                placeholder="내용"
                placeholderTextColor="#D8D8D8"></TextInput>
            </View>
          )}
          {selectedButton === 'Video' && (
            <View style={styles.TextInputContainer}>
              <TextInput
                style={styles.input}
                placeholder="링크"
                placeholderTextColor="#D8D8D8"></TextInput>
              <TextInput
                style={styles.input}
                placeholder="제목"
                placeholderTextColor="#D8D8D8"></TextInput>
              <TextInput
                style={[styles.input, styles.description]}
                placeholder="내용"
                placeholderTextColor="#D8D8D8"></TextInput>
            </View>
          )}
          {selectedButton === 'Link' && (
            <View style={styles.TextInputContainer}>
              <DetailPopAttachment></DetailPopAttachment>
              <TextInput
                style={styles.input}
                placeholder="링크"
                placeholderTextColor="#D8D8D8"></TextInput>
            </View>
          )}

          <View style={styles.flexCenter}>
            <TouchableOpacity
              style={styles.pickBtn}
              onPress={() => {
                setDetailPopVisible(false); // pickBtn: 모달 영역 안 (DetailPopup Register 등록)
              }}>
              <Title>취소</Title>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.pickBtn, styles.chooseOkBtn]}
              onPress={() => {
                if (id == 6) {
                  setChoosePopVisible(true);
                } else {
                  setDetailPopVisible(false); // pickBtn: 모달 영역 안 (DetailPopup Register 등록)
                }

                if (setCheckChoosePopOkButton !== false) {
                  setCheckChoosePopOkButton(true);
                }

                console.log(checkChoosePopOkButton);
              }}>
              <Title color={'white'}>확인</Title>
            </TouchableOpacity>
          </View>
        </View>
      </Pressable>
      <ChoosePop
        id={id}
        title="수정된 내용을 저장하시겠습니까?"
        onModify={onModify}
        portfolio={portfolio}
        addPressedIf={addPressedIf}
        choosePopVisible={choosePopVisible}
        setChoosePopVisible={setChoosePopVisible}
        setDetailPopVisible={setDetailPopVisible}></ChoosePop>
    </PublicModal>
  );
};
export default DetailPop;

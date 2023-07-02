import React, {useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  TextInput,
  Pressable,
  Dimensions,
} from 'react-native';

const styles = StyleSheet.create({
  modalView: {
    padding: 20,
    backgroundColor: '#fff',
    marginHorizontal: 50,
  },
  chooseContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    display: 'flex',
    marginBottom: 8,
  },
  chooseBtn: {
    flex: 1,
    width: 100,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.8,
    borderColor: '#000',
  },
  input: {
    alignItems: 'center',
    textAlign: 'center',
    borderWidth: 0.8,
    borderColor: '#000',
    height: 35,
    marginBottom: 8,
  },
  description: {
    height: Dimensions.get('window').height / 5,
  },
  videoDescription: {
    height: Dimensions.get('window').height / 7.5,
  },
  pickBtn: {
    width: 100,
    alignItems: 'center',
    borderWidth: 0.8,
    borderColor: '#000',
    padding: 8,
  },
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
  },

  fileContainer: {
    justifyContent: 'space-between',
    paddingHorizontal: 2,
  },
  saveBtn: {
    width: 100,
    height: 30,
    borderColor: '#000',
    backgroundColor: '#fff',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 10,
    right: 10,
  },
});

import PublicModal from '../../components/PublicModal';
import DetailPopAttachment from './DetailPopAttachment';
import ChoosePop from '../../components/ChoosePop';

const DetailPop = ({id, onModify, detailPopVisible, setDetailPopVisible}) => {
  const [selectedButton, setSelectedButton] = useState(selectedValue());
  const [button1Pressed, setButton1Pressed] = useState(selected1Pressed());
  const [button2Pressed, setButton2Pressed] = useState(selected2Pressed());
  const [button3Pressed, setButton3Pressed] = useState(selected3Pressed());
  const [choosePopVisible, setChoosePopVisible] = useState(false);

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
      <TouchableOpacity
        onPress={() => setChoosePopVisible(true)}
        style={styles.saveBtn}>
        <Text>Save</Text>
      </TouchableOpacity>
      <Pressable
        onPress={() => setDetailPopVisible(true)} // Pressable: Modal 영역 안 클릭 시 Modal 유지 구현을 위해 Pressable로 감싸서 적용
        style={styles.modalView}>
        <View style={styles.flexEnd}>
          <TouchableOpacity
            onPress={() => {
              setDetailPopVisible(false); // pickBtn: 모달 영역 안 (DetailPopup X 닫기)
            }}>
            <Text>X</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.chooseContainer}>
          <TouchableOpacity
            style={[
              styles.chooseBtn,
              {backgroundColor: button1Pressed ? '#D8D8D8' : '#fff'},
            ]}
            onPress={() => [handleButtonPress('Photo'), handleButton1Press()]}>
            <Text>Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.chooseBtn,
              {backgroundColor: button2Pressed ? '#D8D8D8' : '#fff'},
            ]}
            onPress={() => [handleButtonPress('Video'), handleButton2Press()]}>
            <Text>Video</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.chooseBtn,
              {backgroundColor: button3Pressed ? '#D8D8D8' : '#fff'},
            ]}
            onPress={() => [handleButtonPress('Link'), handleButton3Press()]}>
            <Text>Link</Text>
          </TouchableOpacity>
        </View>
        {selectedButton === 'Photo' && (
          <View>
            <DetailPopAttachment></DetailPopAttachment>
            <TextInput
              style={styles.input}
              placeholder="TITLE을 입력해주세요"
              placeholderTextColor="#D8D8D8"></TextInput>
            <TextInput
              style={[styles.input, styles.description]}
              placeholder="DESCRIPTION을 입력해주세요"
              placeholderTextColor="#D8D8D8"></TextInput>
          </View>
        )}
        {selectedButton === 'Video' && (
          <View>
            <TextInput
              style={styles.input}
              placeholder="LINK를 입력해주세요"
              placeholderTextColor="#D8D8D8"></TextInput>
            <TextInput
              style={styles.input}
              placeholder="TITLE을 입력해주세요"
              placeholderTextColor="#D8D8D8"></TextInput>
            <TextInput
              style={[styles.input, styles.videoDescription]}
              placeholder="DESCRIPTION을 입력해주세요"
              placeholderTextColor="#D8D8D8"></TextInput>
          </View>
        )}
        {selectedButton === 'Link' && (
          <View>
            <DetailPopAttachment></DetailPopAttachment>
            <TextInput
              style={styles.input}
              placeholder="LINK를 입력해주세요"
              placeholderTextColor="#D8D8D8"></TextInput>
          </View>
        )}

        <View style={styles.flexCenter}>
          <TouchableOpacity
            style={styles.pickBtn}
            onPress={() => {
              setDetailPopVisible(false); // pickBtn: 모달 영역 안 (DetailPopup Register 등록)
              onModify(id); //개발 방식 검토중인 기능이므로 구현 미완료
            }}>
            <Text>Register</Text>
          </TouchableOpacity>
        </View>
      </Pressable>
      <ChoosePop
        id={id}
        title="저장하시겠습니까?"
        onModify={onModify}
        choosePopVisible={choosePopVisible}
        setChoosePopVisible={setChoosePopVisible}
        setDetailPopVisible={setDetailPopVisible}></ChoosePop>
    </PublicModal>
  );
};
export default DetailPop;

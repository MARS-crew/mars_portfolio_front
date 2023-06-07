import React, { useState } from 'react';
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Dimensions,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';

const YoutubePop = ({
  youtubePopVisible,
  setYoutubePopVisible,
  setShowSaveBtn,
  setChangeData,
}) => {
  const [url, setUrl] = useState(''); //입력된 주소값 저장

  const handleRegister = () => {
    if (url.trim() === '') {          //주소값이 입력되지 않았는데 수정할 때
      Alert.alert('url을 입력해주세요');
    } else {
      setChangeData({ uri: url }); //불러올 데이터 이미지 입력 -> 흰 바탕 출력

      setYoutubePopVisible(false); // youtube url / 현재는 이미지 파일 입력 팝업 닫기
      setShowSaveBtn(true);        // 입력된 값이 있으면 save버튼 생성 
    }
  };
  return (
    <Modal
      animationType={'fade'}
      transparent={true}
      visible={youtubePopVisible}
      onRequestClose={() => {
        setYoutubePopVisible(!youtubePopVisible);
      }}>
      <KeyboardAvoidingView
        style={styles.modalContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <TouchableOpacity
          onPress={() => setYoutubePopVisible(false)} // modalBackdropPress: 모달 영역 밖 클릭 시 DetailPopup(Modal) 닫힘 구현을 위해 TouchableOpacity로 modalView를 감싸서 적용
          style={styles.modalBackdropPress}>
          <Pressable
            onPress={() => setYoutubePopVisible(true)} // Pressable: 모달 영역 안 클릭 시 DetailPopup(Modal) 유지 구현을 위해 Pressable로 감싸서 적용
            style={styles.modalView}>
            <View style={styles.flexEnd}>
              <TouchableOpacity
                onPress={() => {
                  setYoutubePopVisible(false); // pickBtn: 모달 영역 안 (DetailPopup X 닫기)
                }}>
                <Text>X</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.popUpContainer, styles.fileContainer]}>
              <Text style={styles.inputRightMargin}>YouTube</Text>
            </View>
            <View style={styles.popUpContainer}>
              <TextInput
                style={[styles.Input, styles.inputRightMargin]}
                value={url}
                onChangeText={setUrl}></TextInput>
            </View>

            <View style={styles.flexCenter}>
              <TouchableOpacity style={styles.pickBtn} onPress={handleRegister}>
                <Text>Register</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackdropPress: {
    flex: 1,
    paddingTop: Dimensions.get('window').height / 2,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: Dimensions.get('window').height / 2,
    height: Dimensions.get('window').height / 4.5,
    marginHorizontal: 50,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  popUpContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    display: 'flex',
    marginBottom: 8,
  },

  Input: {
    flex: 2.5,
    alignItems: 'center',
    textAlign: 'center',
    borderWidth: 0.5,
    borderColor: '#000',
    height: 35,
    marginBottom: 8,
  },

  pickBtn: {
    width: 100,
    alignItems: 'center',
    borderWidth: 0.5,
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
  Description: {
    flex: 10,
  },
  fileContainer: {
    justifyContent: 'space-between',
    paddingHorizontal: 2,
  },
});
export default YoutubePop;

import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Dimensions,
  Text,
  View,
} from 'react-native';
import axios from 'axios';
import { useEffect } from 'react';
import { sortBy } from 'lodash';

const InterviewSavePop = ({
  savePopVisible,
  setSavePopVisible,
  setIsEditing,
  setModalOpen,
  setIsPlaying,
  setFilePath,
  changeData,
  setChangeData,
  setHeart,
  changeHeart,
  setPrevFile,
  prevFile,
  token,
  interviewId,
}) => {
  const saveInterview = async () => {
    console.log(changeData)
    const source = axios.CancelToken.source();

    axios({
      method: 'PUT',
      url: 'https://api.writeyoume.com/api/v1/interview/' + interviewId,
      headers: {
        Authorization: token
      },
      data : {
        file_url : changeData
      },
      cancelToken: source.token
    })
      .then((response) => {
        console.log("성공")
        console.log(response);
      })
      .catch((e) => {
        console.log("실패");
        console.log(e);
      });
    return () => {
      source.cancel('API 호출이 취소되었습니다.');
    }
  }

  const handleSave = () => {
    saveInterview();

    setIsEditing(false);
    setModalOpen(false);
    setIsPlaying(true);
    // setFilePath(changeData);
    setChangeData(); // 저장된 데이터 초기화
    // setSavePopVisible(false);
    setHeart(changeHeart);
    setSavePopVisible(false);
    setPrevFile();
  };

  const handleCancel = () => {
    setFilePath(prevFile);
    setIsEditing(false);
    setPrevFile();

  };

  return (
    <Modal
      title
      animationType={'fade'}
      transparent={true}
      visible={savePopVisible}
      onRequestClose={() => {
        setSavePopVisible(!savePopVisible);
      }}>
      <TouchableOpacity
        onPress={() => setSavePopVisible(false)} // modalBackdropPress: 모달 영역 밖 클릭 시 ChoosePopup(Modal) 닫힘 구현을 위해 TouchableOpacity로 modalView를 감싸서 적용
        style={styles.modalBackdropPress}>
        <Pressable
          onPress={() => setSavePopVisible(true)} // Pressable: 모달 영역 안 클릭 시 ChoosePopup(Modal) 유지 구현을 위해 Pressable로 감싸서 적용
          style={styles.modalView}>
          <Text style={styles.modalTitle}>수정된 내용을 저장하시겠습니까?</Text>
          <View style={styles.chooseContainer}>
            <TouchableOpacity
              style={btnStyle(false).btn}
              onPress={() => {
                handleCancel();
                setSavePopVisible(false); // chooseBtn: 모달 영역 안 (ChoosePopup YES or NO, props를 통해 {title} 설정(예:  title="삭제하시겠습니까?"))
              }}>
              <Text style={textStyle(false).btnText}>취소</Text>
            </TouchableOpacity>
            <TouchableOpacity style={btnStyle(true).btn} onPress={handleSave}>
              <Text style={textStyle(true).btnText}>확인</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackdropPress: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#F5F5F5',
    backgroundColor: '#fff',
    // marginTop: Dimensions.get('window').height / 3,
    marginTop: 256,
    margin: 37,
    height: 145,
    // marginHorizontal: 50,
  },
  modalTitle: {
    alignItems: 'center',
    textAlign: 'center',
    margin: 30,
    fontSize: 16,
    color: 'black',
    // borderWidth: 0.5,
    // borderColor: '#000',
    // padding: 12,
  },
  chooseContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    display: 'flex',
    paddingTop: 6,
    paddingRight: 20,
  },
});

// 버튼 스타일
const btnStyle = isConfirm =>
  StyleSheet.create({
    btn: {
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: '#F5F5F5',
      borderRadius: 20,
      padding: 8,
      width: 60,
      height: 40,
      marginLeft: 10,
      backgroundColor: isConfirm ? '#072AC8' : '#FFFFFF'
    },
  });

const textStyle = isConfirm => StyleSheet.create({
  btnText: {
    color: isConfirm ? '#FFFFFF' : 'black',
    height: 16,
    fontSize: 14,
    fontWeight: 'bold',
    alignContent: 'center',
  }
})

export default InterviewSavePop;

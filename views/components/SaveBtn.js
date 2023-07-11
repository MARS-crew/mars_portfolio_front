import React from 'react';
import { StyleSheet, TouchableOpacity, Text, Alert, Dimensions, View } from 'react-native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

const SaveBtn = ({
  setShowSaveBtn,
  setModalOpen,
  changeData,
  setInterviewImg,
  setChangeData,
}) => {
  const handleSaveImg = () => {
    setModalOpen(false);
    setShowSaveBtn(false);
    setInterviewImg(changeData);
    setChangeData(); // 데이터 초기화
    Alert.alert('Modal', '저장');
  };
  return (
    <Pressable
      // onPress={() => setDeletePopVisible(true)} // Pressable: 모달 영역 안 클릭 시 ChoosePopup(Modal) 유지 구현을 위해 Pressable로 감싸서 적용
      style={styles.modalView}>
      <Text style={styles.modalTitle}>저장하시겠습니까</Text>
      <View style={styles.chooseContainer}>
        <TouchableOpacity style={styles.chooseBtn} onPress={handleSaveImg}>
          <Text>YES</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.chooseBtn}
          onPress={() => {
            setShowSaveBtn(false); // chooseBtn: 모달 영역 안 (ChoosePopup YES or NO, props를 통해 {title} 설정(예:  title="삭제하시겠습니까?"))
            setModalOpen(false);
          }}>
          <Text>NO</Text>
        </TouchableOpacity>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
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
  modalBackdropPress: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: '#fff',
    marginTop: Dimensions.get('window').height / 2.5,
    marginHorizontal: 50,
  },
  modalTitle: {
    alignItems: 'center',
    textAlign: 'center',
    borderWidth: 0.5,
    borderColor: '#000',
    padding: 12,
  },
  chooseContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    display: 'flex',
  },
  chooseBtn: {
    flex: 1,
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#000',
    padding: 8,
  },
});

export default SaveBtn;

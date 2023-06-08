import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, Alert, Dimensions, Modal, View } from 'react-native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';


const InterviewSavePop = ({
  setShowSaveBtn,
  setModalOpen,
  changeData,
  setInterviewImg,
  setChangeData,
  savePopVisible,
  setSavePopVisible
}) => {
  const handleSaveImg = () => {
    setModalOpen(false);
    setShowSaveBtn(false);
    setInterviewImg(changeData);
    setChangeData();        // 데이터 초기화
    setSavePopVisible(false);
    Alert.alert('Modal', '저장');
  }
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
        {/* {showSaveBtn && (
          <SaveBtn />
        )} */}
        <Pressable
          onPress={() => setSavePopVisible(true)} // Pressable: 모달 영역 안 클릭 시 ChoosePopup(Modal) 유지 구현을 위해 Pressable로 감싸서 적용
          style={styles.modalView}>
          <Text style={styles.modalTitle}>저장하시겠습니까?</Text>
          <View style={styles.chooseContainer}>
            <TouchableOpacity style={styles.chooseBtn} onPress={handleSaveImg}>
              <Text>YES</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.chooseBtn}
              onPress={() => {
                setSavePopVisible(false); // chooseBtn: 모달 영역 안 (ChoosePopup YES or NO, props를 통해 {title} 설정(예:  title="삭제하시겠습니까?"))
                setModalOpen(false);
              }}>
              <Text>NO</Text>
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

export default InterviewSavePop;

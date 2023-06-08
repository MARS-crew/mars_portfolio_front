import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';

const SaveBtn = ({
  setShowSaveBtn,
  setModalOpen,
  changeData,
  setInterviewImg,
  setChangeData,
}) => {
  const [savePopVisible, setSavePopVisible] = useState(false);

  const handleSaveImg = () => {
    setModalOpen(false);
    setShowSaveBtn(false);
    setInterviewImg(changeData);
    setChangeData();        // 데이터 초기화
    Alert.alert('Modal', '저장');
  }
  return (
    <TouchableOpacity
      onPress={handleSaveImg}
      style={styles.saveBtn}>
      <Text>Save</Text>
    </TouchableOpacity>
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
});

export default SaveBtn;

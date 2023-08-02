import React, { useState } from 'react';
import { TouchableOpacity, Text, View, Image, StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  popupContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 16,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: Dimensions.get('window').height / 12,
    borderWidth: 2,
    borderColor: '#EEE',
  },
  popupButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    marginLeft: 4,
  },
});

const CustomPopup = ({
  isVisible,
  onClose,
  onSave,
  onDelete,
  onEdit,
  onRemove,
  checkChoosePopOkButton,
  checkDeletePopOkButton,
}) => {
  if (!isVisible) {
    return null;
  }
  const handleOutsidePress = () => {
    if (isVisible) {
      // 모달을 닫기 위해서는 사용자가 모달 안의 "취소" 버튼을 눌러야 합니다.
      if (!checkChoosePopOkButton && !checkDeletePopOkButton) {
        onClose(); // "취소" 버튼을 누르면 onClose 콜백함수를 호출합니다.
      }
    }}


  return (
        
    <View style={styles.popupContainer}>
      {checkChoosePopOkButton ? (
        <TouchableOpacity style={styles.popupButton} onPress={onSave}>
          <Image source={require('../../assets/images/editIcon.png')} style={styles.image} />
          <Text style={styles.buttonText}>저장</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.popupButton} onPress={onEdit}>
          <Image source={require('../../assets/images/editingIcon.png')} style={styles.image} />
          <Text style={styles.buttonText}>수정</Text>
        </TouchableOpacity>
      )}

      {checkDeletePopOkButton ? (
        <TouchableOpacity style={styles.popupButton} onPress={onDelete}>
          <Image source={require('../../assets/images/deletedIcon.png')} style={styles.image} />
          <Text style={styles.buttonText}>저장</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.popupButton} onPress={onRemove}>
          <Image source={require('../../assets/images/editIcon.png')} style={styles.image} />
          <Text style={styles.buttonText}>삭제</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.popupButton} onPress={onClose}>
        <Image source={require('../../assets/images/cancelIcon.png')} style={styles.image} />
        <Text style={styles.buttonText}>취소</Text>
      </TouchableOpacity>
    </View>
  );
};

const ResumeEditMode = ({
  //공통 프롭스
  isModalVisible,
  setIsModalVisible,
  //이력서 프롭스
  resume,
}) => {
  //공통 스테이트
  const [detailPopVisible, setDetailPopVisible] = useState(false);
  const [removeChoosePopVisible, setRemoveChoosePopVisible] = useState(false);
  const [saveChoosePopVisible, setSaveChoosePopVisible] = useState(false);
  const [togleButton, setTogleButton] = useState(false);
  const [checkDeletePopOkButton, setCheckDeletePopOkButton] = useState(false);
  const [checkChoosePopOkButton, setCheckChoosePopOkButton] = useState(false);

  const onClose = () => {
    // 모달을 닫기 위해서는 사용자가 모달 안의 "취소" 버튼을 눌러야 합니다.
    if (!checkChoosePopOkButton && !checkDeletePopOkButton) {
      setIsModalVisible(false);
      setTogleButton(false);
    }
  };

   return (
    <>
      {isModalVisible && (
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => {
            setIsModalVisible(false);
            setTogleButton(false);
          }}
        >
          {/* 팝업 뒤의 내용을 여기에 렌더링합니다 */}
        </TouchableOpacity>
      )}
      <CustomPopup
        isVisible={isModalVisible}
        onClose={onClose} // onClose 콜백함수를 전달합니다.
        onSave={() => {
          // 저장 기능 처리
          // setTogleButton(true);
          // setSaveChoosePopVisible(true);
        }}
        onDelete={() => {
          // 삭제 기능 처리
          // setTogleButton(true);
          // setRemoveChoosePopVisible(true);
        }}
        onEdit={() => {
          // 수정 기능 처리
          // setDetailPopVisible(true);
          // setTogleButton(true);
        }}
        onRemove={() => {
          // 삭제 기능 처리
          // setRemoveChoosePopVisible(true);
          // setTogleButton(true);
        }}
        checkChoosePopOkButton={checkChoosePopOkButton}
        checkDeletePopOkButton={checkDeletePopOkButton}
      />
    </>
  );
};

export default ResumeEditMode;






import React, {useState} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Text,
  View,
} from 'react-native';
const styles = StyleSheet.create({
  image: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  //Modal
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
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalView: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    display: 'flex',
    height: Dimensions.get('window').height / 15,
  },
});

const PortfolioModal = ({isModalVisible, setIsModalVisible}) => {
  return (
    <Modal
      animationType={'fade'}
      transparent={true}
      visible={isModalVisible}
      onRequestClose={() => {
        setIsModalVisible(!isModalVisible);
      }}>
      <TouchableOpacity
        onPress={() => setIsModalVisible(false)} // modalBackdropPress: 모달 영역 밖 클릭 시 Bottom Nav(Modal) 닫힘 구현을 위해 TouchableOpacity로 modalView를 감싸서 적용
        style={styles.modalBackdropPress}>
        <TouchableOpacity
          onPress={() => setIsModalVisible(false)}
          style={styles.saveBtn}>
          <Text>Save</Text>
        </TouchableOpacity>
        <View style={styles.modalView}>
          <TouchableOpacity
            onPress={() => {
              setIsModalVisible(false); // modalView: 모달 영역 안 (Modify, Delete 기능이 담긴 Bottom Nav(Modal) 생성)
              Alert.alert('Modal', '생성');
            }}>
            <Text>Modify</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setIsModalVisible(false);
              Alert.alert('Modal', '삭제');
            }}>
            <Text>Delete</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};
export default PortfolioModal;

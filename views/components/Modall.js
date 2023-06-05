import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import SplashImg from '../../assets/images/SplashImg.jpeg';
import EmptyImg from '../../assets/images/EmptyImg.png';

const Modall = ({ modalOpen, setModalOpen, setInterviewImg }) => {
  return (
    <View style={styles.container}>
      <Modal
        animationType={'fade'}
        transparent={true}
        visible={modalOpen}
        onRequestClose={() => {
          setModalOpen(!modalOpen);
          console.log('modal did close');
        }}>
        <TouchableOpacity
          // onPress={() => setModalOpen(true)}
          style={styles.modalBackdropPress}>
          <TouchableOpacity
            onPress={() => {
              setModalOpen(false);
              Alert.alert('Modal', '저장');
            }}
            style={styles.saveBtn}>
            <Text>Save</Text>
          </TouchableOpacity>
          <View style={styles.modalView}>
            <TouchableOpacity
              onPress={() => {
                // setModalOpen(false); // modalView: 모달 영역 안 (Modify, Delete 기능이 담긴 Bottom Nav(Modal) 생성)
                Alert.alert('Modal', '수정');
                setInterviewImg(SplashImg);
              }}>
              <Text>수정</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                // setModalOpen(false);
                Alert.alert('Modal', '삭제');
                setInterviewImg(EmptyImg);
              }}>
              <Text>삭제</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default Modall;

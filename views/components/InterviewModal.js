import React, { useState } from 'react';
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Dimensions,
  Text,
  Alert,
} from 'react-native';

import YoutubePop from './YoutubePop';
import InterviewDeletePop from './InterviewDeletePop';
import InterviewSavePop from './InterviewSavePop';
import EmptyImg from '../../assets/images/EmptyImg.png';

const InterviewModal = ({
  modalOpen,
  setModalOpen,
  interviewImg,
  setInterviewImg,
  heart,
  setHeart,
}) => {
  const [changeData, setChangeData] = useState(null);
  const [youtubePopVisible, setYoutubePopVisible] = useState(false);
  const [deletePopVisible, setDeletePopVisible] = useState(false);
  const [savePopVisible, setSavePopVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [changeHeart, setChangeHeart] = useState(heart);


  const handleSave = () => {
    setIsEditing(false);
    setModalOpen(false);
    setInterviewImg(changeData);
    setChangeData(); // 저장된 데이터 초기화
    setSavePopVisible(false);
    setHeart(changeHeart);
    Alert.alert('Modal', '저장');
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const showDelete = () => {
    if (interviewImg === EmptyImg) {
      Alert.alert('삭제할 데이터가 없습니다.');
    } else {
      setDeletePopVisible(!deletePopVisible);
    }
  };

  return (
    <Modal
      animationType={'fade'}
      transparent={true}
      visible={modalOpen}
      onRequestClose={() => {
        setModalOpen(!modalOpen);
      }}>
      <TouchableOpacity
        onPress={() => {
          setModalOpen(false);
        }} // modalBackdropPress: 모달 영역 밖 클릭 시 Bottom Nav(Modal) 닫힘 구현을 위해 TouchableOpacity로 modalView를 감싸서 적용
        style={styles.modalBackdropPress}>
        <Pressable
          onPress={() => setModalOpen(true)} // Pressable: 모달 영역 안 클릭 시 Bottom Nav(Modal) 유지 구현을 위해 Pressable로 감싸서 적용
          style={styles.modalView}>
          {isEditing ? (
            <TouchableOpacity onPress={handleSave}>
              <Text>저장</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                // modalView: 모달 영역 안 (Modify, Delete 기능이 담긴 Bottom Nav(Modal) 생성)
                setYoutubePopVisible(!youtubePopVisible);
              }}>
              <Text>수정</Text>
            </TouchableOpacity>
          )}
          {isEditing ? (
            <TouchableOpacity onPress={handleCancel}>
              <Text>취소</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={showDelete}>
              <Text>삭제</Text>
            </TouchableOpacity>
          )}
          <YoutubePop
            youtubePopVisible={youtubePopVisible}
            setYoutubePopVisible={setYoutubePopVisible}
            setIsEditing={setIsEditing}
            setChangeData={setChangeData}
          />
          {/* <TouchableOpacity onPress={showDelete}>
            <Text>Delete</Text>
          </TouchableOpacity> */}
          <InterviewDeletePop
            title="삭제하시겠습니까?"
            deletePopVisible={deletePopVisible}
            setDeletePopVisible={setDeletePopVisible}
            setChangeData={setChangeData}
            setChangeHeart={setChangeHeart}
            setModalOpen={setModalOpen}
            setIsEditing={setIsEditing}
          />
          <InterviewSavePop
            savePopVisible={savePopVisible}
            setSavePopVisible={setSavePopVisible}
            changeData={changeData}
            setChangeData={setChangeData}
            setInterviewImg={setInterviewImg}
          />
        </Pressable>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
export default InterviewModal;

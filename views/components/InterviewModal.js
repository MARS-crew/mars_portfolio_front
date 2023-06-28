import React, { useState } from 'react';
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Dimensions,
  Text,
  Alert,
  Platform,
  PermissionsAndroid
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import InterviewDeletePop from './InterviewDeletePop';

const InterviewModal = ({
  modalOpen,
  setModalOpen,
  heart,
  setHeart,
  filePath,
  setFilePath,
  setIsPlaying
}) => {
  const [changeData, setChangeData] = useState(null);                 // 수정 전 변경 내용 임시 저장
  const [deletePopVisible, setDeletePopVisible] = useState(false);    // 삭제 확인 창 상태
  // const [savePopVisible, setSavePopVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);                  // 수정 여부 확인 ( 수정 내용 없으면 저장 버튼 뜨지 않도록)
  const [changeHeart, setChangeHeart] = useState(heart);              // 수정 내용 저장 전 하트 변경 사항 저장


  const handleSave = () => {
    setIsEditing(false);
    setModalOpen(false);
    setIsPlaying(true);
    setFilePath(changeData);
    setChangeData(); // 저장된 데이터 초기화
    // setSavePopVisible(false);
    setHeart(changeHeart);
    Alert.alert('Modal', '저장');
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const showDelete = () => {
    if (filePath === null) {
      Alert.alert('삭제할 데이터가 없습니다.');
    } else {
      setDeletePopVisible(!deletePopVisible);
    }
  };

  // 갤러리에서 비디오 선택
  // const requestExternalWritePermission = async () => {
  //   if (Platform.OS === 'android') {
  //     try {
  //       const granted = await PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  //         {
  //           title: 'External Storage Write Permission',
  //           message: 'App needs write permission'
  //         },
  //       );
  //       return granted === PermissionsAndroid.RESULTS.GRANTED;
  //     } catch (err) {
  //       console.warn(err);
  //       alert('Write permission err', err);
  //     }
  //     return false;
  //   } else return true;
  // };
  // 갤러리에서 video 파일 선택
  const chooseFile = type => {
    let options = {
      mediaType: 'video',
      maxWidth: 300,
      maxHeight: 550,
      videoQuality: 'low',
      // quality: 1,
    };
    launchImageLibrary(options, response => {

      if (response === undefined) {
        // 선택한 이미지가 없는 경우
        console.log('User did not select an image');
        return;
      }

      console.log('Response = ', response);

      if (response.assets && response.assets.length > 0) {
        const asset = response['assets'][0];
        console.log('base64 -> ', asset.base64);
        console.log('uri -> ', asset.uri);
        console.log('width -> ', asset.width);
        console.log('height -> ', asset.height);
        console.log('fileSize -> ', asset.fileSize);
        console.log('type -> ', asset.type);
        console.log('fileName -> ', asset.fileName);

        setChangeData(asset.uri);
        setIsEditing(true);
      }

    });
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
          if (isEditing) {
            isEditing(false);
          }
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
                chooseFile('video');
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
          <InterviewDeletePop
            title="삭제하시겠습니까?"
            deletePopVisible={deletePopVisible}
            setDeletePopVisible={setDeletePopVisible}
            setChangeData={setChangeData}
            setChangeHeart={setChangeHeart}
            // setModalOpen={setModalOpen}
            setIsEditing={setIsEditing}
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

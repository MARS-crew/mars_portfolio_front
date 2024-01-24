import React, { useEffect, useState } from 'react';
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Dimensions,
  Text,
  Alert,
  Image,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import InterviewDeletePop from './InterviewDeletePop';
import InterviewSavePop from './InterviewSavePop';
import InterviewAlert from './InterviewAlert';

import cancelIcon from '../../assets/images/cancelIcon.png';
import deletedIcon from '../../assets/images/deletedIcon.png';
import editingIcon from '../../assets/images/editingIcon.png';
import axios from 'axios';
import { method } from 'lodash';

const InterviewModal = ({
  token,
  modalOpen,
  setModalOpen,
  interviewId,
  heart,
  setHeart,
  filePath,
  setFilePath,
  setIsPlaying,
}) => {
  const [changeData, setChangeData] = useState(null); // 수정 전 변경 내용 임시 저장
  const [deletePopVisible, setDeletePopVisible] = useState(false); // 삭제 확인 창 상태
  const [savePopVisible, setSavePopVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // 수정 여부 확인 ( 수정 내용 없으면 저장 버튼 뜨지 않도록)
  const [changeHeart, setChangeHeart] = useState(heart); // 수정 내용 저장 전 하트 변경 사항 저장
  const [prevFile, setPrevFile] = useState(filePath); // 저장 전 이전 파일 저장
  const [deleteAlertVisible, setDeleteAlertVisible] = useState(false);



  const retrieveNewUrl = async (file) => {
    await fetch(
      `https://api.writeyoume.com/api/v1/presignedUrl?name=${file.uri}`
    )
      .then((response) => {
        response.json().then((jsonData) => {
          const presignedUrl = jsonData.presignedUrl;
          const uniqueFileName = jsonData.uniqueFileName;
          console.log("presignedUrl: ", presignedUrl);
          console.log("uniqueFileName: ", uniqueFileName);

          console.log("uploadFileToServer 실행");
          uploadFileToServer(file, presignedUrl, uniqueFileName);
        });
      })
      .catch((e) => {
        console.error(e);
      })
  };

  const uploadFileToServer = async (file, presignedUrl, uniqueUrl) => {

    fetch(presignedUrl, {
      method: 'PUT',
      body: {
        uri: file.uri,
        type: 'multipart/form-data',
        name: file.fileName,
      },
      headers: { 'content-type': file.type }
    })
      .then((reso) => {
        console.log(reso);
        const fileInfo = {
          name: file.fileName,
          ext: file.type,
          url: 'https://minio.mars-port.duckdns.org/mars-data/' + uniqueUrl,
        };
        console.log('uploadFile: ', JSON.stringify(fileInfo));
        setChangeData(fileInfo.url);
      })
      .catch((e) => {
        console.log(e);
      })
  }



  const handleCancel = () => {
    if (isEditing) {
      setFilePath(prevFile);

    }
    setModalOpen(false);
    setIsEditing(false);

  };

  const showDelete = () => {
    if (!filePath) {
      setDeleteAlertVisible(true);
    } else {
      const isImage = !filePath.endsWith('.mp4');
      if (isImage) {
        setDeleteAlertVisible(true);
      } else {
        setDeletePopVisible(!deletePopVisible);
      }
    }
  };

  // 갤러리에서 video 파일 선택
  const chooseFile = async (type) => {
    let options = {
      mediaType: 'video',
      maxWidth: 300,
      maxHeight: 550,
      videoQuality: 'low',
      // quality: 1,
    };
    try {
      const response = await new Promise((resolve, reject) => {
        launchImageLibrary(options, result => {
          if (result) {
            resolve(result);
          } else {
            reject(false);
          }
        });
      });
      if (response === false) {
        // 선택한 이미지가 없는 경우
        console.log('User did not select an image');
        return;
      }

      // console.log('response = ', response);

      if (response.assets && response.assets.length > 0) {
        const asset = response['assets'][0];
        // console.log('base64 -> ', asset.base64);
        // console.log('uri -> ', asset.uri);
        // console.log('width -> ', asset.width);
        // console.log('height -> ', asset.height);
        // console.log('fileSize -> ', asset.fileSize);
        // console.log('type -> ', asset.type);
        // console.log('fileName -> ', asset.fileName);
        console.log(asset);
        setPrevFile(filePath);  // 수정 시 수정 전 내용 저장
        // setChangeData(asset.uri);
        setFilePath(asset.uri);
        setIsEditing(true);
        try {
          console.log("retrieveNewUrl 실행");
          retrieveNewUrl(asset);
          // const presignedUrlResponse = await fetch(
          //   'https://api.writeyoume.com/api/v1/presignedUrl?name=' + asset.fileName
          // );
          // const presignedUrlData = await presignedUrlResponse.json();
          // console.log("presignedUrlData.presignedUrl: ", presignedUrlData.presignedUrl, "| presignedUrlData.uniqueFileName: ", presignedUrlData.uniqueFileName)

          // // 파일 업로드
          // await uploadFileToServer(
          //   {
          //     uri: asset.uri,
          //     type: 'multipart/form-data',
          //     name: asset.fileName,
          //   },
          //   presignedUrlData.presignedUrl, presignedUrlData.uniqueFileName, 'FileUploadResult');
        } catch (error) {
          console.error('Error uploading file to server:', error);
        }
      }
    } catch (error) {
      console.log("Error in chooseFile: ", error);
    }
  };

  return (
    <Modal
      animationType={'fade'}
      transparent={true}
      visible={modalOpen}
      onRequestClose={() => {
        setFilePath(prevFile);
        setPrevFile();
        setModalOpen(!modalOpen);
      }}>
      <TouchableOpacity
        onPress={() => {
          setModalOpen(false);
          if (isEditing) {
            setIsEditing(false);
            setFilePath(prevFile);
            setPrevFile();
          }

        }} // modalBackdropPress: 모달 영역 밖 클릭 시 Bottom Nav(Modal) 닫힘 구현을 위해 TouchableOpacity로 modalView를 감싸서 적용
        style={styles.modalBackdropPress}>
        <Pressable
          onPress={() => {
            setModalOpen(true);
          }} // Pressable: 모달 영역 안 클릭 시 Bottom Nav(Modal) 유지 구현을 위해 Pressable로 감싸서 적용
          style={styles.modalView}>
          {isEditing ? (
            <TouchableOpacity
              style={styles.navBarView}
              onPress={() => setSavePopVisible(true)}>
              <Text>저장</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.navBarView}
              onPress={() => {
                // modalView: 모달 영역 안 (Modify, Delete 기능이 담긴 Bottom Nav(Modal) 생성)
                chooseFile('video');
              }}>
              <Image source={editingIcon} style={styles.image} />
              <Text>수정</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={showDelete} style={styles.navBarView}>
            <Image source={deletedIcon} style={styles.image} />
            <Text>삭제</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCancel} style={styles.navBarView}>
            <Image source={cancelIcon} style={styles.image} />
            <Text>취소</Text>
          </TouchableOpacity>
          <InterviewDeletePop
            deletePopVisible={deletePopVisible}
            setDeletePopVisible={setDeletePopVisible}
            setChangeData={setChangeData}
            setChangeHeart={setChangeHeart}
            filePath={filePath}
            setFilePath={setFilePath}
            // setModalOpen={setModalOpen}
            setIsEditing={setIsEditing}
            setPrevFile={setPrevFile}
            prevFile={prevFile}
          />
          <InterviewSavePop
            token={token}
            interviewId={interviewId}
            savePopVisible={savePopVisible}
            setSavePopVisible={setSavePopVisible}
            setIsEditing={setIsEditing}
            setModalOpen={setModalOpen}
            setIsPlaying={setIsPlaying}
            setFilePath={setFilePath}
            changeData={changeData}
            setChangeData={setChangeData}
            setHeart={setHeart}
            changeHeart={changeHeart}
            setPrevFile={setPrevFile}
            prevFile={prevFile}
          />
          <InterviewAlert
            title={'삭제할 데이터가 없습니다.'}
            alertVisible={deleteAlertVisible}
            setAlertVisible={setDeleteAlertVisible}
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
  },
  modalView: {
    alignItems: 'center',
    borderWidth: 2,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderColor: '#EEE',
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    display: 'flex',
    height: Dimensions.get('window').height / 12,
  },

  navBarView: {
    flexDirection: 'row',
  },
  image: {
    marginRight: 4,
  },
});
export default InterviewModal;

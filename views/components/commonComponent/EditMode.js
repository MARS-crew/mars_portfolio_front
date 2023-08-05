import React, {useState} from 'react';
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Dimensions,
  View,
  Image,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';

import DetailPop from '../../screens/Portfolio/DetailPop';
import ChoosePop from './ChoosePop';
import Title from './Title';
import cancelIcon from '../../../assets/images/cancelIcon.png';
import deletedIcon from '../../../assets/images/deletedIcon.png';
import saveIcon from '../../../assets/images/editIcon.png';
import editingIcon from '../../../assets/images/editingIcon.png';

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

const EditMode = ({
  //공통 프롭스
  isModalVisible,
  setIsModalVisible,
  //포트폴리오 프롭스
  portfolio,
  id,
  onModify,
  onDelete,
  //인터뷰 프롭스
  interview,
  heart,
  setHeart,
  filePath,
  setFilePath,
  setIsPlaying,
}) => {
  //공통 스테이트
  const [detailPopVisible, setDetailPopVisible] = useState(false);
  const [removeChoosePopVisible, setRemoveChoosePopVisible] = useState(false);
  const [saveChoosePopVisible, setSaveChoosePopVisible] = useState(false);
  const [togleButton, setTogleButton] = useState(false);
  const [checkDeletePopOkButton, setCheckDeletePopOkButton] = useState(false); //삭제 츄즈 팝업에서 확인을 눌렀는지 감지하여 네비바의 저장을 눌렀을 시 ChoosePop이 뜨도록 함
  const [checkChoosePopOkButton, setCheckChoosePopOkButton] = useState(false); //디테일 팝업에서 확인을 눌렀는지 감지하여 네비바의 저장을 눌렀을 시 ChoosePop이 뜨도록 함
  //인터뷰 스테이트
  const [changeData, setChangeData] = useState(null); // 수정 전 변경 내용 임시 저장
  const [deletePopVisible, setDeletePopVisible] = useState(false); // 삭제 확인 창 상태
  const [savePopVisible, setSavePopVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // 수정 여부 확인 ( 수정 내용 없으면 저장 버튼 뜨지 않도록)
  const [changeHeart, setChangeHeart] = useState(heart); // 수정 내용 저장 전 하트 변경 사항 저장
  const [deleteAlertVisible, setDeleteAlertVisible] = useState(false);

  //인터뷰 컴포넌트 start-----------------------------------------------------------------------------------------------------------------------------------------
  // 갤러리에서 video 파일 선택
  const chooseFile = type => {
    let options = {
      mediaType: 'video',
      maxWidth: 300,
      maxHeight: 550,
      videoQuality: 'low',
    };
    launchImageLibrary(options, response => {
      if (response === false) {
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

        if (checkDeletePopOkButton == false) setChangeData(asset.uri);
        setTogleButton(true);
      }
    });
  };

  //인터뷰 세이브
  const handleSave = () => {
    //setTogleButton(true);
    setIsPlaying(true);
    setFilePath(changeData);
    setChangeData(); // 저장된 데이터 초기화
    // setSavePopVisible(false);
    setHeart(changeHeart);
  };

  // 인터뷰 딜리트
  const deleteUrl = () => {
    setChangeData(false);
  };
  //인터뷰 컴포넌트 end-----------------------------------------------------------------------------------------------------------------------------------------

  // EditMode Button onPress 용 Props 컴포넌트 start------------------------------------------------------------------------------------------------------------------------
  const editingButton = () => {
    //수정 섹션을 클릭한 경우
    //인터뷰: interview 스테이트를 통해 인터뷰 페이지에서 진입했다면 하단 파일 탐색기 실행
    if (interview == true) {
      chooseFile('video');
      console.log(checkDeletePopOkButton);
    }
    //포트폴리오: portfolio 스테이트를 통해 포트폴리오 페이지에서 진입했다면 하단 디테일 팝 실행
    else if (portfolio == true) {
      setCheckChoosePopOkButton(false); //수정 누를 때 디테일 팝 확인버튼 클릭 여부 스테이트 초기화
      setDetailPopVisible(true);
      setTogleButton(true);
    }
  };

  const saveButton = () => {
    //저장 섹션을 클릭한 경우
    //인터뷰: interview 스테이트를 통해 인터뷰 페이지에서 진입했다면 하단 파일 탐색기 실행
    if (interview == true) {
      setSaveChoosePopVisible(true);
    }
    //포트폴리오 portfolio 스테이트를 통해 포트폴리오 페이지에서 진입했다면 하단 디테일 팝 실행
    else if (portfolio == true) {
      if (checkChoosePopOkButton == false) {
        console.log('if (checkChoosePopOkButton === false) 디테일팝업 취소');
        if (checkDeletePopOkButton == true) {
          setDetailPopVisible(false);
          setSaveChoosePopVisible(true); // 그러나 삭제 츄즈 팝업에서 확인을 눌렀다면 디테일 팝업 닫고 저장 클릭 시 츄즈팝업 실행
        } else if (checkDeletePopOkButton == false) {
          setDetailPopVisible(true);
          //디테일 팝업에서 취소 누른 경우 저장 클릭 시 디테일 팝업만 계속 실행
        }
      } else if (checkChoosePopOkButton == true) {
        setDetailPopVisible(false);
        console.log(
          'else if (checkChoosePopOkButton === true) 디테일팝업 확인',
        );
        setSaveChoosePopVisible(true); // 디테일 팝업에서 확인 누른 경우 이후에 저장 클릭 시 디테일 팝업 대신 저장 츄즈 팝업 실행
      }
    }
  };
  const deletedButton = () => {
    //인터뷰: interview 스테이트를 통해 인터뷰 페이지에서 진입했다면 하단 파일 탐색기 실행
    if (interview == true) {
      setRemoveChoosePopVisible(true);
      setTogleButton(true);
    }
    //포트폴리오 portfolio 스테이트를 통해 포트폴리오 페이지에서 진입했다면 하단 디테일 팝 실행
    else if (portfolio == true) {
      setRemoveChoosePopVisible(true);
      setTogleButton(true);
    }
    // modalView: 모달 영역 안 (Modify, Delete 기능이 담긴 Bottom Nav(Modal) 생성)
  };

  // EditMode Button onPress 용 Props 컴포넌트 end------------------------------------------------------------------------------------------------------------------------

  const EditModeSectionChooseBtn = ({title, source, onPress}) => {
    return (
      <TouchableOpacity style={styles.navBarView} onPress={onPress}>
        <View style={styles.navBarView}>
          <Image source={source} style={styles.image} />
          <Title color={'black'}>{title}</Title>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      animationType={'fade'}
      transparent={true}
      visible={isModalVisible}
      onRequestClose={() => {
        setIsModalVisible(!isModalVisible);
      }}>
      <TouchableOpacity
        onPress={() => {
          setIsModalVisible(false);
          setTogleButton(false);
        }} // modalBackdropPress: 모달 영역 밖 클릭 시 Bottom Nav(Modal) 닫힘 구현을 위해 TouchableOpacity로 modalView를 감싸서 적용
        style={styles.modalBackdropPress}>
        <Pressable
          onPress={() => {
            setIsModalVisible(true);
          }} // Pressable: 모달 영역 안 클릭 시 Bottom Nav(Modal) 유지 구현을 위해 Pressable로 감싸서 적용
          style={[styles.modalView, styles.shadow]}>
          {togleButton === false && (
            <EditModeSectionChooseBtn
              title={'수정'}
              source={editingIcon}
              onPress={() => {
                editingButton();
              }}></EditModeSectionChooseBtn>
          )}
          {togleButton === true && (
            <EditModeSectionChooseBtn
              title={'저장'}
              source={saveIcon}
              onPress={() => {
                saveButton();
              }}></EditModeSectionChooseBtn>
          )}
          <EditModeSectionChooseBtn
            title={'삭제'}
            source={deletedIcon}
            onPress={() => {
              deletedButton();
            }}></EditModeSectionChooseBtn>
          <EditModeSectionChooseBtn
            title={'취소'}
            source={cancelIcon}
            onPress={() => {
              setIsModalVisible(!isModalVisible);
              setTogleButton(false);
            }}></EditModeSectionChooseBtn>

          <DetailPop
            id={id}
            onModify={onModify}
            checkChoosePopOkButton={checkChoosePopOkButton}
            setCheckChoosePopOkButton={setCheckChoosePopOkButton}
            detailPopVisible={detailPopVisible}
            setTogleButton={setTogleButton}
            setDetailPopVisible={setDetailPopVisible}></DetailPop>
          <ChoosePop
            //공통
            title="수정된 내용을 저장하시겠습니까?"
            setTogleButton={setTogleButton}
            checkDeletePopOkButton={checkDeletePopOkButton}
            setCheckDeletePopOkButton={setCheckDeletePopOkButton}
            setCheckChoosePopOkButton={setCheckChoosePopOkButton}
            setIsModalVisible={setIsModalVisible}
            choosePopVisible={saveChoosePopVisible}
            setChoosePopVisible={setSaveChoosePopVisible}
            //인터뷰
            interview={interview}
            handleSave={handleSave}
            deleteUrl={deleteUrl}
            //포트폴리오
            portfolio={portfolio}
            id={id}
            onModify={onModify}
            onDelete={onDelete}></ChoosePop>
          <ChoosePop
            //공통
            title="수정된 내용을 삭제하시겠습니까?"
            checkDeletePopOkButton={checkDeletePopOkButton}
            setCheckDeletePopOkButton={setCheckDeletePopOkButton}
            setIsModalVisible={setIsModalVisible}
            isModalVisible={isModalVisible}
            choosePopVisible={removeChoosePopVisible}
            setChoosePopVisible={setRemoveChoosePopVisible}
            //인터뷰
            setChangeData={setChangeData}
            setChangeHeart={setChangeHeart}
            setIsEditing={setIsEditing}
            //포트폴리오
            portfolio={portfolio}
            id={id}></ChoosePop>
        </Pressable>
      </TouchableOpacity>
    </Modal>
  );
};
export default EditMode;

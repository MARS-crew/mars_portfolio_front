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

import Title from '../components/Title';
import cancelIcon from '../../assets/images/cancelIcon.png';
import linkIcon from '../../assets/images/linkIcon.png';
import kakaoIcon from '../../assets/images/kakaoIcon.png';

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
    width: 20,
    height: 20,
    marginRight: 4,
  },
});

const shareEditMode = ({
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
  const [checkDeletePopOkButton, setCheckDeletePopOkButton] = useState(false); //삭제 츄즈 팝업에서 확인을 눌렀는지 감지하여 네비바의 저장을 눌렀을 시 ChoosePop이 뜨도록 함
  const [checkChoosePopOkButton, setCheckChoosePopOkButton] = useState(false); //디테일 팝업에서 확인을 눌렀는지 감지하여 네비바의 저장을 눌렀을 시 ChoosePop이 뜨도록 함

  // EditMode Button onPress 용 Props 컴포넌트 start------------------------------------------------------------------------------------------------------------------------
  const copyLinkButton = () => {
    alert('링크가 클립보드에 복사되었습니다.');
  };

  const shareKakaoButton = () => {
    alert('카카오톡 공유로 이동');
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
        }} // modalBackdropPress: 모달 영역 밖 클릭 시 Bottom Nav(Modal) 닫힘 구현을 위해 TouchableOpacity로 modalView를 감싸서 적용
        style={styles.modalBackdropPress}>
        <Pressable
          onPress={() => {
            setIsModalVisible(true);
          }} // Pressable: 모달 영역 안 클릭 시 Bottom Nav(Modal) 유지 구현을 위해 Pressable로 감싸서 적용
          style={[styles.modalView, styles.shadow]}>
          <EditModeSectionChooseBtn
            title={'링크 복사'}
            source={linkIcon}
            onPress={() => {
              copyLinkButton();
            }}></EditModeSectionChooseBtn>

          <EditModeSectionChooseBtn
            title={'카카오톡 공유'}
            source={kakaoIcon}
            onPress={() => {
              shareKakaoButton();
            }}></EditModeSectionChooseBtn>

          <EditModeSectionChooseBtn
            title={'취소'}
            source={cancelIcon}
            onPress={() => {
              setIsModalVisible(!isModalVisible);
            }}></EditModeSectionChooseBtn>
        </Pressable>
      </TouchableOpacity>
    </Modal>
  );
};
export default shareEditMode;

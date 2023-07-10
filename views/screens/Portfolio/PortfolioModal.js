import React, {useState} from 'react';
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Dimensions,
  Text,
  Platform,
  View,
  Image,
} from 'react-native';

import DetailPop from '../Portfolio/DetailPop';
import ChoosePop from '../../components/ChoosePop';
import Title from '../../components/Title';
import cancelIcon from '../../../assets/images/cancelIcon.png';
import deletedIcon from '../../../assets/images/deletedIcon.png';
import editIcon from '../../../assets/images/editIcon.png';
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

const PortfolioModal = ({
  id,
  onModify,
  onDelete,
  isModalVisible,
  setIsModalVisible,
}) => {
  const [detailPopVisible, setDetailPopVisible] = useState(false);
  const [choosePopVisible, setChoosePopVisible] = useState(false);
  const [togleButton, setTogleButton] = useState(false);

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
            <TouchableOpacity
              style={styles.navBarView}
              onPress={() => {
                // modalView: 모달 영역 안 (Modify, Delete 기능이 담긴 Bottom Nav(Modal) 생성)
                setDetailPopVisible(!detailPopVisible);
                if (togleButton === false) setTogleButton(!togleButton);
              }}>
              <View style={styles.navBarView}>
                <Image source={editingIcon} style={styles.image} />
                <Title>수정</Title>
              </View>
            </TouchableOpacity>
          )}
          {togleButton === true && (
            <TouchableOpacity
              style={styles.navBarView}
              onPress={() => {
                // modalView: 모달 영역 안 (Modify, Delete 기능이 담긴 Bottom Nav(Modal) 생성)
                setDetailPopVisible(!detailPopVisible);
              }}>
              <View style={styles.navBarView}>
                <Image source={editIcon} style={styles.image} />
                <Title>저장</Title>
              </View>
            </TouchableOpacity>
          )}
          <DetailPop
            id={id}
            onModify={onModify}
            detailPopVisible={detailPopVisible}
            togleButton={togleButton}
            setTogleButton={setTogleButton}
            setDetailPopVisible={setDetailPopVisible}></DetailPop>
          <TouchableOpacity
            style={styles.navBarView}
            onPress={() => {
              // modalView: 모달 영역 안 (Modify, Delete 기능이 담긴 Bottom Nav(Modal) 생성)
              setChoosePopVisible(!choosePopVisible);
              setIsModalVisible(!isModalVisible);
              setTogleButton(false);
              onDelete(id);
            }}>
            <Image source={deletedIcon} style={styles.image} />
            <Title>삭제</Title>
          </TouchableOpacity>
          {/*
            <ChoosePop
              id={id}
              title="삭제하시겠습니까?"
              onDelete={onDelete}
              choosePopVisible={choosePopVisible}
              setChoosePopVisible={setChoosePopVisible}></ChoosePop>
          */}
          <TouchableOpacity
            style={styles.navBarView}
            onPress={() => {
              // modalView: 모달 영역 안 (Modify, Delete 기능이 담긴 Bottom Nav(Modal) 생성)
              setIsModalVisible(!isModalVisible);
              setTogleButton(false);
            }}>
            <Image source={cancelIcon} style={styles.image} />
            <Title>취소</Title>
          </TouchableOpacity>
        </Pressable>
      </TouchableOpacity>
    </Modal>
  );
};
export default PortfolioModal;

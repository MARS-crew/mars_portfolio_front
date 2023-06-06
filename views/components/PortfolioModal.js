import React, {useState} from 'react';
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Dimensions,
  Text,
} from 'react-native';

import DetailPop from '../components/DetailPop';
import ChoosePop from '../components/ChoosePop';

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
          onPress={() => setIsModalVisible(true)} // Pressable: 모달 영역 안 클릭 시 Bottom Nav(Modal) 유지 구현을 위해 Pressable로 감싸서 적용
          style={styles.modalView}>
          <TouchableOpacity
            onPress={() => {
              // modalView: 모달 영역 안 (Modify, Delete 기능이 담긴 Bottom Nav(Modal) 생성)
              setDetailPopVisible(!detailPopVisible);
            }}>
            <Text>Modify</Text>
          </TouchableOpacity>
          <DetailPop
            id={id}
            onModify={onModify}
            detailPopVisible={detailPopVisible}
            setDetailPopVisible={setDetailPopVisible}></DetailPop>
          <TouchableOpacity
            onPress={() => {
              // modalView: 모달 영역 안 (Modify, Delete 기능이 담긴 Bottom Nav(Modal) 생성)
              setChoosePopVisible(!choosePopVisible);
            }}>
            <Text>Delete</Text>
          </TouchableOpacity>
          <ChoosePop
            id={id}
            title="삭제하시겠습니까?"
            onDelete={onDelete}
            choosePopVisible={choosePopVisible}
            setChoosePopVisible={setChoosePopVisible}></ChoosePop>
        </Pressable>
      </TouchableOpacity>
    </Modal>
  );
};
export default PortfolioModal;

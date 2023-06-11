import {
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Text,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: '#fff',
    marginHorizontal: 50,
  },
  modalTitle: {
    alignItems: 'center',
    textAlign: 'center',
    borderWidth: 0.5,
    borderColor: '#000',
    padding: 12,
    paddingHorizontal: 80,
  },
  chooseContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    display: 'flex',
  },
  chooseBtn: {
    flex: 1,
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#000',
    padding: 8,
  },
});

import PublicModal from './PublicModal';

const choosePop = ({
  id,
  title,
  onDelete,
  choosePopVisible,
  setChoosePopVisible,
}) => {
  return (
    <PublicModal
      id={id}
      onDelete={onDelete}
      isModalVisible={choosePopVisible}
      setIsModalVisible={setChoosePopVisible}>
      <Pressable
        onPress={() => setChoosePopVisible(true)} // Pressable: Modal 영역 안 클릭 시 Modal 유지 구현을 위해 Pressable로 감싸서 적용
        style={styles.modalView}>
        <Text style={styles.modalTitle}>{title}</Text>
        <View style={styles.chooseContainer}>
          <TouchableOpacity
            style={styles.chooseBtn}
            onPress={() => {
              setChoosePopVisible(false); // chooseBtn: 모달 영역 안 (ChoosePopup YES or NO, props를 통해 {title} 설정(예:  title="삭제하시겠습니까?"))
              onDelete(id); //개발 방식 검토중인 기능이므로 구현 미완료
            }}>
            <Text>YES</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.chooseBtn}
            onPress={() => {
              setChoosePopVisible(false); // chooseBtn: 모달 영역 안 (ChoosePopup YES or NO, props를 통해 {title} 설정(예:  title="삭제하시겠습니까?"))
            }}>
            <Text>NO</Text>
          </TouchableOpacity>
        </View>
      </Pressable>
    </PublicModal>
  );
};
export default choosePop;

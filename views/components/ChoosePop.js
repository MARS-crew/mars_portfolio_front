import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Dimensions,
  Text,
  View,
} from 'react-native';

const styles = StyleSheet.create({
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: '#fff',
    marginTop: Dimensions.get('window').height / 2.5,
    marginHorizontal: 50,
  },
  modalTitle: {
    alignItems: 'center',
    textAlign: 'center',
    borderWidth: 0.5,
    borderColor: '#000',
    padding: 12,
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

const choosePop = ({
  id,
  title,
  onDelete,
  choosePopVisible,
  setChoosePopVisible,
}) => {
  return (
    <Modal
      animationType={'fade'}
      transparent={true}
      visible={choosePopVisible}
      onRequestClose={() => {
        setChoosePopVisible(!choosePopVisible);
      }}>
      <TouchableOpacity
        onPress={() => setChoosePopVisible(false)} // modalBackdropPress: 모달 영역 밖 클릭 시 ChoosePopup(Modal) 닫힘 구현을 위해 TouchableOpacity로 modalView를 감싸서 적용
        style={styles.modalBackdropPress}>
        <Pressable
          onPress={() => setChoosePopVisible(true)} // Pressable: 모달 영역 안 클릭 시 ChoosePopup(Modal) 유지 구현을 위해 Pressable로 감싸서 적용
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
      </TouchableOpacity>
    </Modal>
  );
};
export default choosePop;

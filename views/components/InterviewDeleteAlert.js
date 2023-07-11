import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Dimensions,
  Text,
  View,
} from 'react-native';

const InterviewDeleteAlert = ({
  deleteAlertVisible,
  setDeleteAlertVisible
}) => {

  return (
    <Modal
      animationType={'fade'}
      transparent={true}
      visible={deleteAlertVisible}
      onRequestClose={() => {
        setDeleteAlertVisible(!deleteAlertVisible);
      }}>
      <TouchableOpacity
        onPress={() => setDeleteAlertVisible(false)} // modalBackdropPress: 모달 영역 밖 클릭 시 ChoosePopup(Modal) 닫힘 구현을 위해 TouchableOpacity로 modalView를 감싸서 적용
        style={styles.modalBackdropPress}>
        <Pressable
          onPress={() => setDeleteAlertVisible(true)} // Pressable: 모달 영역 안 클릭 시 ChoosePopup(Modal) 유지 구현을 위해 Pressable로 감싸서 적용
          style={styles.modalView}>
          <Text style={styles.modalTitle}>삭제할 데이터가 없습니다.</Text>
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={styles.btnStyle}
              onPress={() => setDeleteAlertVisible(!deleteAlertVisible)}>
              <Text style={styles.textStyle}>확인</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackdropPress: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#F5F5F5',
    backgroundColor: '#fff',
    // marginTop: Dimensions.get('window').height / 3,
    margin: 37,
    marginTop: 256,
    height: 145,
    // paddingBottom: 20,
    // padding: 20,
    // marginHorizontal: 50,
  },
  modalTitle: {
    alignItems: 'center',
    textAlign: 'center',
    margin: 30,
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold'
    // borderWidth: 0.5,
    // borderColor: '#000',
    // padding: 12,
  },
  btnContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    display: 'flex',
    paddingTop: 6,
    paddingRight: 20,
    paddingBottom: 20,
  },
  btnStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#F5F5F5',
    borderRadius: 20,
    padding: 8,
    width: 60,
    height: 40,
    marginLeft: 10,
    backgroundColor: '#072AC8',
  },
  textStyle: {
    color: '#FFFFFF',
    height: 16,
    fontSize: 14,
    fontWeight: 'bold',
    alignContent: 'center',
  }
});

export default InterviewDeleteAlert;

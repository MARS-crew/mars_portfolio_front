import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Dimensions,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
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
    paddingTop: Dimensions.get('window').height / 2,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: Dimensions.get('window').height / 2,
    height: Dimensions.get('window').height / 2,
    marginHorizontal: 50,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  chooseContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    display: 'flex',
    marginBottom: 8,
  },
  chooseBtn: {
    flex: 1,
    width: 100,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#000',
  },
  Input: {
    flex: 2.5,
    alignItems: 'center',
    textAlign: 'center',
    borderWidth: 0.5,
    borderColor: '#000',
    height: 35,
    marginBottom: 8,
  },

  pickBtn: {
    width: 100,
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#000',
    padding: 8,
  },
  inputRightMargin: {
    marginRight: 5,
    marginBottom: 0,
  },
  flexEnd: {
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  flexCenter: {
    alignItems: 'center',
  },
  Description: {
    flex: 10,
  },
  fileContainer: {
    justifyContent: 'space-between',
    paddingHorizontal: 2,
  },
});

const DetailPop = ({id, onModify, detailPopVisible, setDetailPopVisible}) => {
  return (
    <Modal
      animationType={'fade'}
      transparent={true}
      visible={detailPopVisible}
      onRequestClose={() => {
        setDetailPopVisible(!detailPopVisible);
      }}>
      <KeyboardAvoidingView
        style={styles.modalContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <TouchableOpacity
          onPress={() => setDetailPopVisible(false)} // modalBackdropPress: 모달 영역 밖 클릭 시 DetailPopup(Modal) 닫힘 구현을 위해 TouchableOpacity로 modalView를 감싸서 적용
          style={styles.modalBackdropPress}>
          <Pressable
            onPress={() => setDetailPopVisible(true)} // Pressable: 모달 영역 안 클릭 시 DetailPopup(Modal) 유지 구현을 위해 Pressable로 감싸서 적용
            style={styles.modalView}>
            <View style={styles.flexEnd}>
              <TouchableOpacity
                onPress={() => {
                  setDetailPopVisible(false); // pickBtn: 모달 영역 안 (DetailPopup X 닫기)
                }}>
                <Text>X</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.chooseContainer}>
              <TouchableOpacity style={styles.chooseBtn} onPress={() => {}}>
                <Text>Photo</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.chooseBtn} onPress={() => {}}>
                <Text>Video</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.chooseBtn} onPress={() => {}}>
                <Text>Link</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.chooseContainer}>
              <TextInput
                style={[styles.Input, styles.inputRightMargin]}></TextInput>
              <TouchableOpacity style={styles.pickBtn} onPress={() => {}}>
                <Text>Attach</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.chooseContainer, styles.fileContainer]}>
              <Text style={styles.inputRightMargin}>첨부파일</Text>
              <View style={styles.chooseContainer}>
                <Text style={styles.inputRightMargin}>Ddunggu.jpg</Text>
                <TouchableOpacity style={styles.flexEnd} onPress={() => {}}>
                  <Text>X</Text>
                </TouchableOpacity>
              </View>
            </View>

            <TextInput
              style={styles.Input}
              placeholder="TITLE을 입력해주세요"
              placeholderTextColor="#D8D8D8"></TextInput>
            <TextInput
              style={[styles.Input, styles.Description]}
              placeholder="DESCRIPTION을 입력해주세요"
              placeholderTextColor="#D8D8D8"></TextInput>
            <View style={styles.flexCenter}>
              <TouchableOpacity
                style={styles.pickBtn}
                onPress={() => {
                  setDetailPopVisible(false); // pickBtn: 모달 영역 안 (DetailPopup Register 등록)
                  onModify(id); //개발 방식 검토중인 기능이므로 구현 미완료
                }}>
                <Text>Register</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </Modal>
  );
};
export default DetailPop;

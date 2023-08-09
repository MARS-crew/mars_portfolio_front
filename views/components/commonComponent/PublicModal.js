import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';

const styles = StyleSheet.create({
  modalBackdropPress: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContainer: {
    flex: 1,
    borderRadius: 20,
    justifyContent: 'center',
  },
});

const PublicModal = ({
  animationType,
  id,
  onModify,
  onDelete,
  isModalVisible,
  setIsModalVisible,
  children,
}) => {
  return (
    <Modal
      style={styles.modalContainer}
      animationType={animationType == 'slide' ? 'slide' : 'fade'}
      transparent={true}
      visible={isModalVisible}
      onRequestClose={() => {
        setIsModalVisible(!isModalVisible);
      }}>
      <KeyboardAvoidingView
        style={styles.modalContainer} // KeyboardAvoidingView: 키보드 이용 시 Modal 가려짐 현상 해결을 위한 키보드 바에 맞는 위치로 자동조정하는 코드
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <TouchableOpacity
          onPress={() => setIsModalVisible(false)} // modalBackdropPress: Modal 영역 밖 클릭 시 Modal 닫힘 구현을 위해 TouchableOpacity로 {children}을 감싸서 적용
          style={styles.modalBackdropPress}>
          {children}
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </Modal>
  );
};
export default PublicModal;

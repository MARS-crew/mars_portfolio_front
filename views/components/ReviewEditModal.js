import React, {useState} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Text,
  TextInput,
  View,
} from 'react-native';

const {width} = Dimensions.get('window').width;
const {height} = Dimensions.get('window').height;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ccc',
    padding: 20,
  },
  modalBackdropPress: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'white',
  },
  modalView: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: Dimensions.get('window').height / 15,
  },
  postWriter: {
    marginHorizontal: 20,
    marginTop: 20,
    textAlign: 'left',
    fontSize: 15,
    fontWeight: 'bold',
  },
  postDate: {
    marginHorizontal: 20,
    textAlign: 'left',
    fontSize: 12,
    fontWeight: '300',
  },
  postContent: {
    marginHorizontal: 20,
    marginVertical: 20,
    fontWeight: '300',
    fontSize: 18,
  },
});

const ReviewEditModal = ({
  isModalVisible,
  setIsModalVisible,
  writer,
  date,
  content,
}) => {
  const [editableContent, setEditableContent] = useState(content);
  const [isEditing, setIsEditing] = useState(false);

  const handleModify = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <Modal
      animationType={'fade'}
      transparent={true}
      visible={isModalVisible}
      onRequestClose={() => {
        setIsModalVisible(!isModalVisible);
      }}>
      <View style={styles.modalContainer}>
        <Text style={styles.postWriter}>{writer}</Text>
        <Text style={styles.postDate}>{date}</Text>
        <TextInput
          style={styles.postContent}
          multiline={true}
          editable={isEditing}
          value={editableContent}
          onChangeText={setEditableContent}
        />
      </View>
      <TouchableOpacity
        onPress={() => setIsModalVisible(false)}
        style={styles.modalBackdropPress}>
        <View style={styles.modalView}>
          {isEditing ? (
            <TouchableOpacity onPress={handleSave}>
              <Text>저장</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={handleModify}>
              <Text>수정</Text>
            </TouchableOpacity>
          )}
          <View>
            {isEditing ? (
              <TouchableOpacity onPress={handleCancel}>
                <Text>취소</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  setIsModalVisible(false);
                  Alert.alert('Modal', '삭제');
                }}>
                <Text>삭제</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};
export default ReviewEditModal;

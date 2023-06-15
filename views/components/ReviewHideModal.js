import React, {useState} from 'react';
import {
  View,
  Text,
  Alert,
  Button,
  StyleSheet,
  Dimensions,
  Modal,
  TouchableOpacity,
} from 'react-native';

const ReviewHideModal = ({setIsModalVisible, writer, date, content}) => {
  const handleHide = () => {
    Alert.alert('Modal', '숨기기');
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Modal animationType={'fade'} transparent={true}>
      <View style={styles.modalContainer}>
        <Text style={styles.postWriter}>{writer}</Text>
        <Text style={styles.postDate}>{date}</Text>
        <Text style={styles.postContent} numberOfLines={3} ellipsizeMode="tail">
          {content}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => setIsModalVisible(false)}
        style={styles.modalBackdropPress}>
        <View style={styles.modalView}>
          <TouchableOpacity onPress={handleHide}>
            <Text>리뷰 숨기기</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCancel}>
            <Text>취소</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f3f3f3',
    padding: 20,
  },
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
    display: 'flex',
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

export default ReviewHideModal;

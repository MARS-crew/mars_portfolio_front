import React, {useState} from 'react';
import {Alert, Modal, TouchableOpacity, Text, View} from 'react-native';

const PortfolioModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <Modal
      animationType={'slide'}
      transparent={true}
      visible={isModalVisible}
      onRequestClose={() => {
        setIsModalVisible(!isModalVisible);
        console.log('modal appearance');
      }}>
      <Text>Modal is appearance!</Text>
      <TouchableOpacity
        onPress={() => {
          Alert.alert('Modal', '모달이 나타남...');
        }}>
        <Text>View Alert!</Text>
      </TouchableOpacity>
    </Modal>
  );
};
export default PortfolioModal;

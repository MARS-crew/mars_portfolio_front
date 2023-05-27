import React, {useState} from 'react';
import {Alert, Modal, Pressable, Text, View} from 'react-native';

const PortfolioModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <Modal
      animationType={'slide'}
      transparent={true}
      visible={isModalVisible}
      onRequestClose={() => {
        isModalVisible(!isModalVisible);
        console.log('modal appearance');
      }}>
      <Text>Modal is appearance!</Text>
      <Pressable
        onPress={() => {
          Alert.alert('Modal', '모달이 나타남...');
        }}>
        <Text>View Alert!</Text>
      </Pressable>
    </Modal>
  );
};
export default PortfolioModal;

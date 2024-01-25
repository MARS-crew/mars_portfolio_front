import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  Alert,
  Modal,
} from 'react-native';
import PortfolioModal from '../components/PortfolioModal';
import { useUser } from '../../LoginUserContext';
const styles = StyleSheet.create({
  image: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  //Modal
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

const Portfolio = ({ member_id, src }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { user, storeUser } = useUser();

  const checkUser = (member_id) => {
    if (member_id == user) {
      setIsModalVisible(!isModalVisible);
    }
  }


  return (
    <View
      style={{
        width: Dimensions.get('window').width / 2,
        height: Dimensions.get('window').height / 2,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#000',
      }}>
      <TouchableOpacity
        onPress={() => alert('포트폴리오 생성 및 등록')}
        onLongPress={() => {
          checkUser();
        }}>
        <View>
          <Image source={src} style={styles.image} />
        </View>
      </TouchableOpacity>
      <PortfolioModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}></PortfolioModal>
    </View>
  );
};

export default Portfolio;

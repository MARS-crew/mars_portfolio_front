import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Alert,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import PortfolioModal from '../components/PortfolioModal';
import Camera from '../../assets/images/camera.png';
import Link from '../../assets/images/Link.png';
import Add from '../../assets/images/add.png';

const Portfolio = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
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
        onLongPress={() => setIsModalVisible(true)}>
        <View>
          <Image source={Add} style={styles.image} />
        </View>
      </TouchableOpacity>
      <Modal
        animationType={'fade'}
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setIsModalVisible(!isModalVisible);
        }}>
        <TouchableOpacity
          onPress={() => setIsModalVisible(false)} // modalBackdropPress: 모달 영역 밖 클릭 시 Bottom Nav(Modal) 닫힘 구현을 위해 TouchableOpacity로 modalView를 감싸서 적용
          style={styles.modalBackdropPress}>
          <View style={styles.modalView}>
            <TouchableOpacity
              onPress={() => {
                setIsModalVisible(false); // modalView: 모달 영역 안 (Modify, Delete 기능이 담긴 Bottom Nav(Modal) 생성)
                Alert.alert('Modal', '생성');
              }}>
              <Text>Modify</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setIsModalVisible(false);
                Alert.alert('Modal', '삭제');
              }}>
              <Text>Delete</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  image: {
    width: 60,
    height: 60,
  },
  //Modal
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
export default Portfolio;

import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import PortfolioModal from '../components/PortfolioModal';

const styles = StyleSheet.create({
  image: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  gridItem: {
    width: Dimensions.get('window').width / 2.5,
    height: Dimensions.get('window').height / 5,
    margin: 10,

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
  },
});

const PortfolioItem = ({id, src, onModify, onDelete}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <View style={styles.gridItem}>
      <TouchableOpacity
        onPress={() => alert('포트폴리오 생성 및 등록')}
        onLongPress={() => setIsModalVisible(!isModalVisible)}>
        <View>
          <Image source={src} style={styles.image} />
        </View>
      </TouchableOpacity>
      <PortfolioModal
        id={id}
        onModify={onModify}
        onDelete={onDelete}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}></PortfolioModal>
    </View>
  );
};

export default PortfolioItem;

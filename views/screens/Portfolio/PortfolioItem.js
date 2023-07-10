import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import PortfolioModal from '../Portfolio/PortfolioModal';
import ContentsViewPop from './ContentsViewPop';

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
  const [contentsViewPopVisible, setContentsViewPopVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <View style={styles.gridItem}>
      <TouchableOpacity
        onPress={() => setContentsViewPopVisible(!contentsViewPopVisible)}
        onLongPress={() => setIsModalVisible(!isModalVisible)}>
        <View>
          <Image source={src} style={styles.image} />
        </View>
      </TouchableOpacity>
      <ContentsViewPop
        id={id}
        src={src}
        onModify={onModify}
        onDelete={onDelete}
        contentsViewPopVisible={contentsViewPopVisible}
        setContentsViewPopVisible={setContentsViewPopVisible}></ContentsViewPop>

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

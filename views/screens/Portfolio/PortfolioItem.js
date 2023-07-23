import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import {Shadow} from 'react-native-shadow-2';
//import PortfolioModal from './PortfolioModalTest';
import EditMode from '../../components/EditMode';
import ContentsViewPop from './ContentsViewPop';
import DetailPop from './DetailPop';
const {width, height} = Dimensions.get('window');
const squareSize = Math.min(width, height) * 0.4;

const styles = StyleSheet.create({
  image: {
    resizeMode: 'contain',
  },
  gridItem: {
    width: squareSize,
    height: squareSize,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 10,
    display: 'flex',
    borderColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15,
  },
});

const PortfolioItem = ({portfolio, id, src, onModify, onDelete}) => {
  const [contentsViewPopVisible, setContentsViewPopVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [detailPopVisible, setDetailPopVisible] = useState(false);

  const shadowColor = 'rgba(151, 151, 151, 0.36)';

  return (
    <Shadow distance="12" startColor={shadowColor} offset={[15, 15]}>
      <View style={[styles.gridItem]}>
        <TouchableOpacity
          onPress={() =>
            id === '6'
              ? setDetailPopVisible(!detailPopVisible)
              : setContentsViewPopVisible(!contentsViewPopVisible)
          }
          onLongPress={() =>
            id === '6'
              ? setDetailPopVisible(!detailPopVisible)
              : setIsModalVisible(!isModalVisible)
          }>
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
          setContentsViewPopVisible={
            setContentsViewPopVisible
          }></ContentsViewPop>
        <EditMode
          portfolio={portfolio}
          id={id}
          onModify={onModify}
          onDelete={onDelete}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}></EditMode>

        <DetailPop
          id={id}
          onModify={onModify}
          setDetailPopVisible={setDetailPopVisible}
          detailPopVisible={detailPopVisible}></DetailPop>
      </View>
    </Shadow>
  );
};

export default PortfolioItem;

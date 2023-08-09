import React, {useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import Video from 'react-native-video';
import {Shadow} from 'react-native-shadow-2';
import EditMode from '../../components/commonComponent/EditMode';
import ContentsViewPop from '../../components/commonComponent/ContentsViewPop';
import DetailPop from './DetailPop';
const {width, height} = Dimensions.get('window');
const squareSize = Math.min(width, height) * 0.4;

const styles = StyleSheet.create({
  image: {
    resizeMode: 'contain',
  },
  content: {
    width: squareSize,
    height: squareSize,
    borderWidth: 1,
    borderRadius: 10,
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

const PortfolioItem = ({
  portfolio,
  id,
  title,
  src,
  code,
  message,
  onModify,
  onDelete,
}) => {
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
          {code === '1' && (
            <View>
              <Video
                ref={useRef(null)}
                source={src}
                style={styles.content}
                repeat={true}
                resizeMode="contain"
              />
            </View>
          )}
          {code !== '1' && (
            <View>
              <Image source={src} style={[styles.content, styles.image]} />
            </View>
          )}
        </TouchableOpacity>
        <ContentsViewPop
          portfolio={portfolio}
          id={id}
          title={title}
          src={src}
          code={code}
          message={message}
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

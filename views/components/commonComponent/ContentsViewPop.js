import React, {useRef} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Linking,
  Text,
  View,
  Image,
  Pressable,
  Dimensions,
} from 'react-native';
import Video from 'react-native-video';
import PublicModal from './PublicModal';
import closeblack from '../../../assets/images/closeblack.png';
import Title from './Title';

const {width, height} = Dimensions.get('window');
const squareSize = Math.min(width, height) * 0.9;

const styles = StyleSheet.create({
  modalView: {
    width: Dimensions.get('window').width / 1,
    position: 'absolute',
    bottom: 0,
    borderWidth: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderColor: '#EEEEEE',
    padding: 20,
    backgroundColor: '#fff',
  },
  titleView: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 15,
  },
  image: {
    resizeMode: 'contain',
  },
  content: {
    width: squareSize,
    height: squareSize,
  },
  nullImage: {
    width: Dimensions.get('window').width / 3,
    height: Dimensions.get('window').height / 3,
    resizeMode: 'contain',
  },
  pickBtn: {
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#EEEEEE',
    borderWidth: 1,
    borderRadius: 20,
    marginTop: 20,
  },
  chooseOkBtn: {backgroundColor: '#072AC8', borderWidth: 0},
});

const ContentsViewPop = ({
  //포트폴리오 프롭스
  portfolio,
  id,
  title,
  src,
  code,
  message,
  onModify,
  contentsViewPopVisible,
  setContentsViewPopVisible,
  //마이페이지 프롭스
  myPage,
}) => {
  const handleLinkPress = () => {
    Linking.openURL(message);
  };
  return (
    <PublicModal
      animationType={'slide'}
      id={id}
      onModify={onModify}
      isModalVisible={contentsViewPopVisible}
      setIsModalVisible={setContentsViewPopVisible}>
      <Pressable
        onPress={() => setContentsViewPopVisible(true)} // Pressable: Modal 영역 안 클릭 시 Modal 유지 구현을 위해 Pressable로 감싸서 적용
        style={styles.modalView}>
        <View style={styles.titleView}>
          <Title fontSize={18} style={styles.input}>
            {title}
          </Title>
          <TouchableOpacity
            onPress={() => {
              setContentsViewPopVisible(false); // pickBtn: 모달 영역 안 (DetailPopup X 닫기)
            }}>
            <Image source={closeblack}></Image>
          </TouchableOpacity>
        </View>

        <View style={styles.contentView}>
          <View style={styles.imageView}>
            {code === '1' && (
              <View>
                <Video
                  ref={useRef(null)}
                  source={src}
                  style={styles.content}
                  controls={true}
                  repeat={true}
                  resizeMode="contain"
                />
              </View>
            )}

            {code !== '1' && (
              <View>
                {id === '3' && (
                  <TouchableOpacity
                    style={[styles.input, styles.linkView]}
                    onPress={() => handleLinkPress()}>
                    <Image
                      source={src}
                      style={[styles.content, styles.image]}
                    />
                  </TouchableOpacity>
                )}
                {id !== '3' && portfolio && (
                  <Image source={src} style={[styles.content, styles.image]} />
                )}
              </View>
            )}
          </View>
          <Title style={styles.input}>{message}</Title>
        </View>

        <TouchableOpacity
          style={[styles.pickBtn, styles.chooseOkBtn]}
          onPress={() => {
            setContentsViewPopVisible(false); // pickBtn: 모달 영역 안 (DetailPopup X 닫기)
          }}>
          <Title color={'white'}>확인</Title>
        </TouchableOpacity>
      </Pressable>
    </PublicModal>
  );
};
export default ContentsViewPop;

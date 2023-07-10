import React, {useState} from 'react';
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

const styles = StyleSheet.create({
  modalView: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#fff',
    marginHorizontal: 50,
  },
  chooseContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    display: 'flex',
    marginBottom: 8,
  },
  chooseBtn: {
    flex: 1,
    width: 100,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.8,
    borderColor: '#000',
  },
  input: {
    padding: 5,
    borderWidth: 0.8,
    borderColor: '#000',
    height: 35,
  },
  description: {
    height: Dimensions.get('window').height / 5,
  },
  videoDescription: {
    height: Dimensions.get('window').height / 7.5,
  },
  pickBtn: {
    width: 100,
    alignItems: 'center',
    borderWidth: 0.8,
    borderColor: '#000',
    padding: 8,
  },
  inputRightMargin: {
    marginRight: 5,
    marginBottom: 0,
  },
  flexEnd: {
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  flexCenter: {
    alignItems: 'center',
  },

  fileContainer: {
    justifyContent: 'space-between',
    paddingHorizontal: 2,
  },
  image: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  imageView: {
    height: Dimensions.get('window').height / 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  linkView: {
    flexDirection: 'row',
  },
});

import PublicModal from '../../components/PublicModal';
import pause from '../../../assets/images/pause.png';
import linkBtn from '../../../assets/images/linkBtn.png';

const ContentsViewPop = ({
  id,
  src,
  onModify,
  contentsViewPopVisible,
  setContentsViewPopVisible,
}) => {
  const [selectedButton, setSelectedButton] = useState(selectedValue());

  function selectedValue() {
    if (id == '1') return 'Photo';
    else if (id == '2') return 'Video';
    else if (id == '3') return 'Link';
    else return 'Photo';
  } // id값을 통해 사진 수정 시 초기 selected 값을 사진으로 적용하여 각 종류에 맞는 DetailPopup이 열려있도록 구현

  return (
    <PublicModal
      id={id}
      onModify={onModify}
      isModalVisible={contentsViewPopVisible}
      setIsModalVisible={setContentsViewPopVisible}>
      <Pressable
        onPress={() => setContentsViewPopVisible(true)} // Pressable: Modal 영역 안 클릭 시 Modal 유지 구현을 위해 Pressable로 감싸서 적용
        style={styles.modalView}>
        <View style={styles.flexEnd}>
          <TouchableOpacity
            onPress={() => {
              setContentsViewPopVisible(false); // pickBtn: 모달 영역 안 (DetailPopup X 닫기)
            }}>
            <Text>X</Text>
          </TouchableOpacity>
        </View>

        {selectedButton === 'Photo' && (
          <View>
            <View style={styles.imageView}>
              <Image source={src} style={styles.image} />
            </View>
            <Text style={styles.input}>TITLE</Text>
            <Text style={styles.input}>DESCRIPTION</Text>
          </View>
        )}
        {selectedButton === 'Video' && (
          <View>
            <View style={styles.imageView}>
              <Image source={pause} style={styles.image} />
            </View>
            <Text style={styles.input}>TITLE</Text>
            <Text style={styles.input}>DESCRIPTION</Text>
          </View>
        )}
        {selectedButton === 'Link' && (
          <View>
            <View style={styles.imageView}>
              <Image source={src} style={styles.image} />
            </View>
            <TouchableOpacity
              style={[styles.input, styles.linkView]}
              onPress={() =>
                Linking.openURL(
                  'https://github.com/MARS-crew/mars_portfolio_front',
                )
              }>
              <Image source={linkBtn} />
              <Text>LINK</Text>
            </TouchableOpacity>
          </View>
        )}
      </Pressable>
    </PublicModal>
  );
};
export default ContentsViewPop;

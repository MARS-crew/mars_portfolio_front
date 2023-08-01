import React, {useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
  Image,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import Attachment from '../../../assets/images/Attachment.png';
import emptyImg from '../../../assets/images/emptyImg.png';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const styles = StyleSheet.create({
  chooseContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    display: 'flex',
    marginBottom: 15,
  },

  pickBtn: {
    borderColor: '#EEEEEE',
    borderWidth: 1,
    borderRadius: 10,
    width: 285,
    height: 285,
    alignItems: 'center',
    justifyContent: 'center',
  },

  flexEnd: {
    alignItems: 'flex-end',
    marginBottom: 8,
  },

  fileContainer: {
    justifyContent: 'space-between',
    paddingHorizontal: 2,
  },
  image: {
    width: SCREEN_WIDTH / 5,
    height: SCREEN_HEIGHT / 5,
  },
});

const DetailPopAttachment = () => {
  const [pickUri, setPickUri] = useState(null);
  const openFilePicker = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles], // 모든 파일을 선택할 수 있도록 설정
      });

      setPickUri(res.uri);
      //console.log('파일 경로:', pickUri);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        //console.log('파일 선택이 취소되었습니다.');
      } else {
        //console.log('오류:', err);
      }
    }
  };

  const DeleteFile = () => {
    setPickUri(null);
    // 텍스트를 삭제하려면 빈 문자열을 설정합니다.
  };

  return (
    <View>
      <View style={styles.chooseContainer}>
        <TouchableOpacity style={styles.pickBtn} onPress={openFilePicker}>
          {pickUri === null && <Image source={Attachment} />}
          {pickUri === undefined && (
            <Image style={styles.image} source={emptyImg} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default DetailPopAttachment;

import React, {useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  TextInput,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';

const styles = StyleSheet.create({
  chooseContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    display: 'flex',
    marginBottom: 8,
  },
  Input: {
    flex: 2.5,
    alignItems: 'center',
    textAlign: 'center',
    borderWidth: 0.5,
    borderColor: '#000',
    height: 35,
    marginBottom: 8,
  },
  pickBtn: {
    width: 100,
    alignItems: 'center',
    borderWidth: 0.5,
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

  fileContainer: {
    justifyContent: 'space-between',
    paddingHorizontal: 2,
  },
});

const DetailPopAttachment = () => {
  const [pickUri, setPickUri] = useState();
  const openFilePicker = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles], // 모든 파일을 선택할 수 있도록 설정
      });

      setPickUri(res.uri);
      console.log('파일 경로:', pickUri);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('파일 선택이 취소되었습니다.');
      } else {
        console.log('오류:', err);
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
        <TextInput style={[styles.Input, styles.inputRightMargin]}></TextInput>
        <TouchableOpacity style={styles.pickBtn} onPress={openFilePicker}>
          <Text>Attach</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.chooseContainer, styles.fileContainer]}>
        <Text style={styles.inputRightMargin}>첨부파일</Text>
        <View style={styles.chooseContainer}>
          <Text style={styles.inputRightMargin}>{pickUri}</Text>
          <TouchableOpacity style={styles.flexEnd} onPress={() => DeleteFile()}>
            <Text>X</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default DetailPopAttachment;

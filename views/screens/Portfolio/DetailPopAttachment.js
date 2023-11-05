import React, {useEffect, useState, useRef, useContext} from 'react';
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
import {launchImageLibrary} from 'react-native-image-picker';
import {MyContext} from '../../../MyContext';
import {Video} from 'react-native-video';

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

const DetailPopAttachment = code => {
  const [temporaryUrl, setTemporaryUrl] = useState(null);
  const {portfolioUrl, setPortfolioUrl} = useContext(MyContext);
  const {ext, setExt} = useContext(MyContext);

  //const videoRef = useRef(null);
  //const [pickUri, setPickUri] = useState(null);
  //const [changeData, setChangeData] = useState(null); // 수정 전 변경 내용 임시 저장
  //const [deletePopVisible, setDeletePopVisible] = useState(false); // 삭제 확인 창 상태
  //const [savePopVisible, setSavePopVisible] = useState(false);
  //const [isEditing, setIsEditing] = useState(false); // 수정 여부 확인 ( 수정 내용 없으면 저장 버튼 뜨지 않도록)

  const [deleteAlertVisible, setDeleteAlertVisible] = useState(false);

  // 갤러리에서 video나 photo 파일 선택
  const chooseFile = type => {
    console.log(code);
    let options;
    if (code.code == 1 || code.code == 3) {
      options = {
        mediaType: 'photo',
        maxWidth: 300,
        maxHeight: 550,
        quality: 1,
      };
    } else {
      options = {
        mediaType: 'video',
        maxWidth: 300,
        maxHeight: 550,
        videoQuality: 'low',
      };
    }

    launchImageLibrary(options, response => {
      if (response === false) {
        // 선택한 이미지가 없는 경우
        console.log('User did not select an image');
        return;
      }

      //console.log('Response = ', response);

      if (response.assets && response.assets.length > 0) {
        const asset = response['assets'][0];
        // console.log('base64 -> ', asset.base64);
        // console.log('uri -> ', asset.uri);
        // console.log('width -> ', asset.width);
        // console.log('height -> ', asset.height);
        // console.log('fileSize -> ', asset.fileSize);
        // console.log('type -> ', asset.type);
        // console.log('fileName -> ', asset.fileName);
        console.log('asset.uri:', asset.uri);
        setPortfolioUrl(
          `http://localhost:3000/uploads/file/${asset.uri.substring(
            asset.uri.lastIndexOf('/') + 1,
          )}`,
        );

        setExt(asset.uri.slice(-3));
        //setUrl(temporaryUrl);

        //setTemporaryUrl('');
        //setIsEditing(true);
      }
    });
    console.log('portfolioUrl:', portfolioUrl);
  };

  return (
    <View>
      <View style={styles.chooseContainer}>
        <TouchableOpacity
          style={styles.pickBtn}
          onPress={() => {
            chooseFile();
          }}>
          <Image
            source={
              portfolioUrl === null || portfolioUrl === ''
                ? Attachment
                : emptyImg
            }
          />
          {/* {(code.code === 1 || code.code === 3) && (
            <Image source={url === null ? Attachment : {uri: url}} />
          )}
          {code.code === 2 && (
            <View>
              {url === null && <Image source={Attachment} />}
              {url !== null && <Video ref={videoRef} source={{uri: url}} />}
            </View>
          )} */}

          {/* {temporaryUrl === null && <Image source={Attachment} />}
          {temporaryUrl === undefined && (
            <Image style={styles.image} source={emptyImg} />
          )}
          {temporaryUrl && <Image source={{uri: temporaryUrl}} />} */}
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default DetailPopAttachment;

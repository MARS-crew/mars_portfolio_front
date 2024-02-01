import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import axios from 'axios';
import { Shadow } from 'react-native-shadow-2';
import FAB from '../components/FloatingMenu';
import { getAlbumImage } from "../../api/v1/img";
import { useUserInfo } from '../../UserInfoContext';

const { width, height } = Dimensions.get('window');
const squareSize = Math.min(width, height) * 0.27;

const Album = () => {
  const { token } = useUserInfo();
  const [data, setData] = useState([]);
  const [years, setYears] = useState([]);

  useEffect(() => {
    const source = axios.CancelToken.source();

    getAlbumImage(token, {
      cancelToken: source.token,
    })

    axios({
      method: 'get',
      url: 'https://api.writeyoume.com/api/v1/img/album',
      headers: {
        Authorization: token,
      },
      cancelToken: source.token,
    })
      .then(function (response) {
        const extractedData = response.data.data.map(item => ({
          album_id: item.album_id,
          year: item.year,
          url: item.url,
        }));
        setData(extractedData);
        let yearsList = extractedData.map(item => item.year);

        setYears(yearsList.filter((value, index, self) => self.indexOf(value) === index));
        console.log('앨범', data);
        console.log(years);
      })
      .catch(function (error) {
        console.log(error);
      });

    return () => {
      isMounted = false;
      source.cancel('API 호출이 취소되었습니다.');
    };
  }, []);
  const shadowColor = 'rgba(151, 151, 151, 0.36)';
  const [selectedImage, setSelectedImage] = useState(null);
  const handleImagePress = data => {
    setSelectedImage(data);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const closeButtonRef = useRef(null);

  const handleModalPress = event => {
    const { target } = event.nativeEvent;

    const isCloseButton = target === closeButtonRef.current;

    if (!isCloseButton) {
      return;
    }

    handleCloseModal();
  };


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {years.map((year) => (
          <>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>마스외전 {year}년</Text>
              <Text style={styles.headerSubTitle}>
                {data.filter(item => item.year === year).length} 개
              </Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.body}>
              <View style={styles.bodyContent}>
                <View style={styles.imageRowContainer}>
                  {data
                    .filter(item => item.year === year)
                    .map(album => (
                      <Shadow
                        distance="12"
                        startColor={shadowColor}
                        offset={[1, 1]}
                        key={album.album_id}
                      >
                        <TouchableOpacity style={styles.imageContainer}
                          onPress={() => {
                            handleImagePress({ uri: album.url, });
                          }}
                        >
                          <Image
                            style={styles.imageContainer}
                            source={{ uri: album.url }}
                            resizeMode='cover'
                          />
                        </TouchableOpacity>
                      </Shadow>
                    ))}
                </View>
              </View>
            </View>
          </>
        ))}
      </ScrollView>
      <FAB />
      <Modal visible={!!selectedImage} transparent={true}>
        {selectedImage && (
          <TouchableWithoutFeedback onPress={handleModalPress}>
            <View style={styles.modalContainer}>
              <Image
                source={selectedImage}
                style={styles.selectedImage}
                resizeMode="cover"
              />
              <TouchableOpacity
                style={styles.closeButtonArea}
                ref={closeButtonRef}
                onPress={handleCloseModal}>
                <Image
                  style={styles.closeButton}
                  source={require('../../assets/images/closewhite.png')}
                />
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        )}
      </Modal>
    </SafeAreaView >


  );
};

export default Album;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 20,
    flex: 1,
  },
  header: {
    height: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
  },
  headerSubTitle: {
    position: 'absolute',
    bottom: 0,
    right: 5,
    fontSize: 12,
    fontWeight: 'normal',
    color: '#333333',
  },
  secondHeader: {
    marginTop: 25,
  },

  imageRowContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  imageContent: {
    flex: 1,
    borderRadius: 8,
  },
  imageContainer: {
    width: squareSize,
    height: squareSize,
    // 3개의 이미지가 한 행에 들어가도록 설정
    aspectRatio: 1, // 정사각형 형태로 유지
    borderRadius: 10,
    marginBottom: 14.5,
  },
  divider: {
    marginHorizontal: 20,
    marginBottom: 15,
    borderBottomColor: '#E5E5E5',
    borderBottomWidth: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  selectedImage: {
    width: squareSize * 3,
    height: squareSize * 3,
    aspectRatio: 1,
    borderRadius: 10,
  },
  closeButtonArea: {
    position: 'absolute',
    top: 20,
    right: 20,
    marginTop: 20,
    marginRight: 20,
  },
  closeButton: {
    width: 30,
    height: 30,
  },
});

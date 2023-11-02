// import React, {useState, useEffect, useRef} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
//   SafeAreaView,
//   ScrollView,
//   Modal,
//   TouchableWithoutFeedback,
//   Dimensions,
// } from 'react-native';

// const {width} = Dimensions.get('window');

// const Item = ({image, onPress}) => {
//   return (
//     <TouchableOpacity style={styles.imageContainer} onPress={onPress}>
//       <Image
//         source={{uri: image.url}}
//         style={styles.loadedImage}
//         resizeMode="contain"
//       />
//     </TouchableOpacity>
//   );
// };

// const Album = () => {
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [imageData, setImageData] = useState([]);

//   useEffect(() => {
//     fetchDummyImageData(); // Fetch dummy image data when the component mounts
//   }, []);

//   const fetchDummyImageData = async () => {
//     try {
//       const response = await fetch(
//         'https://jsonplaceholder.typicode.com/photos?_limit=10',
//       );
//       const data = await response.json();
//       setImageData(data);
//     } catch (error) {
//       console.error('Error fetching image data:', error);
//     }
//   };

//   const handleImagePress = image => {
//     setSelectedImage(image);
//   };

//   const handleCloseModal = () => {
//     setSelectedImage(null);
//   };

//   const closeButtonRef = useRef(null);

//   const handleModalPress = event => {
//     const {target} = event.nativeEvent;

//     // Check if the target element matches the close button
//     const isCloseButton = target === closeButtonRef.current;

//     if (!isCloseButton) {
//       return; // Do nothing if clicked outside the button area
//     }

//     handleCloseModal();
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView
//         contentContainerStyle={styles.scrollContentContainer}
//         showsVerticalScrollIndicator={false}>
//         <Text style={styles.title}>2023</Text>
//         <Text style={styles.subtitle}>{imageData.length} photos</Text>
//         <View style={styles.flatContainer}>
//           {imageData.map(item => (
//             <Item
//               key={item.id}
//               image={item}
//               onPress={() => handleImagePress(item)}
//             />
//           ))}
//         </View>
//         <View style={styles.space} />
//         <Text style={styles.title}>2022</Text>
//         <Text style={styles.subtitle}>{imageData.length} photos</Text>
//         <View style={styles.flatContainer}>
//           {imageData.map(item => (
//             <Item
//               key={item.id}
//               image={item}
//               onPress={() => handleImagePress(item)}
//             />
//           ))}
//         </View>
//       </ScrollView>

//       <Modal visible={!!selectedImage} transparent={true}>
//         {selectedImage && (
//           <TouchableWithoutFeedback onPress={handleModalPress}>
//             <View style={styles.modalContainer}>
//               <Image
//                 source={{uri: selectedImage.url}}
//                 style={styles.selectedImage}
//                 resizeMode="contain"
//               />
//               <TouchableOpacity
//                 ref={closeButtonRef}
//                 style={styles.closeButton}
//                 onPress={handleCloseModal}>
//                 <Text style={styles.closeButtonText}>X</Text>
//               </TouchableOpacity>
//             </View>
//           </TouchableWithoutFeedback>
//         )}
//       </Modal>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//   },
//   scrollContentContainer: {
//     alignItems: 'center',
//   },
//   imageContainer: {
//     width: width * 0.2,
//     aspectRatio: 3 / 4,
//     marginHorizontal: width * 0.025,
//     marginVertical: width * 0.05,
//   },
//   flatContainer: {
//     width: '100%',
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'flex-start', // Align images to the left
//   },
//   loadedImage: {
//     width: '100%',
//     height: '100%',
//     backgroundColor: 'blue',
//   },
//   title: {
//     fontSize: 18,
//     marginVertical: 10,
//     fontWeight: 'bold',
//     // animationName: 'fadeIn',
//     // animationDuration: '0.5s',
//     // animationDelay: '0s',
//     // animationTimingFunction: 'ease-in',
//     // animationFillMode: 'forwards',
//     color: '#000',
//   },
//   subtitle: {
//     color: '#888',
//     fontWeight: '300',
//     fontSize: 14,
//     marginBottom: 20,
//     // animationName: 'fadeIn',
//     // animationDuration: '0.5s',
//     // animationDelay: '0.4s',
//     // animationTimingFunction: 'ease-in',
//     // animationFillMode: 'forwards',
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.7)',
//   },
//   selectedImage: {
//     width: '50%',
//     height: '50%',
//     aspectRatio: 1,
//   },
//   closeButton: {
//     position: 'absolute',
//     top: 20,
//     right: 20,
//     backgroundColor: '#fff',
//     borderRadius: 15,
//     width: 30,
//     height: 30,
//     marginTop: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   closeButtonText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: 'black',
//   },
// });

// export default Album;

import React, {useState, useEffect, useRef} from 'react';
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
import {Shadow} from 'react-native-shadow-2';
import FAB from '../components/FloatingMenu';

const albumImages = [
  {
    id: 1,
    url: require('../../assets/images/album1.jpeg'),
  },
  {
    id: 2,
    url: require('../../assets/images/album2.jpeg'),
  },
  {
    id: 3,
    url: require('../../assets/images/album3.jpeg'),
  },
];

const albumImages2 = [
  {
    id: 4,
    url: require('../../assets/images/album4.jpeg'),
  },
  {
    id: 5,
    url: require('../../assets/images/album5.jpeg'),
  },
  {
    id: 6,
    url: require('../../assets/images/album6.jpeg'),
  },
];
const {width, height} = Dimensions.get('window');
const squareSize = Math.min(width, height) * 0.27;

const shadowColor = 'rgba(151, 151, 151, 0.36)';
const Album = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const source = axios.CancelToken.source();
    axios({
      method: 'get',
      url: 'http://10.0.2.2:3000/api/v1/img/album',

      headers: {
        Authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InNuc19pZCI6MjAsIm1lbWJlcl9pZCI6NDYsInR5cGUiOiJnb29nbGUiLCJuYW1lIjoi7Zi465Sx7J20IiwiYWNjZXNzX3Rva2VuIjoieWEyOS5hMEFmQl9ieUN5WG5uUWk5WF9sSGgwM0VERXlpRTNQMmZ3Q25IbGtkYmRIY2l4VGRzNTQtZDRKM285ckYzV2c2YnVGeEg3Yk9aLWxLQlNPNG1qUnpxd2Mzb2RMeF9nYmUzRmhYdElRQldyVEtldnItWS1BMTdxa0tfd2FGT1dfeV9JWjFpVncwRG9PcFZpa3JST0RMa3NqeGtuQWFHVDBfY0NUYUZSYUNnWUtBVFlTQVJNU0ZRR09jTm5DLWdONzNtNkdNQnpHeXA4S0o3b2x1ZzAxNzEiLCJyZWZyZXNoX3Rva2VuIjpudWxsLCJhdXRoX2NvZGUiOm51bGwsImNvbm5lY3RfZGF0ZSI6IjIwMjMtMTAtMDlUMDI6NDk6MjcuMDAwWiJ9LCJpYXQiOjE2OTg5MDgwODEsImV4cCI6MTY5ODkxMTY4MX0.3wR8i0ma3fOnBaP_AZM45UF0xkFBlg00_kcLUl8l1bQ',
      },
      cancelToken: source.token,
    })
      .then(function (response) {
        const extractedData = response.data.data.map(item => ({
          album_id: item.album_id,
          year: item.year,
          url: `http://10.0.2.2:3000/${item.url}`,
        }));
        setData(extractedData);

        console.log('앨범', data);
        console.log(
          response.data.data.map(item => ({
            //url: item.url,
            url: `http://10.0.2.2:3000/${item.url}`,
          })),
        );
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
    const {target} = event.nativeEvent;

    const isCloseButton = target === closeButtonRef.current;

    if (!isCloseButton) {
      return;
    }

    handleCloseModal();
  };

  console.log(data.filter(album => album.year === 2022));
  console.log(data.filter(album => album.year === 2023));

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>마스외전 2023년</Text>
          <Text style={styles.headerSubTitle}>
            {data.filter(album => album.year === 2023).length} 개
          </Text>
        </View>
        <View style={styles.divider} />

        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <View style={styles.imageRowContainer}>
              {data
                .filter(album => album.year === 2023)
                .map(image => (
                  <Shadow
                    distance="12"
                    startColor={shadowColor}
                    offset={[1, 1]}>
                    <TouchableOpacity
                      style={styles.imageContainer}
                      key={image.album_id}
                      onPress={() => {
                        handleImagePress({
                          uri: image.url,
                        });
                      }}>
                      <Image
                        style={styles.imageContent}
                        source={{uri: image.url}}
                        resizeMode="cover"
                      />
                    </TouchableOpacity>
                  </Shadow>
                ))}
            </View>
          </View>
        </View>

        <View style={[styles.header, styles.secondHeader]}>
          <Text style={styles.headerTitle}>마스외전 2022년</Text>
          <Text style={styles.headerSubTitle}>
            {data.filter(album => album.year === 2022).length} 개
          </Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <View style={styles.imageRowContainer}>
              {data
                .filter(album => album.year === 2022)
                .map(image => (
                  <Shadow
                    distance="12"
                    startColor={shadowColor}
                    offset={[1, 1]}>
                    <TouchableOpacity
                      style={styles.imageContainer}
                      key={image.album_id}
                      onPress={() => {
                        [
                          handleImagePress({
                            uri: image.url,
                          }),
                        ];
                      }}>
                      <Image
                        style={styles.imageContent}
                        source={{uri: image.url}}
                        resizeMode="cover"
                      />
                    </TouchableOpacity>
                  </Shadow>
                ))}
            </View>
          </View>
        </View>
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
    </SafeAreaView>
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

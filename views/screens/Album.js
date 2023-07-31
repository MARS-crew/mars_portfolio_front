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

// album images
const albumImages = [
  {
    id: 1,
    url: require('../../assets/images/text_album_1.png'),
  },
  {
    id: 2,
    url: require('../../assets/images/text_album_2.png'),
  },
  {
    id: 3,
    url: require('../../assets/images/text_album_3.png'),
  },
];

const albumImages2 = [
  {
    id: 4,
    url: require('../../assets/images/text_album_4.png'),
  },
  {
    id: 5,
    url: require('../../assets/images/text_album_5.png'),
  },
  {
    id: 6,
    url: require('../../assets/images/text_album_6.png'),
  },
];

const Album = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImagePress = image => {
    setSelectedImage(image);
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>마스외전 2023년</Text>
          <Text style={styles.headerSubTitle}>111개</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <View style={styles.imageContainer}>
              {albumImages.map(image => (
                <TouchableOpacity
                  key={image.id}
                  onPress={() => handleImagePress(image)}>
                  <Image
                    style={styles.imageContent}
                    source={image.url}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.imageContainer}>
              {albumImages2.map(image => (
                <TouchableOpacity
                  key={image.id}
                  onPress={() => handleImagePress(image)}>
                  <Image
                    style={styles.imageContent}
                    source={image.url}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.header}>
          <Text style={styles.headerTitle}>마스외전 2022년</Text>
          <Text style={styles.headerSubTitle}>111개</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <View style={styles.imageContainer}>
              {albumImages.map(image => (
                <TouchableOpacity
                  key={image.id}
                  onPress={() => handleImagePress(image)}>
                  <Image
                    style={styles.imageContent}
                    source={image.url}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.imageContainer}>
              {albumImages2.map(image => (
                <TouchableOpacity
                  key={image.id}
                  onPress={() => handleImagePress(image)}>
                  <Image
                    style={styles.imageContent}
                    source={image.url}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      <Modal visible={!!selectedImage} transparent={true}>
        {selectedImage && (
          <TouchableWithoutFeedback onPress={handleModalPress}>
            <View style={styles.modalContainer}>
              <Image
                source={selectedImage.url}
                style={styles.selectedImage}
                resizeMode="contain"
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

const {width} = Dimensions.get('window').width;
const {height} = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: height,
    backgroundColor: 'white',
  },
  header: {
    marginTop: 20,
    marginHorizontal: 20,
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
    right: 0,
    fontSize: 12,
    fontWeight: 'normal',
    color: '#333333',
  },
  body: {
    marginHorizontal: 20,
  },
  bodyContent: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  imageContainer: {
    flexDirection: 'row',
  },
  imageContent: {
    width: 125,
    height: 125,
  },
  divider: {
    width: width,
    height: 1,
    marginVertical: 10,
    marginHorizontal: 20,
    backgroundColor: '#D8D8D8',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  selectedImage: {
    width: '50%',
    height: '50%',
    aspectRatio: 1,
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

// import React, {useState, useEffect} from 'react';
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
// const photoImage = require('../..//assets/images/SplashImg.jpeg');
// const DATA = [];
// const imageNumber = 10;

// for (let i = 0; i < imageNumber; i++) {
//   DATA.push(photoImage);
// }

// const Item = ({image, onPress}) => {
//   return (
//     <TouchableOpacity style={styles.imageContainer} onPress={onPress}>
//       <Image source={image} style={styles.loadedImage} resizeMode="contain" />
//     </TouchableOpacity>
//   );
// };

// const Album = () => {
//   const [selectedImage, setSelectedImage] = useState(null);

//   const handleImagePress = image => {
//     setSelectedImage(image);
//   };

//   const handleCloseModal = () => {
//     setSelectedImage(null);
//   };

//   const handleModalPress = () => {
//     handleCloseModal();
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView contentContainerStyle={styles.scrollContentContainer}>
//         <Text style={styles.title}>2023</Text>
//         <Text style={styles.subtitle}>{imageNumber} photos</Text>
//         <View style={styles.flatContainer}>
//           {DATA.map((item, index) => (
//             <Item
//               key={index}
//               image={item}
//               onPress={() => handleImagePress(item)}
//             />
//           ))}
//         </View>
//         <View style={styles.space} />
//         <Text style={styles.title}>2022</Text>
//         <Text style={styles.subtitle}>{imageNumber} photos</Text>
//         <View style={styles.flatContainer}>
//           {DATA.map((item, index) => (
//             <Item
//               key={index}
//               image={item}
//               onPress={() => handleImagePress(item)}
//             />
//           ))}
//         </View>
//       </ScrollView>

//       <Modal visible={!!selectedImage} transparent={true}>
//         <TouchableWithoutFeedback onPress={handleModalPress}>
//           <View style={styles.modalContainer}>
//             <Image
//               source={selectedImage}
//               style={styles.selectedImage}
//               resizeMode="contain"
//             />
//             <TouchableOpacity
//               style={styles.closeButton}
//               onPress={handleCloseModal}></TouchableOpacity>
//           </View>
//         </TouchableWithoutFeedback>
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
//     justifyContent: 'flex-start',
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
//     animationName: 'fadeIn',
//     animationDuration: '0.5s',
//     animationDelay: '0s',
//     animationTimingFunction: 'ease-in',
//     animationFillMode: 'forwards',
//     color: '#000',
//   },
//   subtitle: {
//     color: '#888',
//     fontWeight: '300',
//     fontSize: 14,
//     marginBottom: 20,
//     animationName: 'fadeIn',
//     animationDuration: '0.5s',
//     animationDelay: '0.4s',
//     animationTimingFunction: 'ease-in',
//     animationFillMode: 'forwards',
//   },
//   space: {
//     marginVertical: 20,
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
//   },
// });

// export default Album;

import React, {useState, useEffect} from 'react';
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

const {width} = Dimensions.get('window');

const Item = ({image, onPress}) => {
  return (
    <TouchableOpacity style={styles.imageContainer} onPress={onPress}>
      <Image
        source={{uri: image.url}}
        style={styles.loadedImage}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

const Album = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageData, setImageData] = useState([]);

  useEffect(() => {
    fetchDummyImageData(); // Fetch dummy image data when the component mounts
  }, []);

  const fetchDummyImageData = async () => {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/photos?_limit=10',
      );
      const data = await response.json();
      setImageData(data);
    } catch (error) {
      console.error('Error fetching image data:', error);
    }
  };

  const handleImagePress = image => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const handleModalPress = () => {
    handleCloseModal();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContentContainer}>
        <Text style={styles.title}>2023</Text>
        <Text style={styles.subtitle}>{imageData.length} photos</Text>
        <View style={styles.flatContainer}>
          {imageData.map(item => (
            <Item
              key={item.id}
              image={item}
              onPress={() => handleImagePress(item)}
            />
          ))}
        </View>
        <View style={styles.space} />
        <Text style={styles.title}>2022</Text>
        <Text style={styles.subtitle}>{imageData.length} photos</Text>
        <View style={styles.flatContainer}>
          {imageData.map(item => (
            <Item
              key={item.id}
              image={item}
              onPress={() => handleImagePress(item)}
            />
          ))}
        </View>
      </ScrollView>

      <Modal visible={!!selectedImage} transparent={true}>
        {selectedImage && (
          <TouchableWithoutFeedback onPress={handleModalPress}>
            <View style={styles.modalContainer}>
              <Image
                source={{uri: selectedImage.url}}
                style={styles.selectedImage}
                resizeMode="contain"
              />
              <TouchableOpacity
                style={styles.closeButton}
                onPress={handleCloseModal}></TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        )}
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContentContainer: {
    alignItems: 'center',
  },
  imageContainer: {
    width: width * 0.2,
    aspectRatio: 3 / 4,
    marginHorizontal: width * 0.025,
    marginVertical: width * 0.05,
  },
  flatContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start', // Align images to the left
  },
  loadedImage: {
    width: '100%',
    height: '100%',
    backgroundColor: 'blue',
  },
  title: {
    fontSize: 18,
    marginVertical: 10,
    fontWeight: 'bold',
    animationName: 'fadeIn',
    animationDuration: '0.5s',
    animationDelay: '0s',
    animationTimingFunction: 'ease-in',
    animationFillMode: 'forwards',
    color: '#000',
  },
  subtitle: {
    color: '#888',
    fontWeight: '300',
    fontSize: 14,
    marginBottom: 20,
    animationName: 'fadeIn',
    animationDuration: '0.5s',
    animationDelay: '0.4s',
    animationTimingFunction: 'ease-in',
    animationFillMode: 'forwards',
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
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
});

export default Album;

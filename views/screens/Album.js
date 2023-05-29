import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
const photoImage = require('../../assets/images/camera.png');

// const numberOfPhotos = 10;
// let photos = [];
// for (let i = 0; i < numberOfPhotos; i++) {
//   // photos.push(`https://source.unsplash.com/random?sig=${i}`);
//   photos.push(`file://${photoImage}`);
// }

// const AlbumImage = ({image}) => {
//   const [loaded, setLoaded] = useState(false);

//   useEffect(() => {
//     const imageObject = Image.prefetch(image);
//     imageObject.then(() => setLoaded(true));

//     return () => {};
//   }, [image]);

//   const handleImagePress = () => {
//     // Handle image press if needed
//   };

//   const imageStyle = [styles.image, loaded && styles.loadedImage];

//   return (
//     <TouchableOpacity style={styles.imageContainer} onPress={handleImagePress}>
//       <Image source={image.uri ? {uri: image.uri} : image} style={imageStyle} />
//     </TouchableOpacity>
//   );
// };

// // Album component
// const Album = () => {
//   // Render function for album images
//   const renderAlbumImage = ({item}) => <AlbumImage image={item} />;

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Vacation</Text>
//       <Text style={styles.subtitle}>{numberOfPhotos} photos</Text>
//       <FlatList
//         data={photos}
//         renderItem={renderAlbumImage}
//         keyExtractor={(item, index) => index.toString()}
//         numColumns={4}
//         contentContainerStyle={styles.photosContainer}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 50,
//     paddingBottom: 50,
//     alignItems: 'center',
//     backgroundColor: '#F0F5FE',
//   },
//   title: {
//     // opacity: 0,
//     fontSize: 18,
//     marginBottom: 10,
//     animationName: 'fadeIn',
//     animationDuration: '0.5s',
//     animationDelay: '0s',
//     animationTimingFunction: 'ease-in',
//     animationFillMode: 'forwards',
//     color: '#000',
//   },
//   subtitle: {
//     // opacity: 0,
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
//   photosContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     maxWidth: 600,
//   },
//   imageContainer: {
//     width: '25%',
//     aspectRatio: 1,
//     margin: 4,
//   },
//   image: {
//     width: '100%',
//     height: '100%',
//     borderRadius: 3,
//     backgroundColor: '#CCC',
//     // opacity: 0,
//     transform: [{translateY: -5}, {scale: 0.7}, {rotateX: '80deg'}],
//     transitionProperty: 'opacity, transform',
//     transitionDuration: '0.5s',
//     transitionTimingFunction: 'ease-out',
//   },
//   loadedImage: {
//     opacity: 1,
//     transform: [{translateY: 0}, {scale: 1}, {rotateX: '0deg'}],
//   },
// });

// export default Album;

const DATA = [];
const imageNumber = 20;

for (let i = 0; i < imageNumber; i++) {
  DATA.push(photoImage);
}

const Item = ({image, onPress}) => {
  return (
    <TouchableOpacity style={styles.imageContainer} onPress={onPress}>
      <Image source={image} style={styles.loadedImage} resizeMode="contain" />
    </TouchableOpacity>
  );
};

const Album = () => {
  const [selectedImage, setSelectedImage] = useState(null);

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
      <Text style={styles.title}>2023</Text>
      <Text style={styles.subtitle}>{imageNumber} photos</Text>
      <FlatList
        data={DATA}
        renderItem={({item}) => (
          <Item image={item} onPress={() => handleImagePress(item)} />
        )}
        keyExtracter={(item, index) => index.toString()}
        numColumns={4}
        contentContainerStyle={styles.flatContainer}
      />
      <View style={styles.space} />
      <Text style={styles.title}>2022</Text>
      <Text style={styles.subtitle}>{imageNumber} photos</Text>
      <FlatList
        data={DATA}
        renderItem={({item}) => (
          <Item image={item} onPress={() => handleImagePress(item)} />
        )}
        keyExtracter={(item, index) => index.toString()}
        numColumns={4}
        contentContainerStyle={styles.flatContainer}
      />

      <Modal visible={!!selectedImage} transparent={true}>
        <TouchableWithoutFeedback onPress={handleModalPress}>
          <View style={styles.modalContainer}>
            <Image
              source={selectedImage}
              style={styles.selectedImage}
              resizeMode="contain"
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleCloseModal}></TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  imageContainer: {
    width: '20%',
    aspectRatio: 3 / 4,
    marginHorizontal: 10,
    marginVertical: 20,
  },
  flatContainer: {
    maxWidth: 600,
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
  space: {
    marginVertical: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  selectedImage: {
    width: '200%',
    aspectRatio: 1,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
});

export default Album;

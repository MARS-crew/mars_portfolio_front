import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const numberOfPhotos = 5;
const photos = [];
for (let i = 0; i < numberOfPhotos; i++) {
  photos.push(require(`../../assets/images/camera.png`));
}

const Album = () => {
  const [loadedImages, setLoadedImages] = useState([]);

  useEffect(() => {
    const loadImages = async () => {
      const loaded = [];
      for (let i = 0; i < numberOfPhotos; i++) {
        loaded.push(photos[i].uri);
      }
      setLoadedImages(loaded);
    };

    loadImages();
  }, []);

  const renderAlbumImage = (image, index) => {
    const imageStyle = {
      uri: image,
      width: '20%',
      aspectRatio: 1,
      margin: '2.5%',
      borderRadius: 3,
      backgroundColor: '#CCC',
      opacity: loadedImages.includes(image) ? 1 : 0,
      transform: [
        { translateY: loadedImages.includes(image) ? 0 : -5 },
        { scale: loadedImages.includes(image) ? 1 : 0.7 },
        { rotateX: loadedImages.includes(image) ? '0deg' : '80deg' },
      ],
      transitionProperty: 'opacity, transform',
      transitionDuration: '0.5s',
      transitionTimingFunction: 'ease-out',
    };

    const handleImagePress = () => {
      // Handle image press if needed
    };

    return (
      <TouchableOpacity
        key={index}
        style={styles.imageContainer}
        onPress={handleImagePress}
      >
        <Image style={imageStyle} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vacation</Text>
      <Text style={styles.subtitle}>{numberOfPhotos} photos</Text>
      <View style={styles.photosContainer}>
        {photos.map((image, index) => renderAlbumImage(image, index))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingBottom: 50,
    alignItems: 'center',
    backgroundColor: '#F0F5FE',
  },
  title: {
    opacity: 0,
    fontSize: 16,
    marginBottom: 10,
    animationName: 'fadeIn',
    animationDuration: '0.5s',
    animationDelay: '0s',
    animationTimingFunction: 'ease-in',
    animationFillMode: 'forwards',
  },
  subtitle: {
    opacity: 0,
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
  photosContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    maxWidth: 30,
  },
  imageContainer: {
    width: '20%',
    aspectRatio: 1,
    margin: '2.5%',
  },
});

export default Album;

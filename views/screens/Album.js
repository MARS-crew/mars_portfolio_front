import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const numberOfPhotos = 11;
const photos = [];
for (let i = 0; i < numberOfPhotos; i++) {
  photos.push(`https://source.unsplash.com/random?sig=${i}`);
}

const AlbumImage = ({ image }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const imageObject = Image.prefetch(image);
    imageObject.then(() => setLoaded(true));

    return () => {
      // Clean up the image prefetch if needed
    };
  }, [image]);

  const imageStyle = [
    styles.image,
    loaded && styles.loadedImage,
  ];

  const handleImagePress = () => {
    // Handle image press if needed
  };

  return (
    <TouchableOpacity style={styles.imageContainer} onPress={handleImagePress}>
      <Image source={{ uri: image }} style={imageStyle} />
    </TouchableOpacity>
  );
};

const Album = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vacation</Text>
      <Text style={styles.subtitle}>{numberOfPhotos} photos</Text>
      <View style={styles.photosContainer}>
        {photos.map((image, index) => (
          <AlbumImage key={index} image={image} />
        ))}
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
    maxWidth: 600,
  },
  imageContainer: {
    width: '20%',
    aspectRatio: 1,
    margin: '2.5%',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 3,
    backgroundColor: '#CCC',
    opacity: 0,
    transform: [
      { translateY: -5 },
      { scale: 0.7 },
      { rotateX: '80deg' },
    ],
    transitionProperty: 'opacity, transform',
    transitionDuration: '0.5s',
    transitionTimingFunction: 'ease-out',
  },
  loadedImage: {
    opacity: 1,
    transform: [
      { translateY: 0 },
      { scale: 1 },
      { rotateX: '0deg' },
    ],
  },
});

export default Album;

import React, {useState} from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ThumbsUpAnimation = () => {
  const [isActive, setIsActive] = useState(false);

  const handlePress = () => {
    setIsActive(!isActive);
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <Icon
        name={isActive ? 'thumbs-up' : 'thumbs-up'}
        size={25}
        color={isActive ? 'blue' : 'gray'}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
    backgroundColor: 'transparent',
  },
});

export default ThumbsUpAnimation;

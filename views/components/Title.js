import React from 'react';
import {Text, StyleSheet} from 'react-native';

const Title = props => {
  return <Text style={styles.text}>{props.children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontWeight: '700',
    fontSize: 14,
  },
});

export default Title;

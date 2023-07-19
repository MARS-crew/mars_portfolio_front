import React from 'react';
import {Text, StyleSheet} from 'react-native';

const Title = ({color, children}) => {
  const chooseOkBtnStyle = {
    color: color, // 프롭스 값으로 텍스트 색상 설정
  };
  return <Text style={[styles.text, chooseOkBtnStyle]}>{children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    color: '#333333',
    fontWeight: '700',
    fontSize: 14,
  },
});

export default Title;

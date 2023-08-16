import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';

import Title from './Title';

const ChooseButton = ({background, size, children, onPress}) => {
  const color = background === 'blue' ? 'white' : '#333333';
  const chooseOkBtnStyle = {
    backgroundColor: background === 'blue' ? '#072AC8' : 'white', // 프롭스 값으로 텍스트 색상 설정
    borderWidth: background === 'blue' ? 0 : 1, // 프롭스 값으로 보더 굴기 설정
    marginLeft: background === 'blue' ? 10 : null, // 프롭스 값으로 마진 설정
    width: size === 'M' ? 132 : 59,
  };

  return (
    <TouchableOpacity
      style={[styles.chooseBtn, chooseOkBtnStyle]}
      onPress={onPress}>
      <Title color={color}>{children}</Title>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chooseBtn: {
    width: 59,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderColor: '#F5F5F5',
    borderWidth: 1,
    borderRadius: 20,
  },
  chooseOkBtn: {backgroundColor: '#072AC8', borderWidth: 0, marginLeft: 10},
});

export default ChooseButton;

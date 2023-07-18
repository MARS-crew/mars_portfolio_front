import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';

import Title from './Title';

const Button = ({background, children}) => {
  const color = background === 'blue' ? 'white' : 'black';
  const chooseOkBtnStyle = {
    background: background, // 프롭스 값으로 텍스트 색상 설정
  };

  return (
    <TouchableOpacity style={[styles.chooseBtn, styles.chooseOkBtn]}>
      <Title color={color}>{children}</Title>
    </TouchableOpacity>
  ); //<Text style={[styles.text, chooseOkBtnStyle]}>{children}</Text>;
};

const styles = StyleSheet.create({
  chooseBtn: {
    width: 59,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 20,
    padding: 8,
  },
  chooseOkBtn: {backgroundColor: '#072AC8', borderWidth: 0, marginLeft: 10},
});

export default Button;

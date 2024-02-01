import {StyleSheet, TouchableOpacity} from 'react-native';
import Title from '../../components/commonComponent/Title';

const styles = StyleSheet.create({
  chooseBtn: {
    flex: 1,
    borderColor: '#F5F5F5',
    borderBottomWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 12,
  },

  PressedBtn: {borderColor: '#072AC8'},
});

const SectionChooseBtn = ({title, buttonPressed, onPress}) => {
  //디테일 팝 섹션(이미지, 영상, 링크) 선택 버튼 공통 컴포넌트
  return (
    <TouchableOpacity
      style={[
        styles.chooseBtn,
        buttonPressed ? styles.PressedBtn : styles.chooseBtn,
      ]}
      onPress={onPress}>
      <Title
        fontSize={16}
        fontWeight={'700'}
        color={buttonPressed ? 'blue' : 'gray'}>
        {title}
      </Title>
    </TouchableOpacity>
  );
};
export default SectionChooseBtn;

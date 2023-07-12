import {
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Text,
  View,
} from 'react-native';

import Title from './Title';

const styles = StyleSheet.create({
  modalView: {
    width: 301,
    height: 145,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    marginHorizontal: 50,
  },
  modalTitle: {
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '400',
    color: 'black',
    marginTop: 33,
  },
  chooseContainer: {
    marginTop: 33,
    marginRight: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    display: 'flex',
  },
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

import PublicModal from './PublicModal';

const choosePop = ({
  id,
  title,
  onModify,
  onDelete,
  setIsModalVisible,
  checkChoosePopOkButton,
  setCheckChoosePopOkButton,
  isModalVisible,
  choosePopVisible,
  setChoosePopVisible,
  setDetailPopVisible,
}) => {
  const onDeleteORonModify = () => {
    if (title === '수정된 내용을 삭제하시겠습니까?') {
      onDelete(id); //개발 방식 검토중인 기능이므로 구현 미완료
      console.log(onDelete);
    } else if (title === '수정된 내용을 저장하시겠습니까?') {
      onModify(id); //개발 방식 검토중인 기능이므로 구현 미완료
      console.log(onModify);
    }
    console.log('return');
  };

  return (
    <PublicModal
      id={id}
      onDelete={onDelete}
      onModify={onModify}
      isModalVisible={choosePopVisible}
      setIsModalVisible={setChoosePopVisible}>
      <Pressable
        onPress={() => setChoosePopVisible(true)} // Pressable: Modal 영역 안 클릭 시 Modal 유지 구현을 위해 Pressable로 감싸서 적용
        style={styles.modalView}>
        <Text style={styles.modalTitle}>{title}</Text>
        <View style={styles.chooseContainer}>
          <TouchableOpacity
            style={styles.chooseBtn}
            onPress={() => {
              setChoosePopVisible(false); // chooseBtn: 모달 영역 안 (ChoosePopup YES or NO, props를 통해 {title} 설정(예:  title="삭제하시겠습니까?"))
              if (setCheckChoosePopOkButton !== undefined)
                setCheckChoosePopOkButton(!checkChoosePopOkButton);
            }}>
            <Title>취소</Title>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.chooseBtn, styles.chooseOkBtn]}
            onPress={() => {
              setChoosePopVisible(false); // chooseBtn: 모달 영역 안 (ChoosePopup YES or NO, props를 통해 {title} 설정(예:  title="삭제하시겠습니까?"))
              setIsModalVisible(false);
              onDeleteORonModify();
            }}>
            <Title color={'white'}>확인</Title>
          </TouchableOpacity>
        </View>
      </Pressable>
    </PublicModal>
  );
};
export default choosePop;

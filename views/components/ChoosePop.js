import {
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Text,
  View,
} from 'react-native';

import Title from './Title';
import Button from './Button';

const styles = StyleSheet.create({
  modalView: {
    width: 301,
    height: 145,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#EEEEEE',
    padding: 20,
    backgroundColor: '#fff',
    marginHorizontal: 25,
  },
  modalTitle: {
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '400',
    color: 'black',
    marginTop: 13,
  },
  chooseContainer: {
    marginTop: 33,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
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

import PublicModal from './PublicModal';

const choosePop = ({
  //공통
  title,
  setTogleButton,
  setIsModalVisible,
  isModalVisible,
  choosePopVisible,
  setChoosePopVisible,
  //인터뷰
  interview,
  alert,
  checkDeletePopOkButton,
  setCheckDeletePopOkButton,
  setIsPlaying,
  setFilePath,
  changeData,
  setChangeData,
  setHeart,
  changeHeart,
  //포트폴리오
  portfolio,
  id,
  setDetailPopVisible,
  onModify,
  onDelete,
  setCheckChoosePopOkButton,
  addPressedIf,
}) => {
  //공통 컴포넌트 츄즈 팝 스테이트 구분 컴포넌트: 확인 클릭 시
  const onDeleteORonModify = () => {
    if (title === '수정된 내용을 삭제하시겠습니까?') {
      if (portfolio == true) {
        setCheckDeletePopOkButton(true);
      } else if (interview == true) {
        setCheckDeletePopOkButton(true);
        deleteUrl();
      }
    } else if (title === '수정된 내용을 저장하시겠습니까?') {
      if (portfolio == true) {
        setCheckChoosePopOkButton(true);
        if (checkDeletePopOkButton == true) {
          onDelete(id);
        } else if (checkDeletePopOkButton == false) {
          onModify(id); //개발 방식 검토중인 기능이므로 구현 미완료
        }
        setCheckDeletePopOkButton(false);
        setIsModalVisible(false);
      } else if (addPressedIf == true) {
        setDetailPopVisible(false);
        onModify(id); //개발 방식 검토중인 기능이므로 구현 미완료
      } else if (interview == true) {
        if (checkDeletePopOkButton == false) handleSave();
        setTogleButton(false);
        setIsModalVisible(false);
      }
    }
  };

  //인터뷰 세이브
  const handleSave = () => {
    if (checkDeletePopOkButton == true) {
      setChangeData(false);
    } else {
      //setTogleButton(true);
      setIsPlaying(true);
      setFilePath(changeData);
      setChangeData(); // 저장된 데이터 초기화
      // setSavePopVisible(false);
      setHeart(changeHeart);
    }
  };

  const handleCancel = () => {
    //setIsEditing(false);
  };
  // 인터뷰 딜리트
  // const [deleteImg, setDeleteImg] = useState(interviewImg);
  const deleteUrl = () => {
    setChangeData(false);
  };

  return (
    <PublicModal
      id={id}
      onDelete={portfolio == true ? onDelete : null}
      onModify={portfolio == true ? onModify : null}
      isModalVisible={choosePopVisible}
      setIsModalVisible={setChoosePopVisible}>
      <Pressable
        onPress={() => setChoosePopVisible(true)} // Pressable: Modal 영역 안 클릭 시 Modal 유지 구현을 위해 Pressable로 감싸서 적용
        style={styles.modalView}>
        <Text style={styles.modalTitle}>{title}</Text>
        <View style={styles.chooseContainer}>
          {alert ? null : (
            <TouchableOpacity
              style={styles.chooseBtn}
              onPress={() => {
                setChoosePopVisible(false); // chooseBtn: 모달 영역 안 (ChoosePopup YES or NO, props를 통해 {title} 설정(예:  title="삭제하시겠습니까?"))
                if (setCheckChoosePopOkButton == true)
                  setCheckChoosePopOkButton(false);
              }}>
              <Title>취소</Title>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={[styles.chooseBtn, styles.chooseOkBtn]}
            onPress={() => {
              if (portfolio == true) {
                if (setTogleButton == true) setTogleButton(false);
              }
              onDeleteORonModify();
              setChoosePopVisible(false);
            }}>
            <Title color={'white'}>확인</Title>
          </TouchableOpacity>
          {/*<Button background={'blue'}>확인</Button>//아직 스테이트 관리 방법 구현 미적용*/}
        </View>
      </Pressable>
    </PublicModal>
  );
};
export default choosePop;

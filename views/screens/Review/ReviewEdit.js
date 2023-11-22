import React, {useState} from 'react';
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Dimensions,
  View,
  Image,
} from 'react-native';
import axios from 'axios';

import ChoosePop from '../../components/commonComponent/ChoosePop';
import Title from '../../components/commonComponent/Title';
import cancelIcon from '../../../assets/images/cancelIcon.png';
import deletedIcon from '../../../assets/images/deletedIcon.png';
import saveIcon from '../../../assets/images/editIcon.png';
import editingIcon from '../../../assets/images/editingIcon.png';
import {log} from 'react-native-reanimated';

const styles = StyleSheet.create({
  modalBackdropPress: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalView: {
    alignItems: 'center',
    borderWidth: 2,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderColor: '#EEE',
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    display: 'flex',
    height: Dimensions.get('window').height / 12,
  },

  navBarView: {
    flexDirection: 'row',
  },
  image: {
    marginRight: 4,
  },
});

const EditMode = ({
  //공통 프롭스
  id,
  writer,
  reviewContent,
  isModalVisible,
  setIsModalVisible,
  //리뷰 프롭스
  review,
  onEdit,
  onCancel,
  onDelete,
  inputRef,
  currentReviewContent,
}) => {
  //공통 스테이트
  const [detailPopVisible, setDetailPopVisible] = useState(false);
  const [removeChoosePopVisible, setRemoveChoosePopVisible] = useState(false);
  const [saveChoosePopVisible, setSaveChoosePopVisible] = useState(false);
  const [togleButton, setTogleButton] = useState(false);
  const [checkDeletePopOkButton, setCheckDeletePopOkButton] = useState(false); //삭제 츄즈 팝업에서 확인을 눌렀는지 감지하여 네비바의 저장을 눌렀을 시 ChoosePop이 뜨도록 함
  const [checkChoosePopOkButton, setCheckChoosePopOkButton] = useState(false); //디테일 팝업에서 확인을 눌렀는지 감지하여 네비바의 저장을 눌렀을 시 ChoosePop이 뜨도록 함

  // EditMode Button onPress 용 Props 컴포넌트 start------------------------------------------------------------------------------------------------------------------------
  const editButton = () => {
    //수정 섹션을 클릭한 경우
    // onEdit();
    onEdit();
    console.log(reviewContent);
    // setTogleButton(false);
  };

  const saveButton = () => {
    //저장 섹션을 클릭한 경우
    // 리뷰 페이지에서 수정 후 저장 클릭 시
    if (review === true) {
      onEdit();
      setTogleButton(false);
    }
  };

  const deletedButton = async (reviewId, memberId) => {
    try {
      const response = await axios({
        method: 'delete',
        url: `http://10.0.2.2:3000/api/v1/review/${reviewId}`,
        data: {
          // DELETE 요청의 본문에 member_id를 포함 (이 방식은 API 설계에 따라 달라질 수 있음)
          member_id: memberId,
        },
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InNuc19pZCI6MTksIm1lbWJlcl9pZCI6NDUsInR5cGUiOiJnb29nbGUiLCJuYW1lIjoi6rmA6rG07JqwIiwiYWNjZXNzX3Rva2VuIjoieWEyOS5hMEFmQl9ieUE0bGo4Q3ppTThic0NMWXNLSjFwWUZBRG1UTU5kZnRrLW9ub28yWUVWMjF2T2JlU0RJRENHQ1FpVk5INVVETjlzWWNLREZWN1otNDRNZHZxR2FGUnpfemZNWlBabDNNaV9Vei1hMzJlYWNoOHhOWGJVZmFFNGYzUE9yUDMzZC15M1NTTXVLcEtqZ3Z6Z0Z3YkhGbU1KcXhlZWJSWDUtYUNnWUtBUlVTQVJBU0ZRR09jTm5DMlRKTDd1cGVMOWZGYlNlTkxRWjh5dzAxNzEiLCJyZWZyZXNoX3Rva2VuIjpudWxsLCJhdXRoX2NvZGUiOm51bGwsImNvbm5lY3RfZGF0ZSI6IjIwMjMtMTAtMDZUMDE6MzY6MTQuMDAwWiJ9LCJpYXQiOjE3MDA2NjExOTYsImV4cCI6MTcwMDY2NDc5Nn0.81ZmpGFeefqaXSWsPKCIMgC3UjuHC--RWXkCGiachCY',
        },
      });
      console.log('Delete response', response.data);
    } catch (error) {
      console.error('Error', error);
    }
  };

  const cancelButton = () => {
    onCancel();
    setTogleButton(false);
  };

  // EditMode Button onPress 용 Props 컴포넌트 end------------------------------------------------------------------------------------------------------------------------

  const EditModeSectionChooseBtn = ({title, source, onPress}) => {
    return (
      <TouchableOpacity style={styles.navBarView} onPress={onPress}>
        <View style={styles.navBarView}>
          <Image source={source} style={styles.image} />
          <Title color={'black'}>{title}</Title>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      animationType={'fade'}
      transparent={true}
      visible={isModalVisible}
      onRequestClose={() => {
        setIsModalVisible(!isModalVisible);
      }}>
      <TouchableOpacity
        onPress={() => {
          console.log('inputRef', inputRef.current);
          inputRef.current.focus();
        }} // modalBackdropPress: 모달 영역 밖 클릭 시 Bottom Nav(Modal) 닫힘 구현을 위해 TouchableOpacity로 modalView를 감싸서 적용
        style={styles.modalBackdropPress}>
        <Pressable
          onPress={() => {
            setIsModalVisible(true);
          }} // Pressable: 모달 영역 안 클릭 시 Bottom Nav(Modal) 유지 구현을 위해 Pressable로 감싸서 적용
          style={[styles.modalView, styles.shadow]}>
          {togleButton === false && (
            <EditModeSectionChooseBtn
              title={'수정'}
              source={editingIcon}
              onPress={() => {
                editButton();
                currentReviewContent(reviewContent);
              }}
            />
          )}
          {togleButton === true && (
            <EditModeSectionChooseBtn
              title={'저장'}
              source={saveIcon}
              onPress={() => {
                saveButton();
              }}
            />
          )}
          <EditModeSectionChooseBtn
            title={'삭제'}
            source={deletedIcon}
            onPress={() => {
              deletedButton(id, writer);
            }}
          />
          <EditModeSectionChooseBtn
            title={'취소'}
            source={cancelIcon}
            onPress={() => {
              cancelButton();
            }}
          />

          <ChoosePop
            //공통
            title="수정된 내용을 저장하시겠습니까?"
            setTogleButton={setTogleButton}
            checkDeletePopOkButton={checkDeletePopOkButton}
            setCheckDeletePopOkButton={setCheckDeletePopOkButton}
            setCheckChoosePopOkButton={setCheckChoosePopOkButton}
            setIsModalVisible={setIsModalVisible}
            choosePopVisible={saveChoosePopVisible}
            setChoosePopVisible={setSaveChoosePopVisible}
            //리뷰
            review={review}
            id={id}
            onModify={onEdit}
            onDelete={onDelete}
          />
          <ChoosePop
            //공통
            title="수정된 내용을 삭제하시겠습니까?"
            checkDeletePopOkButton={checkDeletePopOkButton}
            setCheckDeletePopOkButton={setCheckDeletePopOkButton}
            setIsModalVisible={setIsModalVisible}
            isModalVisible={isModalVisible}
            choosePopVisible={removeChoosePopVisible}
            setChoosePopVisible={setRemoveChoosePopVisible}
            //리뷰
            review={review}
            id={id}
          />
        </Pressable>
      </TouchableOpacity>
    </Modal>
  );
};
export default EditMode;

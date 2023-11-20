import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Pressable, Text, View } from 'react-native';
import { MyContext } from '../../../MyContext';
import PublicModal from './PublicModal';
import ChooseButton from './ChooseButton';

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
  chooseOkBtn: { backgroundColor: '#072AC8', borderWidth: 0, marginLeft: 10 },
});

const choosePop = ({
  //공통
  popTitle,
  setTogleButton,
  setIsModalVisible,
  isModalVisible,
  choosePopVisible,
  setChoosePopVisible,
  //인터뷰
  interview,
  handleSave,
  deleteUrl,
  alert,
  checkDeletePopOkButton,
  setCheckDeletePopOkButton,
  //포트폴리오
  portfolio,
  id,
  setDetailPopVisible,
  onModify,
  onDelete,
  setCheckChoosePopOkButton,
  addPressedIf,

  temporaryTitle,
  setTemporaryTitle,
  temporaryContent,
  setTemporaryContent,
}) => {
  const { title, setTitle } = useContext(MyContext);
  const { content, setContent } = useContext(MyContext);
  const { portfolioUrl, setPortfolioUrl } = useContext(MyContext);
  const { ext, setExt } = useContext(MyContext);

  const sendDataToServer = async () => {
    try {
      const response = await fetch('http://10.0.2.2:3000/api/v1/portfolio/', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im1lbWJlcl9pZCI6NDksImVtYWlsIjoibm5ubm5ubmlhbTFAZ21haWwuY29tIiwibmFtZSI6IuydkeyeiSIsInRlbCI6bnVsbCwiYmlydGgiOm51bGwsImZpbGVfaWQiOm51bGwsImRlbF95biI6Ik4iLCJyZWdfZGF0ZSI6IjIwMjMtMTEtMTVUMjM6NTY6MDkuMDAwWiIsIm1vZF9kYXR',
        },
        body: portfolioUrl,
      });

      // console.log('POST kind', id);
      console.log('POST url', portfolioUrl);
      //console.log('POST title', title);
      // console.log('POST description', content);
      //console.log('POST ext', ext);

      const data = await response.json();
      setPortfolioUrl('');
      console.log('서버 응답:', data);
    } catch (error) {
      setPortfolioUrl('');
      console.error('에러 발생:', error);
    }
  };

  const deleteData = async () => { };

  //공통 컴포넌트 츄즈 팝 스테이트 구분 컴포넌트: 확인 클릭 시
  const onDeleteORonModify = () => {
    if (popTitle === '수정된 내용을 삭제하시겠습니까?') {
      if (portfolio == true) {
        setCheckDeletePopOkButton(true);
      } else if (interview == true) {
        setCheckDeletePopOkButton(true);
        deleteUrl();
      }
      deleteData();
    } else if (popTitle === '수정된 내용을 저장하시겠습니까?') {
      if (portfolio == true) {
        setCheckChoosePopOkButton(true);
        if (checkDeletePopOkButton == true) {
          onDelete(id);
        } else if (checkDeletePopOkButton == false) {
          onModify(id); //개발 방식 검토중인 기능이므로 구현 미완료
        }
        setCheckDeletePopOkButton(false);
        setIsModalVisible(false);
        setTogleButton(false);
      } else if (addPressedIf == true) {
        setDetailPopVisible(false);
        onModify(id); //개발 방식 검토중인 기능이므로 구현 미완료
      } else if (interview == true) {
        if (checkDeletePopOkButton == false) handleSave();
        setTogleButton(false);
        setIsModalVisible(false);
      }
      sendDataToServer();
    }
  };

  // ChoosePop Button onPress 용 Props 컴포넌트 start------------------------------------------------------------------------------------------------------------------------
  const cancel = () => {
    setChoosePopVisible(false); // chooseBtn: 모달 영역 안 (ChoosePopup YES or NO, props를 통해 {title} 설정(예:  title="삭제하시겠습니까?"))
    if (setCheckChoosePopOkButton == true) setCheckChoosePopOkButton(false);
  };

  const check = () => {
    if (portfolio == true) {
      if (setTogleButton == true) setTogleButton(false);
    }
    setChoosePopVisible(false);

    onDeleteORonModify();
  };

  // ChoosePop Button onPress 용 Props 컴포넌트 end------------------------------------------------------------------------------------------------------------------------

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
        <Text style={styles.modalTitle}>{popTitle}</Text>
        <View style={styles.chooseContainer}>
          {alert ? null : (
            <ChooseButton
              onPress={() => {
                cancel();
              }}>
              취소
            </ChooseButton>
          )}
          <ChooseButton
            background={'blue'}
            onPress={() => {
              check();
            }}>
            확인
          </ChooseButton>
        </View>
      </Pressable>
    </PublicModal>
  );
};
export default choosePop;

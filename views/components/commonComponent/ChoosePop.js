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

  token,
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
  code,
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
      const response = await fetch('http://172.20.10.4:3000/api/v1/portfolio/', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InNuc19pZCI6MjMsIm1lbWJlcl9pZCI6NDksInR5cGUiOiJnb29nbGUiLCJuYW1lIjoi7J2R7J6JIiwiYWNjZXNzX3Rva2VuIjoieWEyOS5hMEFmQl9ieUFZOXJJMktuYzZjNnh2QW5sWGhqZjRFOFZOaEZRRXZQeS1oT2hzZDE1LVNka1lDSGZ0YVUxaXJXV1FsNGRSa3RXTnliM3BUX0FUNGtxU09VY0oycDV2ek5Cb0tSZnBsdHUyNE1GNE5vMkZaeTRDRWR4akRuRVJEdExfam5wQ2RPTXpERXRqQlZpdmd6RU84M3o0a3hoU0ZGQ2ZtaF92YUNnWUtBZjhTQVJJU0ZRSEdYMk1pRVpVS2xYYmRHY1Jyb09FZElnVDhYdzAxNzEiLCJyZWZyZXNoX3Rva2VuIjpudWxsLCJhdXRoX2NvZGUiOm51bGwsImNvbm5lY3RfZGF0ZSI6IjIwMjMtMTEtMTVUMjM6NTY6MDkuMDAwWiJ9LCJpYXQiOjE3MDE5NDUwNTIsImV4cCI6MTcwMTk0ODY1Mn0.TLV_SoHyLaaCWCbpdgZZnipR8AAeOb3ZEzyNzs_A8iw',
          body: portfolioUrl,
        }
      });

      // console.log('POST kind', id);
      console.log('POST url', portfolioUrl._parts);
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

  const editDataToServer = async () => {
    try {
      const response = await fetch(
        `http://172.20.10.4:3000/api/v1/portfolio/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InNuc19pZCI6MjMsIm1lbWJlcl9pZCI6NDksInR5cGUiOiJnb29nbGUiLCJuYW1lIjoi7J2R7J6JIiwiYWNjZXNzX3Rva2VuIjoieWEyOS5hMEFmQl9ieUFZOXJJMktuYzZjNnh2QW5sWGhqZjRFOFZOaEZRRXZQeS1oT2hzZDE1LVNka1lDSGZ0YVUxaXJXV1FsNGRSa3RXTnliM3BUX0FUNGtxU09VY0oycDV2ek5Cb0tSZnBsdHUyNE1GNE5vMkZaeTRDRWR4akRuRVJEdExfam5wQ2RPTXpERXRqQlZpdmd6RU84M3o0a3hoU0ZGQ2ZtaF92YUNnWUtBZjhTQVJJU0ZRSEdYMk1pRVpVS2xYYmRHY1Jyb09FZElnVDhYdzAxNzEiLCJyZWZyZXNoX3Rva2VuIjpudWxsLCJhdXRoX2NvZGUiOm51bGwsImNvbm5lY3RfZGF0ZSI6IjIwMjMtMTEtMTVUMjM6NTY6MDkuMDAwWiJ9LCJpYXQiOjE3MDE5NDUwNTIsImV4cCI6MTcwMTk0ODY1Mn0.TLV_SoHyLaaCWCbpdgZZnipR8AAeOb3ZEzyNzs_A8iw',
          },
          body: portfolioUrl,
        },
      );

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

  const deleteData = async () => {
    fetch(`http://172.20.10.4:3000/api/v1/portfolio/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InNuc19pZCI6MjMsIm1lbWJlcl9pZCI6NDksInR5cGUiOiJnb29nbGUiLCJuYW1lIjoi7J2R7J6JIiwiYWNjZXNzX3Rva2VuIjoieWEyOS5hMEFmQl9ieUFZOXJJMktuYzZjNnh2QW5sWGhqZjRFOFZOaEZRRXZQeS1oT2hzZDE1LVNka1lDSGZ0YVUxaXJXV1FsNGRSa3RXTnliM3BUX0FUNGtxU09VY0oycDV2ek5Cb0tSZnBsdHUyNE1GNE5vMkZaeTRDRWR4akRuRVJEdExfam5wQ2RPTXpERXRqQlZpdmd6RU84M3o0a3hoU0ZGQ2ZtaF92YUNnWUtBZjhTQVJJU0ZRSEdYMk1pRVpVS2xYYmRHY1Jyb09FZElnVDhYdzAxNzEiLCJyZWZyZXNoX3Rva2VuIjpudWxsLCJhdXRoX2NvZGUiOm51bGwsImNvbm5lY3RfZGF0ZSI6IjIwMjMtMTEtMTVUMjM6NTY6MDkuMDAwWiJ9LCJpYXQiOjE3MDE5NDUwNTIsImV4cCI6MTcwMTk0ODY1Mn0.TLV_SoHyLaaCWCbpdgZZnipR8AAeOb3ZEzyNzs_A8iw',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Data deleted successfully:', data);
        // 성공적으로 삭제됐을 때 실행할 코드
      })
      .catch(error => {
        console.error('Error deleting data:', error);
      });
  };

  //공통 컴포넌트 츄즈 팝 스테이트 구분 컴포넌트: 확인 클릭 시
  const onDeleteORonModify = () => {
    if (popTitle === '수정된 내용을 삭제하시겠습니까?') {
      if (portfolio == true) {
        setCheckDeletePopOkButton(true);
        console.log(id);
      } else if (interview == true) {
        setCheckDeletePopOkButton(true);
        deleteUrl();
      }
    } else if (popTitle === '수정된 내용을 저장하시겠습니까?') {
      if (portfolio == true) {
        setCheckChoosePopOkButton(true);
        if (checkDeletePopOkButton == true) {
          deleteData();
        } else if (checkDeletePopOkButton == false) {
          editDataToServer();
          console.log('임시 POST url', portfolioUrl._parts);
          console.log('임시 POST Title', title);
          console.log('임시 POST Content', content);
        }
        setCheckDeletePopOkButton(false);
        setIsModalVisible(false);
        setTogleButton(false);
      } else if (addPressedIf == true) {
        setDetailPopVisible(false);
        sendDataToServer();
      } else if (interview == true) {
        if (checkDeletePopOkButton == false) handleSave();
        setTogleButton(false);
        setIsModalVisible(false);
      }
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

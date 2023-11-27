import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet, Pressable, Text, View} from 'react-native';
import {MyContext} from '../../../MyContext';
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
  chooseOkBtn: {backgroundColor: '#072AC8', borderWidth: 0, marginLeft: 10},
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
  const {title, setTitle} = useContext(MyContext);
  const {content, setContent} = useContext(MyContext);
  const {portfolioUrl, setPortfolioUrl} = useContext(MyContext);
  const {ext, setExt} = useContext(MyContext);

  const sendDataToServer = async () => {
    try {
      const response = await fetch('http://10.0.2.2:3000/api/v1/portfolio/', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InNuc19pZCI6MjAsIm1lbWJlcl9pZCI6NDYsInR5cGUiOiJnb29nbGUiLCJuYW1lIjoi7Zi465Sx7J20IiwiYWNjZXNzX3Rva2VuIjoieWEyOS5hMEFmQl9ieUN5WG5uUWk5WF9sSGgwM0VERXlpRTNQMmZ3Q25IbGtkYmRIY2l4VGRzNTQtZDRKM285ckYzV2c2YnVGeEg3Yk9aLWxLQlNPNG1qUnpxd2Mzb2RMeF9nYmUzRmhYdElRQldyVEtldnItWS1BMTdxa0tfd2FGT1dfeV9JWjFpVncwRG9PcFZpa3JST0RMa3NqeGtuQWFHVDBfY0NUYUZSYUNnWUtBVFlTQVJNU0ZRR09jTm5DLWdONzNtNkdNQnpHeXA4S0o3b2x1ZzAxNzEiLCJyZWZyZXNoX3Rva2VuIjpudWxsLCJhdXRoX2NvZGUiOm51bGwsImNvbm5lY3RfZGF0ZSI6IjIwMjMtMTAtMDlUMDI6NDk6MjcuMDAwWiJ9LCJpYXQiOjE3MDEwNjUxNDQsImV4cCI6MTcwMTA2ODc0NH0.lt2uGF-WP3PPIdNFV9S3liEBAYqK_pV9Fd4zQHErgIs',
        },
        body: portfolioUrl,
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
        `http://10.0.2.2:3000/api/v1/portfolio/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InNuc19pZCI6MjAsIm1lbWJlcl9pZCI6NDYsInR5cGUiOiJnb29nbGUiLCJuYW1lIjoi7Zi465Sx7J20IiwiYWNjZXNzX3Rva2VuIjoieWEyOS5hMEFmQl9ieUN5WG5uUWk5WF9sSGgwM0VERXlpRTNQMmZ3Q25IbGtkYmRIY2l4VGRzNTQtZDRKM285ckYzV2c2YnVGeEg3Yk9aLWxLQlNPNG1qUnpxd2Mzb2RMeF9nYmUzRmhYdElRQldyVEtldnItWS1BMTdxa0tfd2FGT1dfeV9JWjFpVncwRG9PcFZpa3JST0RMa3NqeGtuQWFHVDBfY0NUYUZSYUNnWUtBVFlTQVJNU0ZRR09jTm5DLWdONzNtNkdNQnpHeXA4S0o3b2x1ZzAxNzEiLCJyZWZyZXNoX3Rva2VuIjpudWxsLCJhdXRoX2NvZGUiOm51bGwsImNvbm5lY3RfZGF0ZSI6IjIwMjMtMTAtMDlUMDI6NDk6MjcuMDAwWiJ9LCJpYXQiOjE3MDEwNjUxNDQsImV4cCI6MTcwMTA2ODc0NH0.lt2uGF-WP3PPIdNFV9S3liEBAYqK_pV9Fd4zQHErgIs',
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
    fetch(`http://10.0.2.2:3000/api/v1/portfolio/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InNuc19pZCI6MjAsIm1lbWJlcl9pZCI6NDYsInR5cGUiOiJnb29nbGUiLCJuYW1lIjoi7Zi465Sx7J20IiwiYWNjZXNzX3Rva2VuIjoieWEyOS5hMEFmQl9ieUN5WG5uUWk5WF9sSGgwM0VERXlpRTNQMmZ3Q25IbGtkYmRIY2l4VGRzNTQtZDRKM285ckYzV2c2YnVGeEg3Yk9aLWxLQlNPNG1qUnpxd2Mzb2RMeF9nYmUzRmhYdElRQldyVEtldnItWS1BMTdxa0tfd2FGT1dfeV9JWjFpVncwRG9PcFZpa3JST0RMa3NqeGtuQWFHVDBfY0NUYUZSYUNnWUtBVFlTQVJNU0ZRR09jTm5DLWdONzNtNkdNQnpHeXA4S0o3b2x1ZzAxNzEiLCJyZWZyZXNoX3Rva2VuIjpudWxsLCJhdXRoX2NvZGUiOm51bGwsImNvbm5lY3RfZGF0ZSI6IjIwMjMtMTAtMDlUMDI6NDk6MjcuMDAwWiJ9LCJpYXQiOjE3MDEwNjUxNDQsImV4cCI6MTcwMTA2ODc0NH0.lt2uGF-WP3PPIdNFV9S3liEBAYqK_pV9Fd4zQHErgIs',
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

import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet, Pressable, Text, View} from 'react-native';
import {MyContext} from '../../../MyContext';
import PublicModal from './PublicModal';
import ChooseButton from './ChooseButton';
import axios from 'axios';

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

  chooseData,
  setChooseData,

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
    console.log(portfolioUrl);
    const source = axios.CancelToken.source();
    try {
      axios({
        method: 'POST',
        url: 'https://api.writeyoume.com/api/v1/portfolio',
        headers: {
          Authorization: token
        },
        data : {
          title: "포폴",
          kind: 1,
          description: "contents",
          file_url: chooseData,
        },
        cancelToken: source.token
      })
        .then((response) => {
          console.log("성공")
          console.log(response);
        })
        .catch((e) => {
          console.log("실패");
          console.log(e);
        });
      return () => {
        source.cancel('API 호출이 취소되었습니다.');
      }

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
    portfolioUrl.append('title', title);
    portfolioUrl.append('description', content);
    portfolioUrl.append('kind', 1);
    console.log('수정', portfolioUrl);
    try {
      const response = await fetch(
        `https://api.writeyoume.com/api/v1/portfolio/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: token,
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
    const source = axios.CancleToken.source();
    axios({
      method: 'DELETE',
      url: `https://api.writeyoume.com/api/v1/portfolio/${id}`,
      headers: {
        Authorization: token,
      }
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
          console.log(' POST url', portfolioUrl._parts);
          console.log(' POST Title', title);
          console.log(' POST Content', content);
          //console.log('토큰', token);
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

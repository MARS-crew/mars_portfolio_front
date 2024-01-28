import React, {useState, useEffect, useContext, useCallback} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
  Image,
  Pressable,
} from 'react-native';
import axios from 'axios';

import InterviewAlert from '../../components/InterviewAlert';
const styles = StyleSheet.create({
  modalView: {
    width: 325,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#EEEEEE',
    padding: 20,
    backgroundColor: '#fff',
    marginHorizontal: 25,
  },
  contentView: {
    alignItems: 'center',
  },
  chooseContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    display: 'flex',
    marginBottom: 25,
  },
  chooseBtn: {
    width: 95,
    height: 26,
    borderColor: '#F5F5F5',
    borderBottomWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 5,
  },
  input: {
    borderColor: '#EEEEEE',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 12,
    paddingTop: 14,
    paddingBottom: 14,
    marginBottom: 12,
    width: 285,
    height: 45,
  },
  description: {
    height: 100,
    textAlignVertical: 'top',
  },

  pickBtn: {
    width: 132,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#EEEEEE',
    borderWidth: 1,
    borderRadius: 20,
  },
  chooseOkBtn: {backgroundColor: '#072AC8', borderWidth: 0, marginLeft: 22},
  inputRightMargin: {
    marginRight: 5,
    marginBottom: 0,
  },
  flexEnd: {
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  flexCenter: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 20,
    flexDirection: 'row',
  },
  PressedBtn: {borderBottomWidth: 2, borderColor: '#072AC8'},
  descriptionStyleForTitle: {
    height: 45,
    textAlignVertical: 'top',
  },
  descriptionStyleForDescription: {
    height: 100,
    textAlignVertical: 'top',
  },
});

import PublicModal from '../../components/commonComponent/PublicModal';
import DetailPopAttachment from './DetailPopAttachment';
import Title from '../../components/commonComponent/Title';
import SectionChooseBtn from '../../components/commonComponent/SectionChooseBtn';
import ChoosePop from '../../components/commonComponent/ChoosePop';
import ChooseButton from '../../components/commonComponent/ChooseButton';
import closeblack from '../../../assets/images/closeblack.png';
import {MyContext} from '../../../MyContext';
import {globalStyles} from 'react-native-floating-action-menu';
import {useIndexContext} from '../../../IndexContext';

const DetailPop = ({
  portfolio_id,
  portfolio,
  currentFileTitle,
  currentFileMessage,
  onModify,
  detailPopVisible,
  setDetailPopVisible,
  checkChoosePopOkButton,
  setCheckChoosePopOkButton,
  code,
  register,
  token,
  memberId,
}) => {
  const {selectedMemId} = useIndexContext();

  const [selectedButton, setSelectedButton] = useState(selectedValue());
  const [button1Pressed, setButton1Pressed] = useState(selected1Pressed());
  const [button2Pressed, setButton2Pressed] = useState(selected2Pressed());
  const [button3Pressed, setButton3Pressed] = useState(selected3Pressed());
  const [choosePopVisible, setChoosePopVisible] = useState(false);
  const [addPressedIf, SetAddPressedIf] = useState(true);
  // 포트폴리오 아이템에서 Add 버튼 클릭 시 등장하는 디테일 팝업 적용 후 확인을 눌렀는지 확인하는 스테이트
  const [selectKind, setSelectKind] = useState('1');
  const {title, setTitle} = useContext(MyContext); // 삭제 예정
  const {content, setContent} = useContext(MyContext); // 삭제 예정
  const {portfolioUrl, setPortfolioUrl} = useContext(MyContext); // 삭제 예정

  const [portfolioTitle, setPortfolioTitle] = useState(
    register ? '' : currentFileTitle,
  ); // todo 이후 수정을 위해 PortfolioItem에서 값 가져와야함
  const [portfolioDescription, setPortfolioDescription] = useState(
    register ? '' : currentFileMessage,
  ); // todo 이후 수정을 위해 PortfolioItem에서 값 가져와야함
  // const [portfolioFileUrl, setPortfolioFileUrl] = useState(null); // todo 이후 수정을 위해 PortfolioItem에서 값 가져와야함

  const [temporaryTitle, setTemporaryTitle] = useState(null);
  const [temporaryContent, setTemporaryContent] = useState(null);

  const [chooseData, setChooseData] = useState('');

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');

  console.log(`title ${currentFileTitle}, message: ${currentFileMessage}`);

  // const showAlert = () => {
  //   let t = '';
  //   if (title == '') {
  //     t = '제목을 입력해주세요.';
  //   } else if (content == '') {
  //     t = '내용을 입력해주세요.';
  //   } else {
  //     t = '파일을 입력해주세요.'
  //   }
  //   setAlertTitle(t);
  //   setAlertVisible(true);
  // }

  // useEffect(() => {
  //   console.log('file url is changed!!!!!!!!!!!!!!!!! : ', portfolioFileUrl);
  // }, [portfolioFileUrl]);

  const handleTitleChange = text => {
    setTemporaryTitle(text);
  };

  const handleContentChange = text => {
    setTemporaryContent(text);
  };

  function selectedValue() {
    if (code == 1) return 'Photo';
    else if (code == 2) return 'Video';
    else if (code == 3) return 'Link';
    else return 'Photo';
  } // id값을 통해 사진 수정 시 초기 selected 값을 사진으로 적용하여 각 종류에 맞는 DetailPopup이 열려있도록 구현

  function selected1Pressed() {
    if (code == 1) return true;
  } // id값을 통해 Photo나 나머지 블럭에서 DetailPopup을 실행한 경우 Photo 버튼의 초기 색상을 설정
  function selected2Pressed() {
    if (code == 2) return true;
  }
  function selected3Pressed() {
    if (code == 3) return true;
  } // id값을 통해 buttonPressed 1~3의 Pressed 값을 useState 초기값으로 설정(버튼의 초기 색상을 담당)

  const handleButtonPress = buttonName => {
    setSelectedButton(buttonName);
  }; // buttonName값을 통해 selectedButton의 Pressed 값을 useState 초기값으로 설정(버튼의 초기 토글을 담당)

  const handleButton1Press = () => {
    setButton1Pressed(true);
    setButton2Pressed(false);
    setButton3Pressed(false);
  };

  const handleButton2Press = () => {
    setButton1Pressed(false);
    setButton2Pressed(true);
    setButton3Pressed(false);
  };

  const handleButton3Press = () => {
    setButton1Pressed(false);
    setButton2Pressed(false);
    setButton3Pressed(true);
  }; // buttonPressed 1~3의 Pressed 여부로 나머지 버튼의 토글 여부를 결정

  // DetailPop Button onPress 용 Props 컴포넌트 start------------------------------------------------------------------------------------------------------------------------

  const DetailPopCheck = () => {
    // 디테일 팝 확인 버튼 클릭 시 발생

    setDetailPopVisible(false); // pickBtn: 모달 영역 안 (DetailPopup Register 등록)

    if (register !== true && setCheckChoosePopOkButton !== undefined) {
      setCheckChoosePopOkButton(true);
    }

    console.log(checkChoosePopOkButton);
  };
  // DetailPop Button onPress 용 Props 컴포넌트 end------------------------------------------------------------------------------------------------------------------------

  const DetailInput = ({description, placeholder, value, onChangeText}) => {
    // 디테일 팝 섹션(이미지, 영상, 링크)별 페이지 속 인풋 구성요소 공통 컴포넌트
    const descriptionStyle = {
      height: description == true ? 100 : 45,
      textAlignVertical: 'top',
    };
    return (
      <TextInput
        style={[styles.input, descriptionStyle]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#D8D8D8"
        autoCorrect={false}
        autoCompleteType="off"></TextInput>
    );
  };

  const postPortfolio = async (
    member_id,
    title,
    description,
    file_url,
    selectKind,
  ) => {
    const source = axios.CancelToken.source();
    try {
      axios({
        method: 'POST',
        url: `https://api.writeyoume.com/api/v1/portfolio`,
        headers: {
          Authorization: token,
        },
        data: {
          member_id: member_id,
          title: title,
          description: description,
          kind: selectKind,
          file_url: file_url,
        },
        cancelToken: source.token,
      })
        .then(response => {
          console.log('성공');
          console.log(response);
        })
        .catch(e => {
          console.log('실패');
          console.log(e);
        });
      return () => {
        source.cancel('API 호출이 취소되었습니다.');
      };
    } catch (error) {
      setPortfolioUrl('');
      console.error('에러 발생:', error);
    }
  };

  const editPortfolio = async (
    member_id,
    title,
    description,
    file_url,
    portfolio_id,
    selectKind,
  ) => {
    const source = axios.CancelToken.source();
    try {
      axios({
        method: 'PUT',
        url: `https://api.writeyoume.com/api/v1/portfolio/${portfolio_id}`,
        headers: {
          Authorization: token,
        },
        data: {
          member_id: member_id,
          title: title,
          description: description,
          kind: selectKind,
          file_url: file_url,
        },
        cancelToken: source.token,
      })
        .then(response => {
          console.log('성공');
          console.log(response);
        })
        .catch(e => {
          console.log('실패');
          console.log(e);
        });
      return () => {
        source.cancel('API 호출이 취소되었습니다.');
      };
    } catch (error) {
      setPortfolioUrl('');
      console.error('에러 발생:', error);
    }
  };

  return (
    <PublicModal
      onModify={onModify}
      isModalVisible={detailPopVisible}
      setIsModalVisible={setDetailPopVisible}
      // setTemporaryTitle={setTemporaryTitle}
      // setTemporaryContent={setTemporaryContent}
    >
      <Pressable
        onPress={() => {
          setDetailPopVisible(true);
        }} // Pressable: Modal 영역 안 클릭 시 Modal 유지 구현을 위해 Pressable로 감싸서 적용
        style={styles.modalView}>
        <View style={styles.flexEnd}>
          <TouchableOpacity
            onPress={() => {
              setDetailPopVisible(false); // pickBtn: 모달 영역 안 (DetailPopup X 닫기)
            }}>
            <Image source={closeblack}></Image>
          </TouchableOpacity>
        </View>
        <View style={styles.contentView}>
          <View style={styles.chooseContainer}>
            <SectionChooseBtn
              title={'이미지'}
              buttonPressed={button1Pressed}
              onPress={() => [
                setSelectKind('1'),
                handleButtonPress('Photo'),
                handleButton1Press(),
              ]}></SectionChooseBtn>
            <SectionChooseBtn
              title={'영상'}
              buttonPressed={button2Pressed}
              onPress={() => [
                setSelectKind('2'),

                handleButtonPress('Video'),
                handleButton2Press(),
              ]}></SectionChooseBtn>
            <SectionChooseBtn
              title={'링크'}
              buttonPressed={button3Pressed}
              onPress={() => [
                setSelectKind('3'),

                handleButtonPress('Link'),
                handleButton3Press(),
              ]}></SectionChooseBtn>
          </View>
          {selectedButton !== 'Link' && (
            <View style={styles.TextInputContainer}>
              {selectedButton === 'Photo' && (
                <DetailPopAttachment
                  code={1}
                  setChooseData={setChooseData}></DetailPopAttachment>
              )}
              {selectedButton === 'Video' && (
                <DetailPopAttachment
                  code={2}
                  setChooseData={setChooseData}></DetailPopAttachment>
              )}

              {/* <DetailInput
                value={temporaryTitle}
                onChangeText={handleTitleChange}
                placeholder="제목"></DetailInput>
              <DetailInput
                value={temporaryContent}
                onChangeText={handleContentChange}
                placeholder="내용"
                description={true}></DetailInput> */}

              <TextInput
                style={[styles.input, styles.descriptionStyleForTitle]}
                value={portfolioTitle === null ? '' : portfolioTitle}
                onChangeText={text => setPortfolioTitle(text)}
                placeholder={'제목'}
                placeholderTextColor="#D8D8D8"></TextInput>
              <TextInput
                style={[styles.input, styles.descriptionStyleForDescription]}
                value={portfolioDescription}
                onChangeText={text => setPortfolioDescription(text)}
                multiline={true}
                placeholder={'내용'}
                placeholderTextColor="#D8D8D8"></TextInput>
            </View>
          )}

          {selectedButton === 'Link' && (
            <View style={styles.TextInputContainer}>
              <DetailPopAttachment
                code={3}
                setChooseData={setChooseData}></DetailPopAttachment>
              {/* <DetailInput
                value={temporaryContent}
                onChangeText={handleContentChange}
                placeholder="링크"></DetailInput> */}
              <TextInput
                style={[styles.input, styles.descriptionStyleForTitle]}
                value={portfolioTitle}
                onChangeText={text => setPortfolioTitle(text)}
                placeholder={'링크'}
                placeholderTextColor="#D8D8D8"></TextInput>
            </View>
          )}

          <View style={styles.flexCenter}>
            <ChooseButton
              size="M"
              onPress={() => {
                setDetailPopVisible(false); // pickBtn: 모달 영역 안 (DetailPopup Register 등록)
                setChoosePopVisible(false);
              }}>
              취소
            </ChooseButton>
            <ChooseButton
              size="M"
              background={'blue'}
              onPress={() => {
                if (
                  (title == null) |
                  (content == null) |
                  (chooseData == null)
                ) {
                  // showAlert();
                } else {
                  // register ? setChoosePopVisible(true) : DetailPopCheck();
                  // setTitle(temporaryTitle);
                  // setContent(temporaryContent);
                  console.log(`register: ${register}`);
                  console.log('id', selectedMemId);
                  console.log('title', portfolioTitle);
                  console.log('description', portfolioDescription);
                  console.log(chooseData);

                  // todo 여기서 등록 및 수정
                  register
                    ? postPortfolio(
                        selectedMemId,
                        portfolioTitle,
                        portfolioDescription,
                        chooseData,
                        selectKind,
                      )
                    : editPortfolio(
                        selectedMemId,
                        portfolioTitle,
                        portfolioDescription,
                        chooseData,
                        portfolio_id,
                        selectKind,
                      );
                }
                //setTemporaryTitle('');
                //setTemporaryContent('');
              }}>
              확인
            </ChooseButton>
          </View>
        </View>
      </Pressable>

      {/* <ChoosePop
        temporaryTitle={temporaryTitle}
        setTemporaryTitle={setTemporaryTitle}
        temporaryContent={temporaryContent}
        setTemporaryContent={setTemporaryContent}
        code={code}
        popTitle="수정된 내용을 저장하시겠습니까?"
        onModify={onModify}
        portfolio={portfolio}
        addPressedIf={addPressedIf}
        choosePopVisible={choosePopVisible}
        setChoosePopVisible={setChoosePopVisible}
        setDetailPopVisible={setDetailPopVisible}
        chooseData={chooseData}
        setChooseData={setChooseData}
        token={token}
      /> */}

      <InterviewAlert
        title={alertTitle}
        alertVisible={alertVisible}
        setAlertVisible={setAlertVisible}
      />
    </PublicModal>
  );
};
export default DetailPop;

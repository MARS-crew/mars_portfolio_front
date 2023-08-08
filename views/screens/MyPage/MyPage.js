import React, {useState} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {Shadow} from 'react-native-shadow-2';
import ContentsViewPop from '../../components/commonComponent/ContentsViewPop';
import SectionChooseBtn from '../../components/commonComponent/SectionChooseBtn';
import Title from '../../components/commonComponent/Title';
import LogList from './LogList';

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#F5F4F9',
    paddingHorizontal: 20,
    alignItems: 'center',
  },

  visitContainer: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderColor: '#F5F5F5',
    borderWidth: 1,
    padding: 15,
  },
  visitSubContainer: {alignItems: 'center', flex: 1},
  visitSubCenterLine: {
    borderRightColor: '#EEEEEE',
    borderRightWidth: 1,
    height: 48,
  },

  contentView: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderColor: '#F5F5F5',
    borderWidth: 1,
  },
  chooseContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    display: 'flex',
    paddingTop: 15,
  },
  arrangement: {
    marginTop: 25,
  },

  visitLogView: {
    height: Dimensions.get('window').height * 0.72,
    alignItems: 'center',
    flexDirection: 'row',
    display: 'flex',
    marginVertical: 12,
  },
  DeleteButton: {
    backgroundColor: '#FFE9EA',
    width: 84,
    height: 41,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const MyPage = () => {
  const [myPage, setMyPage] = useState(true);
  const [button1Pressed, setButton1Pressed] = useState(true);
  const [button2Pressed, setButton2Pressed] = useState(false);
  const [button3Pressed, setButton3Pressed] = useState(false);
  const [contentsViewPopVisible, setContentsViewPopVisible] = useState(false);
  const shadowColor = 'rgba(151, 151, 151, 0.36)';

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

  const ListViewData = () => {
    var data = '2023.11.';
    const LIST_VIEW_DATA = Array(30)
      .fill('')
      .map((_, i) => ({
        key: `${i}`,
        text: `김채린님이 회원님을 방문하였습니다.`,
        date: `${data}${i + 1}`,
      }));

    return LIST_VIEW_DATA;
  };

  const ListLikeData = () => {
    const LIST_LIKE_DATA = Array(8)
      .fill('')
      .map((_, i) => ({
        key: `${i}`,
        text: `조호연님이 회원님의 리뷰에 좋아요를 눌렀습니다.`,
        date: '',
      }));

    return LIST_LIKE_DATA;
  };

  const ListWantData = () => {
    const LIST_WANT_DATA = Array(20)
      .fill('')
      .map((_, i) => ({
        key: `${i}`,
        text: `김건우님이 회원님의 인터뷰 영상을 찜하였습니다.`,
        date: '',
      }));

    return LIST_WANT_DATA;
  };

  const VisitSubContainer = ({title, value}) => {
    return (
      <View style={styles.visitSubContainer}>
        <Title color={'black'} fontSize={16} fontWeight={'700'}>
          {title}
        </Title>
        <Title color={'black'} fontSize={16} fontWeight={'400'}>
          {value}
        </Title>
      </View>
    );
  };

  return (
    <View style={styles.Container}>
      <Shadow
        style={styles.arrangement}
        distance="12"
        startColor={shadowColor}
        offset={[1, 25]}>
        <View style={styles.visitContainer}>
          <VisitSubContainer
            title="오늘 방문자 수"
            value="10"></VisitSubContainer>
          <View style={styles.visitSubCenterLine} />
          <VisitSubContainer
            title="누적 방문자 수"
            value="300"></VisitSubContainer>
        </View>
      </Shadow>

      <Shadow
        style={styles.arrangement}
        distance="12"
        startColor={shadowColor}
        offset={[1, 25]}>
        <View style={styles.contentView}>
          <View style={styles.chooseContainer}>
            <SectionChooseBtn
              title={'방문기록'}
              buttonPressed={button1Pressed}
              onPress={() => [handleButton1Press()]}></SectionChooseBtn>
            <SectionChooseBtn
              title={'좋아요'}
              buttonPressed={button2Pressed}
              onPress={() => [handleButton2Press()]}></SectionChooseBtn>
            <SectionChooseBtn
              title={'찜하기'}
              buttonPressed={button3Pressed}
              onPress={() => [handleButton3Press()]}></SectionChooseBtn>
          </View>

          {button1Pressed && (
            <View style={styles.visitLogView}>
              <LogList ListData={ListViewData()}></LogList>
            </View>
          )}
          {button2Pressed && (
            <View style={styles.visitLogView}>
              <LogList ListData={ListLikeData()}></LogList>
            </View>
          )}
          {button3Pressed && (
            <View style={styles.visitLogView}>
              <LogList ListData={ListWantData()}></LogList>
            </View>
          )}
        </View>

        {/*
        <View style={styles.flexCenter}>
          <ChooseButton
            size="M"
            onPress={() => {
              setDetailPopVisible(false); // pickBtn: 모달 영역 안 (DetailPopup Register 등록)
            }}>
            취소
          </ChooseButton>
          <ChooseButton
            size="M"
            background={'blue'}
            onPress={() => {
              DetailPopCheck();
            }}>
            확인
          </ChooseButton>
        </View>
        */}
      </Shadow>

      {/* 
      <View style={styles.logContainer1}>
        <View style={styles.logContainer2}>
          <TouchableOpacity style={styles.btn1}>
            <Text>방문기록</Text>
            <View style={styles.btnLine} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn}>
            <Text>좋아요</Text>
            <View style={styles.btnLine} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setContentsViewPopVisible(!contentsViewPopVisible)}
            style={styles.btn}>
            <Text>찜하기</Text>
            <View style={styles.btnLine} />
          </TouchableOpacity>
        </View>
        <View style={styles.logContainer3}>
          <Text>jeaHYeopLee님 2020-03-22 15:33:33</Text>
          <Text>jeaHYeopLee님 2020-03-22 15:33:33</Text>
          <Text>jeaHYeopLee님 2020-03-22 15:33:33</Text>
          <Text>jeaHYeopLee님 2020-03-22 15:33:33</Text>
          <Text>jeaHYeopLee님 2020-03-22 15:33:33</Text>
          <Text>jeaHYeopLee님 2020-03-22 15:33:33</Text>
          <Text>jeaHYeopLee님 2020-03-22 15:33:33</Text>
          <Text>jeaHYeopLee님 2020-03-22 15:33:33</Text>
          <Text>jeaHYeopLee님 2020-03-22 15:33:33</Text>
        </View>
      </View>
*/}

      <ContentsViewPop
        myPage={myPage}
        contentsViewPopVisible={contentsViewPopVisible}
        setContentsViewPopVisible={setContentsViewPopVisible}></ContentsViewPop>
    </View>
  );
};

export default MyPage;

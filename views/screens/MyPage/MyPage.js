import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {Shadow} from 'react-native-shadow-2';
import ContentsViewPop from '../../components/commonComponent/ContentsViewPop';
import SectionChooseBtn from '../../components/commonComponent/SectionChooseBtn';
import Title from '../../components/commonComponent/Title';
import LogList from './LogList';

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height * 1,
    backgroundColor: '#F5F4F9',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  ListContainer: {
    flex: 1,
    alignItems: 'flex-start',
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
    paddingTop: 15,
  },
  arrangement: {
    marginTop: 25,
  },

  visitLogView: {
    height: Dimensions.get('window').height * 0.75,
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 10,
  },

  swipeListItem: {
    width: Dimensions.get('window').height * 1,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderBottomColor: '#F5F5F5',
    borderBottomWidth: 1,
    borderRadius: 10,
    backgroundColor: '#FDFDFD',
  },
});

const MyPage = () => {
  const [myPage, setMyPage] = useState(true);
  const [button1Pressed, setButton1Pressed] = useState(true);
  const [button2Pressed, setButton2Pressed] = useState(false);
  const [button3Pressed, setButton3Pressed] = useState(false);
  const [contentsViewPopVisible, setContentsViewPopVisible] = useState(false);
  const [hiddenItem, setHiddenItem] = useState(true);
  const shadowColor = 'rgba(151, 151, 151, 0.36)';

  const handleButton1Press = () => {
    setButton1Pressed(true);
    setButton2Pressed(false);
    setButton3Pressed(false);
    setHiddenItem(true);
  };

  const handleButton2Press = () => {
    setButton1Pressed(false);
    setButton2Pressed(true);
    setButton3Pressed(false);
    setHiddenItem(false);
  };

  const handleButton3Press = () => {
    setButton1Pressed(false);
    setButton2Pressed(false);
    setButton3Pressed(true);
    setHiddenItem(false);
  }; // buttonPressed 1~3의 Pressed 여부로 나머지 버튼의 토글 여부를 결정

  const ListViewData = () => {
    // var data = '2023.11.';
    // const LIST_VIEW_DATA = Array(30)
    //   .fill('')
    //   .map((_, i) => ({
    //     key: `${i}`,
    //     text: `김채린님이 회원님을 방문하였습니다.`,
    //     date: `${data}${i + 1}`,
    //   }));

    const LIST_VIEW_DATA = [
      {
        key: `1`,
        text: `이세진님이 회원님을 방문하였습니다.`,
        date: `2023.11.01`,
      },
      {
        key: `2`,
        text: `고희주님이 회원님을 방문하였습니다.`,
        date: `2023.11.02`,
      },
      {
        key: `3`,
        text: `이화진님이 회원님을 방문하였습니다.`,
        date: `2023.11.03`,
      },
      {
        key: `4`,
        text: `임동현님이 회원님을 방문하였습니다.`,
        date: `2023.11.04`,
      },
      {
        key: `5`,
        text: `이가인님이 회원님을 방문하였습니다.`,
        date: `2023.11.05`,
      },
      {
        key: `6`,
        text: `김건우님이 회원님을 방문하였습니다.`,
        date: `2023.11.06`,
      },
      {
        key: `7`,
        text: `장여운님이 회원님을 방문하였습니다.`,
        date: `2023.11.07`,
      },
      {
        key: `8`,
        text: `김채린님이 회원님을 방문하였습니다.`,
        date: `2023.11.08`,
      },
      {
        key: `9`,
        text: `이화진님이 회원님을 방문하였습니다.`,
        date: `2023.11.09`,
      },
      {
        key: `10`,
        text: `조호연님이 회원님을 방문하였습니다.`,
        date: `2023.11.10`,
      },
      {
        key: `11`,
        text: `벡예나님이 회원님을 방문하였습니다.`,
        date: `2023.11.11`,
      },
      {
        key: `12`,
        text: `문효찬님이 회원님을 방문하였습니다.`,
        date: `2023.11.12`,
      },
      {
        key: `13`,
        text: `박수민님이 회원님을 방문하였습니다.`,
        date: `2023.11.13`,
      },
      {
        key: `14`,
        text: `김인후님이 회원님을 방문하였습니다.`,
        date: `2023.11.14`,
      },
      {
        key: `15`,
        text: `김주만님이 회원님을 방문하였습니다.`,
        date: `2023.11.15`,
      },
      {
        key: `16`,
        text: `김회윤님이 회원님을 방문하였습니다.`,
        date: `2023.11.16`,
      },
    ];
    return LIST_VIEW_DATA;
  };

  const ListLikeData = () => {
    // const LIST_LIKE_DATA = Array(8)
    //   .fill('')
    //   .map((_, i) => ({
    //     key: `${i}`,
    //     text: `김건우님이 회원님의 리뷰에 좋아요를 눌렀습니다.`,
    //     date: '',
    //     id: 2,
    //   }));

    const LIST_LIKE_DATA = [
      {
        key: 1,
        text: `김건우님이 회원님의 리뷰에 좋아요를 눌렀습니다.`,
        date: '',
        id: 2,
      },
      {
        key: 2,
        text: `장여운님이 회원님의 리뷰에 좋아요를 눌렀습니다.`,
        date: '',
        id: 2,
      },
      {
        key: 3,
        text: `김채린님이 회원님의 리뷰에 좋아요를 눌렀습니다.`,
        date: '',
        id: 2,
      },
      {
        key: 4,
        text: `임동현님이 회원님의 리뷰에 좋아요를 눌렀습니다.`,
        date: '',
        id: 2,
      },
    ];
    return LIST_LIKE_DATA;
  };

  const ListWantData = () => {
    // const LIST_WANT_DATA = Array(20)
    //   .fill('')
    //   .map((_, i) => ({
    //     key: `${i}`,
    //     text: `조호연님이 회원님의 인터뷰 영상을 찜하였습니다.`,
    //     date: '',
    //     id: 3,
    //   }));
    const LIST_WANT_DATA = [
      {
        key: 1,
        text: `조호연님이 회원님의 인터뷰 영상을 찜하였습니다.`,
        date: '',
        id: 3,
      },
      {
        key: 2,
        text: `김건우님이 회원님의 인터뷰 영상을 찜하였습니다.`,
        date: '',
        id: 3,
      },
      {
        key: 3,
        text: `이화진님이 회원님의 인터뷰 영상을 찜하였습니다.`,
        date: '',
        id: 3,
      },
      {
        key: 4,
        text: `김채린님이 회원님의 인터뷰 영상을 찜하였습니다.`,
        date: '',
        id: 3,
      },
      {
        key: 5,
        text: `김예린님이 회원님의 인터뷰 영상을 찜하였습니다.`,
        date: '',
        id: 3,
      },
      {
        key: 6,
        text: `임동현님이 회원님의 인터뷰 영상을 찜하였습니다.`,
        date: '',
        id: 3,
      },
      {
        key: 7,
        text: `이세진님이 회원님의 인터뷰 영상을 찜하였습니다.`,
        date: '',
        id: 3,
      },
      {
        key: 8,
        text: `장여운님이 회원님의 인터뷰 영상을 찜하였습니다.`,
        date: '',
        id: 3,
      },
    ];
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

  const LikeWantList = ListData => {
    return (
      <SafeAreaView style={styles.ListContainer}>
        <View>
          <FlatList
            data={ListData.ListData}
            renderItem={({item}) => (
              <TouchableOpacity
                activeOpacity={item.id == 2 ? 0.2 : 1}
                onPress={() =>
                  item.id == 2
                    ? setContentsViewPopVisible(!contentsViewPopVisible)
                    : null
                }
                style={styles.swipeListItem}>
                <Title color={'black'}>{item.text}</Title>
              </TouchableOpacity>
            )}
            keyExtractor={(item, key) => key}
          />
        </View>
      </SafeAreaView>
    );
  };

  return (
    <View style={styles.container}>
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
              <LikeWantList
                ListData={ListLikeData()}
                modalOpen={contentsViewPopVisible}
                setModalOpen={setContentsViewPopVisible}></LikeWantList>
            </View>
          )}
          {button3Pressed && (
            <View style={styles.visitLogView}>
              <LikeWantList ListData={ListWantData()}></LikeWantList>
            </View>
          )}
        </View>
      </Shadow>

      <ContentsViewPop
        myPage={myPage}
        title={'조호연'}
        message={`안녕하세요 저는 조호연입니다.👋
올려주신 이력서와 포트폴리오는 흥미롭게 보았습니다.\n
하지만 수상내역 부분이 조금 부족한 듯 보여집니다.
고로 해당 내용을 더 채워넣으시면 좋겠다는 생각이 들어 리뷰를 남기게 되었습니다.🌱\n
궁금하신 사항은 akftjd100@naver.com 으로 문의주세요.📫`}
        contentsViewPopVisible={contentsViewPopVisible}
        setContentsViewPopVisible={setContentsViewPopVisible}></ContentsViewPop>
    </View>
  );
};

export default MyPage;

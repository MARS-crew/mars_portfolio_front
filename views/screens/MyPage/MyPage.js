import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Text,
} from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import ContentsViewPop from '../../components/commonComponent/ContentsViewPop';
import SectionChooseBtn from '../../components/commonComponent/SectionChooseBtn';
import Title from '../../components/commonComponent/Title';
import LogList from './LogList';
import axios from 'axios';
import { log } from 'react-native-reanimated';

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
  visitSubContainer: { alignItems: 'center', flex: 1 },
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
  item: { paddingVertical: 12, paddingHorizontal: 15 },
  log: {
    paddingHorizontal: 15,
  },
  list: {
    height: 41,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#F5F5F5',
    borderBottomWidth: 1,
    backgroundColor: '#FDFDFD',
  },
  flatListContainer: {
    flex: 1,
  },
});

const MyPage = ({ token }) => {
  const [myPage, setMyPage] = useState(true);
  const [data, setData] = useState([]);
  let jsonArray = [];
  let formattedDate = [];
  const [logData, setLogData] = useState([]);
  const [heartData, setHeartData] = useState([]);
  const [reviewData, setReviewData] = useState([]);

  const [button1Pressed, setButton1Pressed] = useState(true);
  const [button2Pressed, setButton2Pressed] = useState(false);
  const [button3Pressed, setButton3Pressed] = useState(false);
  const [contentsViewPopVisible, setContentsViewPopVisible] = useState(false);
  const [hiddenItem, setHiddenItem] = useState(true);
  const shadowColor = 'rgba(151, 151, 151, 0.36)';

  useEffect(() => {
    const source = axios.CancelToken.source();
    axios({
      method: 'get',
      url: 'http://10.0.2.2:3000/api/v1/mypage/1/',

      headers: {
        Authorization: token
      },
      cancelToken: source.token,
    })
      .then(function (response) {
        const extractedData = {
          Reviewlike: response.data.data.Reviewlike,
          heart: response.data.data.heart,
          log_today: response.data.data.todayCount,
          log_total: response.data.data.totalCount,

          visitLog: response.data.data.visitLog,
        };
        setData(extractedData);

        jsonArray = JSON.parse(extractedData.visitLog);
        setLogData(jsonArray);
        jsonArray = [extractedData.heart.replace(/"/g, '')];
        setHeartData(jsonArray);
        jsonArray = JSON.parse(extractedData.Reviewlike);
        setReviewData(jsonArray);
        if (Array.isArray(reviewData)) {
          console.log(' 배열입니다.');
        } else {
          console.log('배열이 아닙니다.');
        }
        if (typeof reviewData === 'string') {
          console.log('data.visitLog는 문자열입니다.');
        } else if (Array.isArray(data.visitLog)) {
          console.log('data.visitLog는 배열입니다.');
        } else {
          console.log('data.visitLog의 타입을 확인할 수 없습니다.');
        }

        console.log('jsonArray 개수:', data.Reviewlike);
        console.log('jsonArray 개수:', data.Reviewlike);
        //formattedDate = jsonArray.reg_date.slice(0, 10);

        //console.log('데이터', data.visitLog);
        //console.log(response.data);
        //console.log(extractedData.visitLog);
        //console.log(extractedData.visitLog.reg_date);
        //console.log(extractedData.visitLog.name);
        //console.log(extractedData.reg_date);
      })
      .catch(function (error) {
        console.log(error);
      });

    return () => {
      isMounted = false;
      source.cancel('API 호출이 취소되었습니다.');
    };
  }, []);

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

  const toggleDelete = key => {
    setData(prevData =>
      prevData.map(item =>
        item.key === key ? { ...item, showDelete: !item.showDelete } : item,
      ),
    );
  };

  // const ListLikeData = () => {
  //   const LIST_LIKE_DATA = [
  //     {
  //       key: 1,
  //       text: `김건우님이 회원님의 리뷰에 좋아요를 눌렀습니다.`,
  //       date: '',
  //       id: 2,
  //     },
  //     {
  //       key: 2,
  //       text: `장여운님이 회원님의 리뷰에 좋아요를 눌렀습니다.`,
  //       date: '',
  //       id: 2,
  //     },
  //     {
  //       key: 3,
  //       text: `김채린님이 회원님의 리뷰에 좋아요를 눌렀습니다.`,
  //       date: '',
  //       id: 2,
  //     },
  //     {
  //       key: 4,
  //       text: `임동현님이 회원님의 리뷰에 좋아요를 눌렀습니다.`,
  //       date: '',
  //       id: 2,
  //     },
  //   ];
  //   return LIST_LIKE_DATA;
  // };

  const ListWantData = () => {
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

  const VisitSubContainer = ({ title, value }) => {
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

  const LikeWantList = (ListData, Like) => {
    return (
      <SafeAreaView style={styles.ListContainer}>
        <View>
          <FlatList
            data={ListData.ListData}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  button2Pressed == true
                    ? setContentsViewPopVisible(!contentsViewPopVisible)
                    : null
                }
                style={styles.swipeListItem}>
                {button2Pressed == true ? (
                  <Title color={'black'}>
                    {item}님이 회원님의 리뷰에 좋아요를 눌렀습니다.
                  </Title>
                ) : (
                  <Title color={'black'}>
                    {item}님이 회원님의 인터뷰 영상을 찜하였습니다.
                  </Title>
                )}
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
            value={data.log_today}></VisitSubContainer>
          <View style={styles.visitSubCenterLine} />
          <VisitSubContainer
            title="누적 방문자 수"
            value={data.log_total}></VisitSubContainer>
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
              <View style={styles.flatListContainer}>
                <FlatList
                  data={logData}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <View style={styles.list}>
                      <TouchableOpacity
                        style={styles.item}
                        onPress={() => [
                          //toggleDelete(1)
                        ]}>
                        <Title color={'black'}>
                          {item.name}님이 회원님을 방문하였습니다.
                        </Title>
                      </TouchableOpacity>
                      <View style={styles.log}>
                        {!item.showDelete && (
                          <Title>{item.reg_date.slice(0, 10)}</Title>
                        )}
                      </View>
                    </View>
                  )}
                />
                {/* {item.showDelete && (
                  <TouchableOpacity
                    onPress={
                      () => ''
                      //toggleDelete(item.key)
                    }>
                    <View style={styles.deleteButton}>
                      <Title color={'#FF3040'} fontSize={16} fontWeight={'700'}>
                        삭제
                      </Title>
                    </View>
                  </TouchableOpacity>
                )} */}
              </View>
            </View>
          )}
          {button2Pressed && (
            <View style={styles.visitLogView}>
              <LikeWantList
                ListData={heartData}
                Like={true}
                modalOpen={contentsViewPopVisible}
                setModalOpen={setContentsViewPopVisible}></LikeWantList>
            </View>
          )}
          {button3Pressed && (
            <View style={styles.visitLogView}>
              <LikeWantList ListData={heartData} Like={false}></LikeWantList>
            </View>
          )}
        </View>
      </Shadow>

      <ContentsViewPop
        myPage={myPage}
        title={reviewData.name}
        message={reviewData.content}
        contentsViewPopVisible={contentsViewPopVisible}
        setContentsViewPopVisible={setContentsViewPopVisible}></ContentsViewPop>
    </View>
  );
};

export default MyPage;
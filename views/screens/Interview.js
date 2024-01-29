import React, { useState, useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import axios from 'axios';
import SwiperFlatList from 'react-native-swiper-flatlist';
import _ from 'lodash'; // lodash 라이브러리 사용
import InterviewContents from './InterviewContents'; // Interview 컴포넌트를 import
import { useIndexContext } from '../../IndexContext';
import { UserInfoProvider, useUserInfo } from '../../UserInfoContext';
import { useLoadingContext } from '../../LoadingContext';
import {getInterview} from "../../api/v1/interview";
import {getInterviewListSelector, setInterviewList} from "../../redux/slice/InterviewSlice";
import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "../../redux/RootReducer";
import {getGroupImgSelector} from "../../redux/slice/GroupImgSlice";
import {userTokenSelector} from "../../redux/slice/UserInfoSlice";

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
const yOffset = new Animated.Value(0);

const Interview = ({ token, idx }) => {
  const swiperRef = useRef(null);
  // const { token } = useUserInfo();
  const {
    currentIndex,
    changeIndex,
    horizontalIndex,
    changeHorizontalIndex,
    dataIndex,
    changeDataIndex,
    selectedGroupId,
    changeSelectedGroupId,
    selectedMemId,
    changeSelectedMemId,
    selectedMember,
    changeSelectedMember,
  } = useIndexContext();

  const { loading, changeLoading } = useLoadingContext();
  const [data, setData] = useState([]);
  const [prevSelectedGroupId, setPrevSelectedGroupId] = useState(selectedGroupId);
  const [prevSelectedMemId, setPrevSelectedMemId] = useState(selectedMemId);
  const [check, setCheck] = useState(!selectedMember);

  const dispatch = useDispatch()
  // const [token, setToken] = useState();

  const height = Dimensions.get('window').height;

  const _interviewList = useSelector(getInterviewListSelector);
  const [interviewList, setInterviewList] = useState(_interviewList);
  useEffect(() => {
    setInterviewList(_interviewList)
  }, [_interviewList]);


  // const userToken = useSelector(userTokenSelector);
  // useEffect(() => {
  //   setToken(userToken)
  // }, [userToken]);

  return (
    <SafeAreaView style={styles.container}>
      {(interviewList != null && interviewList.length > 0 ?
      <InterviewContents
          interviewId={interviewList[idx].interviewId}
          id={interviewList[idx].memberId}
          path={interviewList[idx].url}
          token={token}
      /> : null )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  scrollView: {
    flex: 1,
    flexDirection: 'column',
  },
  scrollPage: {
    width: SCREEN_WIDTH,
    padding: 0,
  },
  screen: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Interview;

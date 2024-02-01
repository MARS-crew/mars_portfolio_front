import React, { useState, useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Text,
  View, Image,
} from 'react-native';
// lodash 라이브러리 사용
import InterviewContents from './InterviewContents'; // Interview 컴포넌트를 import
import {
  getInterviewListSelector,
  getInterviewOneAsync,
  getInterviewOneSelector
} from "../../redux/slice/InterviewSlice";
import {useDispatch, useSelector} from "react-redux";
import _ from "lodash";
import {
  getCurrentGroupIdSelector,
  getCurrentMemberIdSelector,
  getScreenTypeSelector, setCurrentMemberIdRx,
  setIsNoChangeGroupIdRx, setScreenTypeRx
} from "../../redux/slice/UiRenderSlice";
import {SCREEN_1, SCREEN_3} from "../../AppConst";

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
const yOffset = new Animated.Value(0);

const Interview = ({ token, idx, id }) => {
  const dispatch = useDispatch()

  const _screenType = useSelector(getScreenTypeSelector);
  const _currentGroupId = useSelector(getCurrentGroupIdSelector);
  const _interviewList = useSelector(getInterviewListSelector);
  // const _interviewOne = useSelector(getInterviewOneSelector);
  const _memberId = useSelector(getCurrentMemberIdSelector);
  // const [interviewList, setInterviewList] = useState(_interviewList);
  const [interviewOne, setInterviewOne] = useState(null);


  useEffect(() => {
    if(_interviewList != null && _interviewList.length > 0) {
      console.log(`InterviewContents`)
      const sortedAndGroupedData = _.chain(_interviewList)
          .sortBy('memberId')
          .groupBy('groupId')
          .values()
          .value();

      console.log(`interview load`);

      // try{
      //   const viewData = sortedAndGroupedData[0][_currentGroupId]
      //       .filter((item)=>(item.memberId===_memberId))[0]
      //   if(typeof(viewData) == 'undefined' || viewData == null){
      //     throw 'NO_MEMBER_ID'
      //   }
      //   setInterviewOne(viewData)
      // }catch (e) {
      //
      // }


      if (typeof (_memberId) == 'undefined' || _memberId == null) {
        const viewData = sortedAndGroupedData[0][_currentGroupId][0];
        setInterviewOne(viewData) // 첫번째꺼
        dispatch(setCurrentMemberIdRx(viewData.memberId))
      } else {
        const viewData = sortedAndGroupedData[0][_currentGroupId]
            .filter((item)=>(item.memberId===_memberId))[0]
        setInterviewOne(viewData)
      }
    }

  }, [_interviewList, _currentGroupId, _screenType, _memberId]);

  return (
      <>
        {(interviewOne != null ? <InterviewContents
            interviewId={interviewOne.interviewId}
            id={interviewOne.memberId}
            path={interviewOne.url}
            token={token}
        /> : <Image
                source={require('../../assets/images/Rectangle.png')}
                style={{width: '100%', height: '100%'}}
                resizeMode="cover"
            />
        )}
      </>
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

import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  TextInput,
  Dimensions, Image,
} from 'react-native';
import axios from 'axios';
import InterviewAlert from '../../components/InterviewAlert';

import SwiperFlatList from 'react-native-swiper-flatlist';
import { useIndexContext } from '../../../IndexContext';
import ReviewItem from '../Review/ReviewItem';
import FloatingMenu from '../../components/FloatingMenu';
import {deleteReviewAjax, getReviews, regReview, toggleReviewLike, updateReviewAjax} from "../../../api/v1/review";
import {useDispatch, useSelector} from "react-redux";
import {getReviewListSelector, getReviewsAsync} from "../../../redux/slice/ReviewSlice";
import {getCurrentMemberIdSelector, getScreenTypeSelector} from "../../../redux/slice/UiRenderSlice";
import {SCREEN_6} from "../../../AppConst";

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  itemView: {
    width: width,
    paddingHorizontal: 20,
    marginTop: 25,
    marginBottom: 70,
  },
  inputReviewContainer: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderTopWidth: 1,
    borderColor: '#ffffff',
  },
  reviewInputButton: {
    flex: 1,
    height: 45,
    backgroundColor: '#072AC8',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputTextContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputTextArea: {
    flex: 1,
    height: 45,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
    color: 'gray',
  },
  inputReviewButton: {
    flex: 0.3,
    height: 45,
    backgroundColor: '#072AC8',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#ffffff',
  },
});

const Review = ({ token, currentUserId }) => {
  const { selectedMemId } = useIndexContext();
  const [data, setData] = useState([]);
  const [review, isReview] = useState(true);
  const [showReviewInput, setShowReviewInput] = useState(false);
  const [reviewContent, setReviewContent] = useState('');
  const [reviewId, setReviewId] = useState(0);
  const [isEditMode, setIsEditMode] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);

  const newReviewInputRef = useRef(null);

  const dispatch = useDispatch();
  const _screenType = useSelector(getScreenTypeSelector);
  const _memberId = useSelector(getCurrentMemberIdSelector);
  const _reviewList = useSelector(getReviewListSelector);

  useEffect(() => {
    if(_screenType == SCREEN_6) {
      dispatch(getReviewsAsync({token, memberId: _memberId}))
    }
  }, [_memberId, _screenType]);

  useEffect(() => {
    console.log(`_reviewList = ${JSON.stringify(_reviewList)}`)
  }, [_reviewList]);


  const onEdit = () => {
    setIsEditMode(true);
    setShowReviewInput(true);
  };

  // useEffect(() => {
  //   console.log('currentReviewContent: ', reviewContent);
  // }, [reviewContent]);
  //
  // useEffect(() => {
  //   console.log('currentReviewId: ', reviewId);
  // }, [reviewId]);

  // useEffect(() => {
  //   if (!token) return;
  //
  //   const source = axios.CancelToken.source();
  //
  //   getReviews(token, {
  //     selectedMemId: selectedMemId
  //   }, {
  //     cancelToken: source.token
  //   })
  //   // axios({
  //   //   method: 'get',
  //   //   url: `https://api.writeyoume.com/api/v1/review/${selectedMemId}`,
  //   //   headers: {
  //   //     Authorization: token,
  //   //   },
  //   //   cancelToken: source.token,
  //   // })
  //     .then(response => {
  //       console.log('Success:', response.status);
  //
  //       const extractedData = response.data.data.map(item => ({
  //         review_id: item.review_id,
  //         name: item.name,
  //         member_id: item.member_id,
  //         content: item.content,
  //         reg_date: item.reg_date,
  //         is_liked: item.is_liked,
  //       }));
  //       setData(extractedData);
  //     })
  //     .catch(error => {
  //       console.log('Error Response:', error.response);
  //       setData([]);
  //     });
  //
  //   return () => {
  //     source.cancel('API 호출이 취소되었습니다.');
  //   };
  // }, [token, selectedMemId]);

  const postReview = async reviewText => {
    if (reviewText == '' || !token) return;

    try {
      regReview(token, {
        ref_member_id: selectedMemId,
        content: reviewText,
      })
      .then(function (response) {
        const newReview = response.data.data;
        newReview.name = '나';
        setData(currentData => [newReview, ...currentData]);
        setReviewContent('');
      }).catch(function (error) {
        console.error('Error', error);
      })


    //   const response = await axios({
    //     method: 'post',
    //     url: 'https://api.writeyoume.com/api/v1/review',
    //     data: {
    //       ref_member_id: selectedMemId,
    //       content: reviewText,
    //     },
    //     headers: {
    //       Authorization: token,
    //     },
    //   });
    //   const newReview = response.data.data;
    //   newReview.name = '나';
    //   setData(currentData => [newReview, ...currentData]);
    //   setReviewContent('');
    } catch (error) {
      console.error('Error', error);
    }
  };

  const updateReview = async (reviewId, member_id, reviewContent) => {
    if (reviewContent == '' || !token) return;

    try {
      updateReviewAjax(token, {
        reviewId: reviewId,
        member_id: member_id,
        content: reviewContent,
        ref_member_id: selectedMemId,
      })
      .then(function (response) {
        setData([]);
        const extractedData = Array.isArray(response.data.data)
            ? response.data.data.map(item => ({
              review_id: item.review_id,
              name: item.name,
              member_id: item.member_id,
              content: item.content,
              reg_date: item.reg_date,
              is_liked: item.is_liked,
            }))
            : [];
        setData(extractedData);
        setReviewContent('');
      })
      .catch(function (error){
        console.error('Error', error);
      })
      // const response = await axios({
      //   method: 'put',
      //   url: `https://api.writeyoume.com/api/v1/review/${reviewId}`,
      //   data: {
      //     member_id: member_id,
      //     content: reviewContent,
      //     ref_member_id: selectedMemId,
      //   },
      //   headers: {
      //     Authorization: token,
      //   },
      // });
      // setData([]);
      // const extractedData = Array.isArray(response.data.data)
      //   ? response.data.data.map(item => ({
      //     review_id: item.review_id,
      //     name: item.name,
      //     member_id: item.member_id,
      //     content: item.content,
      //     reg_date: item.reg_date,
      //     is_liked: item.is_liked,
      //   }))
      //   : [];
      // setData(extractedData);
      // setReviewContent('');
    } catch (error) {
      console.error('Error', error);
    }
  };

  const deleteReview = async (reviewId, memberId) => {
    if (!token) return;
    try {
      deleteReviewAjax(token, {
        reviewId: reviewId,
        member_id: memberId,
        ref_member_id: selectedMemId,
      }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        }
      })
      .then(function (response) {
        setData([]);
        const extractedData = Array.isArray(response.data.data)
            ? response.data.data.map(item => ({
              review_id: item.review_id,
              name: item.name,
              member_id: item.member_id,
              content: item.content,
              reg_date: item.reg_date,
              is_liked: item.is_liked,
            }))
            : [];
        setData(extractedData);
      })
      .catch(function (error){
        console.error('Error', error);
      })


      // const response = await axios({
      //   method: 'delete',
      //   url: `https://api.writeyoume.com/api/v1/review/${reviewId}`,
      //   data: {
      //     member_id: memberId,
      //     ref_member_id: selectedMemId,
      //   },
      //   headers: {
      //     'Content-Type': 'application/json',
      //     Authorization: token,
      //   },
      // });
      // setData([]);
      // const extractedData = Array.isArray(response.data.data)
      //   ? response.data.data.map(item => ({
      //     review_id: item.review_id,
      //     name: item.name,
      //     member_id: item.member_id,
      //     content: item.content,
      //     reg_date: item.reg_date,
      //     is_liked: item.is_liked,
      //   }))
      //   : [];
      // setData(extractedData);
    } catch (error) {
      console.error('Error', error);
    }
  };

  const setReviewLike = async ref_review_id => {
    if (!token) return;

    try {
      toggleReviewLike(token, {
        member_id: currentUserId,
        ref_review_id: ref_review_id,
      })
      .then(function (response) {
        console.log('성공', response.status);
      })
      .catch(function (error){
        console.error('Error', error);
      })
      // const response = await axios({
      //   method: 'post',
      //   url: 'https://api.writeyoume.com/api/v1/review/like',
      //   data: {
      //     member_id: currentUserId,
      //     ref_review_id: ref_review_id,
      //   },
      //   headers: {
      //     Authorization: token,
      //   },
      // });
      // console.log('성공', response.status);
    } catch (error) {
      console.error('Error', error);
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.itemView}>
          { _reviewList != null && _reviewList.length > 0 ? (
            <FlatList
                showsVerticalScrollIndicator={false}
                data={_reviewList}
              initialNumToRender={10}
              maxToRenderPerBatch={5}
              windowSize={5}
              renderItem={({ item }) => (
                <ReviewItem
                  review={review}
                  id={item.review_id}
                  writer={item.name}
                  date={item.reg_date}
                  content={item.content}
                  imageType={item.imageType}
                  isLiked={item.is_liked}
                  onEdit={onEdit}
                  currentReviewId={setReviewId}
                  currentReviewContent={setReviewContent}
                  token={token}
                  setReviewLike={setReviewLike}
                  memberId={item.member_id}
                  currentUserId={currentUserId}
                  deleteReview={deleteReview}
                />
              )}
              keyExtractor={item => item.review_id.toString()}
            />
          ) : <Image
              source={require('../../../assets/images/Rectangle.png')}
              style={{width: '100%', height: '100%'}}
              resizeMode="cover"
          />}
        </View>
      </SafeAreaView>
      {
        <View style={styles.inputReviewContainer}>
          <TextInput
            style={styles.inputTextArea}
            ref={newReviewInputRef}
            multiline={true}
            onChangeText={text => setReviewContent(text)}
            value={reviewContent} // 현재 리뷰 내용으로 설정
            placeholder="멤버의 리뷰를 입력해주세요."
            returnKeyType="done"
          />
          <TouchableOpacity
            style={styles.inputReviewButton}
            onPress={() => {
              if (reviewContent != '') {
                if (isEditMode) {
                  // 편집 모드일 경우 업데이트 로직 실행
                  updateReview(reviewId, currentUserId, reviewContent);
                } else {
                  // 새 리뷰 등록 로직 실행
                  postReview(reviewContent);
                }
                setShowReviewInput(false);
                setIsEditMode(false); // 편집 모드 종료
              } else { setAlertVisible(true); }
            }}>
            <Text style={styles.text}>{isEditMode ? '수정' : '등록'}</Text>
          </TouchableOpacity>
        </View>
      }
      <InterviewAlert
        title={'내용을 입력해주세요'}
        alertVisible={alertVisible}
        setAlertVisible={setAlertVisible}
      />
      {/*<FloatingMenu />*/}
    </View>
  );
};

export default Review;

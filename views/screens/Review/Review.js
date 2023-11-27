import React, {useState, useRef, useEffect} from 'react';

import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';

import axios from 'axios';

import ReviewItem from '../Review/ReviewItem';

import FloatingMenu from '../../components/FloatingMenu';

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

    paddingHorizontal: 10,

    marginRight: 10,
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

const Review = () => {
  const [data, setData] = useState([]);

  const [review, isReview] = useState(true);

  const [showReviewInput, setShowReviewInput] = useState(false);

  const [reviewContent, setReviewContent] = useState('');

  const [isEditMode, setIsEditMode] = useState(false);

  const newReviewInputRef = useRef(null);

  const onEdit = () => {
    setIsEditMode(true);

    setShowReviewInput(true);
  };

  const currentReviewContent = ({content}) => {
    setReviewContent(content);
  };

  useEffect(() => {
    let isMounted = true;

    const source = axios.CancelToken.source();

    axios({
      method: 'get',

      url: 'http://10.0.2.2:3000/api/v1/review/1',

      headers: {
        Authorization: '',
      },

      cancelToken: source.token,
    })
      .then(response => {
        if (isMounted) {
          console.log('Success:', response.status);

          const extractedData = response.data.data.map(item => ({
            review_id: item.review_id,

            member_id: item.member_id,

            content: item.content,

            reg_date: item.reg_date,
          }));

          setData(extractedData);
        }
      })

      .catch(error => {
        console.log('Error Message:', error.message);

        console.log('Error Response:', error.response);

        console.log('Error Request:', error.request);
      });

    return () => {
      isMounted = false;

      source.cancel('API 호출이 취소되었습니다.');
    };
  }, []);

  const postReview = async reviewText => {
    try {
      const response = await axios({
        method: 'post',

        url: 'http://10.0.2.2:3000/api/v1/review',

        data: {
          ref_member_id: 1,

          content: reviewText,
        },

        headers: {
          Authorization: '',
        },
      });

      console.log('Response', response.data);
    } catch (error) {
      console.error('Error', error);
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.itemView}>
          <FlatList
            data={data}
            renderItem={({item}) => (
              <ReviewItem
                review={review}
                id={item.review_id}
                writer={item.member_id}
                date={item.reg_date}
                content={item.content}
                imageType={item.imageType}
                isLiked={item.isLiked}
                onEdit={onEdit}
                currentReviewContent={currentReviewContent}
              />
            )}
            keyExtractor={(item, index) => index}
          />
        </View>
      </SafeAreaView>

      {
        // <View style={styles.inputReviewContainer}>

        // {showReviewInput ? (

        // <View style={styles.inputTextContainer}>

        // <TextInput

        // style={styles.inputTextArea}

        // ref={newReviewInputRef}

        // multiline={true}

        // onChangeText={text => setReviewContent(text)}

        // placeholder="멤버의 리뷰를 입력해주세요."

        // returnKeyType="done"

        // />

        // <TouchableOpacity

        // style={styles.inputReviewButton}

        // onPress={() => {

        // postReview(reviewContent);

        // setShowReviewInput(false);

        // }}>

        // <Text style={styles.text}>등록</Text>

        // </TouchableOpacity>

        // </View>

        // ) : (

        // <TouchableOpacity

        // style={styles.reviewInputButton}

        // onPress={() => setShowReviewInput(true)}>

        // <Text style={styles.text}>리뷰 등록하기</Text>

        // </TouchableOpacity>

        // )}

        // </View>

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
              if (isEditMode) {
                // 편집 모드일 경우 업데이트 로직 실행
                // 예: updateReview(reviewId, reviewContent);
              } else {
                // 새 리뷰 등록 로직 실행

                postReview(reviewContent);
              }

              setShowReviewInput(false);

              setIsEditMode(false); // 편집 모드 종료
            }}>
            <Text style={styles.text}>{isEditMode ? '수정' : '등록'}</Text>
          </TouchableOpacity>
        </View>
      }

      <FloatingMenu />
    </View>
  );
};

export default Review;

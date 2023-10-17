import React, {useState, useRef} from 'react';
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

// make a function of output random number between 1 and 3
const randomImageId = () => {
  return Math.floor(Math.random() * 3);
};

const onModify = ({code}) => {
  Alert.alert(
    '확인 테스트',
    'Props: onModify() \n\nPortfolio > PortfolioItem\n > PortfolioModal > DetailPop',
  );
};

const onDelete = ({code}) => {
  Alert.alert(
    '삭제 테스트',
    'Props: onDelete() \n\nPortfolio > PortfolioItem\n > PortfolioModal ',
  );
};

const DATA = [
  {
    writer: '아무개',
    date: '2023-06-07 17:43:14',
    content:
      '리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. ',
    imageType: randomImageId(),
    isLiked: true,
  },
  {
    writer: '김아무개',
    date: '2023-06-07 17:43:14',
    content:
      '리뷰 내용 입니다. 리뷰 내용 입니다.리뷰' +
      '내용 입니다.리뷰 내용 입니다.리뷰 내용 입니다.리뷰 내용 입니다.' +
      '리뷰 내용 입니다.리뷰 내용 입니다.리뷰 내용 입니다.리뷰 내용 입니다.' +
      '리뷰 내용 입니다.리뷰 내용 입니다.리뷰 내용 입니다.리뷰 내용 입니다.' +
      '리뷰 내용 입니다.리뷰 내용 입니다.리뷰 내용 입니다.리뷰 내용 입니다.리뷰' +
      '내용 입니다.리뷰 내용 입니다.',
    imageType: randomImageId(),
    isLiked: true,
  },
  {
    writer: '아무개',
    date: '2023-06-07 17:43:14',
    content: '리뷰 내용 입니다. ',
    imageType: randomImageId(),
    isLiked: true,
  },
  {
    writer: '아무개',
    date: '2023-06-07 17:43:14',
    content: '리뷰 내용 입니다. ',
    imageType: randomImageId(),
    isLiked: true,
  },
  {
    writer: '아무개',
    date: '2023-06-07 17:43:14',
    content: '리뷰 내용 입니다. ',
    imageType: randomImageId(),
    isLiked: true,
  },
  {
    writer: '아무개',
    date: '2023-06-07 17:43:14',
    content: '리뷰 내용 입니다. ',
    imageType: randomImageId(),
    isLiked: true,
  },
];

const Review = () => {
  const [review, isReview] = useState(true);
  const [showReviewInput, setShowReviewInput] = useState(false);
  const [reviewContent, setReviewContent] = useState('');
  const newReviewInputRef = useRef(null);

  const random = () => {
    return Math.floor(Math.random() * 100000);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.itemView}>
          <FlatList
            data={DATA}
            renderItem={({item}) => (
              <ReviewItem
                review={review}
                id={item.id}
                writer={item.writer}
                date={item.date}
                content={item.content}
                imageType={item.imageType}
                isLiked={item.isLiked}
                onModify={onModify}
                onDelete={onDelete}
              />
            )}
            keyExtractor={(item, index) => index}
          />
        </View>
      </SafeAreaView>
      {
        <View style={styles.inputReviewContainer}>
          {showReviewInput ? (
            <View style={styles.inputTextContainer}>
              <TextInput
                style={styles.inputTextArea}
                ref={newReviewInputRef}
                multiline={true}
                onChangeText={text => setReviewContent(text)}
                placeholder="멤버의 리뷰를 입력해주세요."
                returnKeyType="done"
              />
              <TouchableOpacity style={styles.inputReviewButton}>
                <Text style={styles.text}>입력</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.reviewInputButton}
              onPress={() => setShowReviewInput(true)}>
              <Text style={styles.text}>리뷰 등록하기</Text>
            </TouchableOpacity>
          )}
        </View>
      }

      <FloatingMenu />
    </View>
  );
};

export default Review;

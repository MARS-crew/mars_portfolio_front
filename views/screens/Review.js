// import React, {useState, useRef} from 'react';
// import {
//   View,
//   StyleSheet,
//   Text,
//   SafeAreaView,
//   FlatList,
//   TouchableOpacity,
// } from 'react-native';
// import ReviewItem from '../components/ReviewItem';

// // 더미 데이터, 추후 서버 연동
// const DATA = [
//   {
//     writer: '김건우',
//     date: '2023-06-07 17:43:17',
//     content:
//       '리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다.',
//   },
//   {
//     writer: '김건우',
//     date: '2023-06-07 17:43:17',
//     content:
//       '리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다.',
//   },
//   {
//     writer: '김건우',
//     date: '2023-06-07 17:43:17',
//     content:
//       '리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다.',
//   },
//   {
//     writer: '김건우',
//     date: '2023-06-07 17:43:17',
//     content:
//       '리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다.',
//   },
//   {
//     writer: '김건우',
//     date: '2023-06-07 17:43:17',
//     content:
//       '리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다.',
//   },
// ];

// const Review = () => {
//   const [reviews, setReviews] = useState(DATA);
//   const flatListRef = useRef(null); // FlatList의 스크롤 위치를 '리뷰 작성' 버튼을 눌렀을 때 화면의 최상단으로 이동하도록 조작하기 위한 ref

//   const renderItem = ({item}) => {
//     // FlatList의 renderItem 속성에 전달할 함수
//     const {writer, date, content} = item;

//     return <ReviewItem writer={writer} date={date} content={content} />;
//   };

//   const addReview = () => {
//     // '리뷰 작성' 버튼을 눌렀을 때 실행되는 함수
//     const newReview = {
//       writer: 'New User',
//       date: new Date().toISOString(),
//       content: 'New review content',
//     };

//     setReviews(prevReviews => [newReview, ...prevReviews]); // reviews 배열의 맨 앞에 새로운 리뷰를 추가 즉, 최신 리뷰가 맨 위에 위치하도록 함

//     flatListRef.current.scrollToOffset({animated: true, offset: 0}); // FlatList의 스크롤 위치를 화면의 최상단으로 이동
//   };

//   return (
//     <View style={styles.container}>
//       <SafeAreaView style={styles.safeArea}>
//         <View style={styles.reviewContainer}>
//           <FlatList
//             ref={flatListRef}
//             data={reviews}
//             showsVerticalScrollIndicator={false}
//             renderItem={renderItem}
//             keyExtractor={(item, index) => index.toString()}
//             numColumns={1}
//           />
//           <TouchableOpacity
//             style={styles.addReviewButton}
//             onPress={() => addReview()}>
//             <Text style={styles.addReviewText}>리뷰 작성</Text>
//           </TouchableOpacity>
//         </View>
//       </SafeAreaView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   safeArea: {
//     flex: 1,
//   },
//   reviewContainer: {
//     flex: 1,
//     alignItems: 'center',
//   },
//   addReviewButton: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: '10%',
//     backgroundColor: '#000',
//     width: '100%',
//   },
//   addReviewText: {
//     color: 'white',
//     fontSize: 20,
//   },
// });

// export default Review;

import React, {useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import ReviewItem from '../components/ReviewItem';

const DATA = [
  {
    writer: '김건우',
    date: '2023-06-07 17:43:17',
    content:
      '리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다.',
  },
  {
    writer: '김건우',
    date: '2023-06-07 17:43:17',
    content:
      '리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다.',
  },
  {
    writer: '김건우',
    date: '2023-06-07 17:43:17',
    content:
      '리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다.',
  },
  {
    writer: '김건우',
    date: '2023-06-07 17:43:17',
    content:
      '리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다.',
  },
  {
    writer: '김건우',
    date: '2023-06-07 17:43:17',
    content:
      '리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다. 리뷰 내용 입니다.',
  },
];

const Review = () => {
  const [reviews, setReviews] = useState(DATA);
  const [newReviewContent, setNewReviewContent] = useState('');

  const newReviewInputRef = useRef(null);
  const flatListRef = useRef(null);

  const renderItem = ({item}) => {
    const {writer, date, content} = item;

    return <ReviewItem writer={writer} date={date} content={content} />;
  };

  const addReview = () => {
    const newReview = {
      writer: 'New User',
      date: new Date().toLocaleString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      }),
      content: newReviewContent,
    };

    setReviews(prevReviews => [newReview, ...prevReviews]);
    setNewReviewContent('');

    // Scroll to the top of the FlatList
    flatListRef.current.scrollToOffset({animated: true, offset: 0});

    // Set focus to the new review input
    if (newReviewInputRef.current) {
      newReviewInputRef.current.focus();
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.reviewItemContainer}>
          <FlatList
            ref={flatListRef}
            data={reviews}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={1}
          />
        </View>
        <View style={styles.addReviewContainer}>
          <TextInput
            ref={newReviewInputRef}
            style={styles.newReviewInput}
            multiline
            placeholder="멤버의 리뷰를 입력해주세요."
            value={newReviewContent}
            onChangeText={setNewReviewContent}
          />
          <TouchableOpacity style={styles.addReviewButton} onPress={addReview}>
            <Text style={styles.addReviewText}>입력</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  safeArea: {
    flex: 1,
    elevation: 20,
  },
  reviewItemContainer: {
    flex: 1,
    alignItems: 'center',
  },
  addReviewContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: 'white',
  },
  newReviewInput: {
    flex: 1,
    height: 30,
    borderWidth: 1,
    color: '#000',
    borderColor: '#ccc',
    borderRadius: 5,
    marginRight: 10,
    paddingHorizontal: 10,
  },
  addReviewButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'darkblue',
    flex: 0.3,
    height: 30,
    borderRadius: 5,
  },
  addReviewText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Review;

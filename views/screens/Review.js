// import React, {useState, useRef} from 'react';
// import {
//   View,
//   Button,
//   StyleSheet,
//   Image,
//   Text,
//   SafeAreaView,
//   FlatList,
// } from 'react-native';
// import ReviewItem from '../components/ReviewItem';

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

// const [isButtonVisible, setIsButtonVisible] = useState(false);

// const Review = () => {
//   const [hiddenItems, setHiddenItems] = useState([]);
//   const flatListRef = useRef(null);

//   const handleScroll = event => {
//     const offsetY = event.nativeEvent.contentOffset.y;
//     const visibleThreshold = 100; // Adjust this value as needed

//     if (offsetY > visibleThreshold) {
//       setIsButtonVisible(true);
//     } else {
//       setIsButtonVisible(false);
//     }
//   };

//   const hideItem = itemId => {
//     setHiddenItems(prevHiddenItems => [...prevHiddenItems, itemId]);
//   };

//   const isItemHidden = itemId => {
//     return hiddenItems.includes(itemId);
//   };

//   const renderItem = ({item}) => {
//     const {writer, date, content} = item;
//     const itemId = item.date; // Use a unique identifier for the item, such as the date

//     if (isItemHidden(itemId)) {
//       return null; // Don't render hidden items
//     }

//     return (
//       <ReviewItem
//         writer={writer}
//         date={date}
//         content={content}
//         onPressHide={() => hideItem(itemId)}
//       />
//     );
//   };

//   const renderButton = () => {
//     if (isButtonVisible) {
//       return (
//         <TouchableOpacity
//           style={styles.addButton}
//           onPress={() => {
//             // Handle adding a review here
//             // You can create a new item with the same shape as existing reviews
//             // and add it to the top of the DATA array
//             const newReview = {
//               writer: 'New Writer',
//               date: '2023-06-08 00:00:00',
//               content: 'New Review Content',
//             };
//             DATA.unshift(newReview);

//             // Scroll to the top of the list
//             flatListRef.current.scrollToOffset({offset: 0});
//           }}>
//           <Text style={styles.buttonText}>Add Review</Text>
//         </TouchableOpacity>
//       );
//     }

//     return null;
//   };

//   return (
//     <View style={styles.container}>
//       <SafeAreaView>
//         <View>
//           <FlatList
//             ref={flatListRef}
//             data={DATA}
//             showsVerticalScrollIndicator={false}
//             renderItem={renderItem}
//             keyExtractor={(item, index) => index.toString()}
//             numColumns={1}
//             onScroll={handleScroll}
//             scrollEventThrottle={16}
//           />
//         </View>
//       </SafeAreaView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//   },
//   addButton: {
//     position: 'absolute',
//     bottom: 20,
//     right: 20,
//     backgroundColor: 'blue',
//     padding: 10,
//     borderRadius: 5,
//   },
//   buttonText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
// });

// export default Review;

import React, {useState, useRef} from 'react';
import {
  View,
  Button,
  StyleSheet,
  Image,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
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
  const [hiddenItems, setHiddenItems] = useState([]);
  const [reviews, setReviews] = useState(DATA);

  const flatListRef = useRef(null);

  const hideItem = itemId => {
    setHiddenItems(prevHiddenItems => [...prevHiddenItems, itemId]);
  };

  const isItemHidden = itemId => {
    return hiddenItems.includes(itemId);
  };

  const renderItem = ({item}) => {
    const {writer, date, content} = item;
    const itemId = item.date; // Use a unique identifier for the item, such as the date

    if (isItemHidden(itemId)) {
      return null; // Don't render hidden items
    }

    return (
      <ReviewItem
        writer={writer}
        date={date}
        content={content}
        onPressHide={() => hideItem(itemId)}
      />
    );
  };

  const addReview = () => {
    const newReview = {
      writer: 'New User',
      date: new Date().toISOString(),
      content: 'New review content',
    };

    setReviews(prevReviews => [newReview, ...prevReviews]);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View>
          <FlatList
            ref={flatListRef}
            data={reviews}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={1}
          />
        </View>
      </SafeAreaView>

      <TouchableOpacity style={styles.addButton} onPress={addReview}>
        <Text style={styles.addButtonText}>리뷰 남기기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  scrollButton: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
  },
  scrollButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Review;

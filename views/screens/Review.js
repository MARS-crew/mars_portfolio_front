import React, {useState} from 'react';
import {
  View,
  Button,
  StyleSheet,
  Image,
  Text,
  SafeAreaView,
  FlatList,
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

// const Item = ({writer, date, content}) => (

//   <View>
//     <ReviewItem writer={writer} date={date} content={content} />
//   </View>
// );

// const Review = () => {
//   return (
//     <View style={styles.container}>
//       <SafeAreaView>
//         <View>
//           <FlatList
//             data={DATA}
//             showsVerticalScrollIndicator={false}
//             renderItem={({item}) => (
//               <Item
//                 writer={item.writer}
//                 date={item.date}
//                 content={item.content}
//                 keyExtractor={(item, index) => index}
//                 numColumns={1}
//               />
//             )}
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
// });

// export default Review;

const Review = () => {
  const [hiddenItems, setHiddenItems] = useState([]);

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

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View>
          <FlatList
            data={DATA}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={1}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});

export default Review;

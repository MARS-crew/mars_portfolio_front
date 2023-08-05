// import React, {useState, useEffect, useRef} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
//   SafeAreaView,
//   ScrollView,
//   Modal,
//   TouchableWithoutFeedback,
//   Dimensions,
// } from 'react-native';
// import ShareEditMode from '../components/ShareEditMode';

// const shareImages = [
//   {
//     id: 1,
//     url: require('../../assets/images/test_member1.jpeg'),
//   },
//   {
//     id: 2,
//     url: require('../../assets/images/test_member2.jpeg'),
//   },
//   {
//     id: 3,
//     url: require('../../assets/images/test_member3.jpeg'),
//   },
// ];

// const shareImages2 = [
//   {
//     id: 4,
//     url: require('../../assets/images/test_member4.jpeg'),
//   },
//   {
//     id: 5,
//     url: require('../../assets/images/test_member1.jpeg'),
//   },
//   {
//     id: 6,
//     url: require('../../assets/images/test_member2.jpeg'),
//   },
// ];

// const Share = () => {
//   const [isModalVisible, setIsModalVisible] = useState(false);

//   const handleCloseModal = () => {
//     setSelectedImage(null);
//   };

//   const closeButtonRef = useRef(null);

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView>
//         <View style={styles.header}>
//           <Text style={styles.headerTitle}>마스외전 2023년</Text>
//           <Text style={styles.headerSubTitle}>111개</Text>
//         </View>
//         <View style={styles.divider} />
//         <View style={styles.body}>
//           <View style={styles.bodyContent}>
//             <View style={styles.imageContainer}>
//               {shareImages.map(image => (
//                 <TouchableOpacity
//                   key={image.id}
//                   onPress={() => setIsModalVisible(true)}>
//                   <Image
//                     style={styles.imageContent}
//                     source={image.url}
//                     resizeMode="cover"
//                   />
//                 </TouchableOpacity>
//               ))}
//             </View>
//             <View style={styles.imageContainer}>
//               {shareImages2.map(image => (
//                 <TouchableOpacity
//                   key={image.id}
//                   onPress={() => setIsModalVisible(true)}>
//                   <Image
//                     style={styles.imageContent}
//                     source={image.url}
//                     resizeMode="cover"
//                   />
//                 </TouchableOpacity>
//               ))}
//             </View>
//           </View>
//         </View>

//         <View style={styles.header}>
//           <Text style={styles.headerTitle}>마스외전 2022년</Text>
//           <Text style={styles.headerSubTitle}>111개</Text>
//         </View>
//         <View style={styles.divider} />
//         <View style={styles.body}>
//           <View style={styles.bodyContent}>
//             <View style={styles.imageContainer}>
//               {shareImages.map(image => (
//                 <TouchableOpacity
//                   key={image.id}
//                   onPress={() => setIsModalVisible(true)}>
//                   <Image
//                     style={styles.imageContent}
//                     source={image.url}
//                     resizeMode="cover"
//                   />
//                 </TouchableOpacity>
//               ))}
//             </View>
//             <View style={styles.imageContainer}>
//               {shareImages2.map(image => (
//                 <TouchableOpacity
//                   key={image.id}
//                   onPress={() => setIsModalVisible(true)}>
//                   <Image
//                     style={styles.imageContent}
//                     source={image.url}
//                     resizeMode="cover"
//                   />
//                 </TouchableOpacity>
//               ))}
//             </View>
//           </View>
//         </View>
//         <ShareEditMode
//           isModalVisible={isModalVisible}
//           setIsModalVisible={setIsModalVisible}></ShareEditMode>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default Share;

// const {width} = Dimensions.get('window').width;
// const {height} = Dimensions.get('window').height;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     width: width,
//     height: height,
//     backgroundColor: 'white',
//   },
//   header: {
//     marginTop: 20,
//     marginHorizontal: 20,
//     height: 30,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#333333',
//   },
//   headerSubTitle: {
//     position: 'absolute',
//     bottom: 0,
//     right: 0,
//     fontSize: 12,
//     fontWeight: 'normal',
//     color: '#333333',
//   },
//   body: {
//     marginHorizontal: 20,
//   },
//   bodyContent: {
//     flexDirection: 'column',
//     alignItems: 'center',
//   },
//   imageContainer: {
//     flexDirection: 'row',
//   },
//   imageContent: {
//     width: 105,
//     height: 105,
//     margin: 8,
//   },
//   divider: {
//     width: width,
//     height: 1,
//     marginVertical: 10,
//     marginHorizontal: 20,
//     backgroundColor: '#D8D8D8',
//   },
// });

import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import ShareEditMode from '../components/ShareEditMode';

const shareImages = [
  {
    id: 1,
    url: require('../../assets/images/test_member1.jpeg'),
  },
  {
    id: 2,
    url: require('../../assets/images/test_member2.jpeg'),
  },
  {
    id: 3,
    url: require('../../assets/images/test_member3.jpeg'),
  },
];

const shareImages2 = [
  {
    id: 4,
    url: require('../../assets/images/test_member4.jpeg'),
  },
  {
    id: 5,
    url: require('../../assets/images/test_member1.jpeg'),
  },
  {
    id: 6,
    url: require('../../assets/images/test_member2.jpeg'),
  },
];

const Album = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>마스외전 2023년</Text>
          <Text style={styles.headerSubTitle}>111개</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <View style={styles.imageRowContainer}>
              {shareImages.map(image => (
                <TouchableOpacity
                  style={styles.imageContainer}
                  key={image.id}
                  onPress={() => setIsModalVisible(true)}>
                  <Image
                    style={styles.imageContent}
                    source={image.url}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.imageRowContainer}>
              {shareImages2.map(image => (
                <TouchableOpacity
                  style={styles.imageContainer}
                  key={image.id}
                  onPress={() => setIsModalVisible(true)}>
                  <Image
                    style={styles.imageContent}
                    source={image.url}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.header}>
          <Text style={styles.headerTitle}>마스외전 2022년</Text>
          <Text style={styles.headerSubTitle}>111개</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <View style={styles.imageRowContainer}>
              {shareImages.map(image => (
                <TouchableOpacity
                  style={styles.imageContainer}
                  key={image.id}
                  onPress={() => setIsModalVisible(true)}>
                  <Image
                    style={styles.imageContent}
                    source={image.url}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.imageRowContainer}>
              {shareImages2.map(image => (
                <TouchableOpacity
                  style={styles.imageContainer}
                  key={image.id}
                  onPress={() => setIsModalVisible(true)}>
                  <Image
                    style={styles.imageContent}
                    source={image.url}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
        <ShareEditMode
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}></ShareEditMode>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Album;

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: height,
    backgroundColor: 'white',
  },
  header: {
    marginTop: 20,
    marginHorizontal: 20,
    height: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
  },
  headerSubTitle: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    fontSize: 12,
    fontWeight: 'normal',
    color: '#333333',
  },
  body: {
    marginHorizontal: 20,
  },
  bodyContent: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  imageRowContainer: {
    flexDirection: 'row',
  },
  imageContent: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  imageContainer: {
    width: width * 0.27,
    height: height * 0.15,
    margin: 8,
    elevation: 8,
  },
  divider: {
    marginHorizontal: 20,
    marginVertical: 10,
    borderBottomColor: '#E5E5E5',
    borderBottomWidth: 1,
  },
});

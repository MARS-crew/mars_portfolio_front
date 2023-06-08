import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  Alert,
  Modal,
} from 'react-native';
import ReviewModal from '../components/ReviewModal';
import ReviewEditModal from './ReviewEditModal';
import ReviewHideModal from './ReviewHideModal';

const ReviewItem = ({writer, date, content}) => {
  const [isReviewModalVisible, setIsReviewModalVisible] = useState(false);
  const [isReviewEditModalVisible, setIsReviewEditModalVisible] =
    useState(false);
  const [isReviewHideModalVisible, setIsReviewHideModalVisible] =
    useState(false);

  const [hiddenItems, setHiddenItems] = useState([]);

  const openReviewDialog = () => {
    setIsReviewModalVisible(true);
  };

  const closeReviewModal = () => {
    setIsReviewModalVisible(false);
  };

  return (
    <View style={styles.reviewContainer}>
      <TouchableOpacity
        onPress={() => setIsReviewModalVisible(!isReviewModalVisible)}
        onLongPress={
          () =>
            // setIsReviewEditModalVisible(!isReviewEditModalVisible) // 리뷰 수정 모당 출력
            setIsReviewHideModalVisible(true) // 리뷰 숨기기 모달 출력
        }>
        <View>
          <Text style={styles.postUser}>{writer}</Text>
          <Text style={styles.postDate}>{date}</Text>
          <Text
            style={styles.postContent}
            numberOfLines={3}
            ellipsizeMode="tail">
            {content}
          </Text>
        </View>
      </TouchableOpacity>

      <Modal visible={isReviewModalVisible} animationType={'fade'}>
        <ReviewModal
          writer={writer}
          date={date}
          content={content}
          onClose={closeReviewModal}
        />
      </Modal>
      {/* <Modal visible={isReviewEditModalVisible} animationType={'fade'}>
        <ReviewEditModal
          isModalVisible={isReviewEditModalVisible}
          setIsModalVisible={setIsReviewEditModalVisible}
          writer={writer}
          date={date}
          content={content}
        />
      </Modal> */}
      <Modal visible={isReviewHideModalVisible} animationType={'fade'}>
        <ReviewHideModal
          isModalVisible={isReviewHideModalVisible}
          setIsModalVisible={setIsReviewHideModalVisible}
          writer={writer}
          date={date}
          content={content}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  reviewContainer: {
    width: Dimensions.get('window').width * 0.9,
    display: 'flex',
    borderWidth: 1,
    borderColor: '#000',
    marginVertical: 5,
    alignItems: 'center',
  },
  postUser: {
    marginHorizontal: 20,
    marginTop: 20,
    textAlign: 'left',
    fontSize: 15,
    fontWeight: 'bold',
  },
  postDate: {
    marginHorizontal: 20,
    textAlign: 'left',
    fontSize: 12,
    fontWeight: '300',
  },
  postContent: {
    marginHorizontal: 20,
    marginVertical: 20,
    fontWeight: '300',
    fontSize: 18,
  },
});

export default ReviewItem;

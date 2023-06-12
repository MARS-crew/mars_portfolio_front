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
import ThumbsUpIcon from '../components/ThumbsUpAnimation';

const ReviewItem = ({writer, date, content}) => {
  const [isReviewModalVisible, setIsReviewModalVisible] = useState(false);
  const [isReviewEditModalVisible, setIsReviewEditModalVisible] =
    useState(false);
  const [isReviewHideModalVisible, setIsReviewHideModalVisible] =
    useState(false);

  const [hiddenItems, setHiddenItems] = useState([]);

  const [isReviewLiked, setIsReviewLiked] = useState(false);

  const openReviewDialog = () => {
    setIsReviewModalVisible(true);
  };

  const closeReviewModal = () => {
    setIsReviewModalVisible(false);
  };

  const handleReviewLike = () => {
    setIsReviewLiked(!isReviewLiked);
  };

  return (
    <View style={styles.reviewContainer}>
      <TouchableOpacity
        onPress={() => setIsReviewModalVisible(!isReviewModalVisible)}
        onLongPress={
          () => setIsReviewEditModalVisible(!isReviewEditModalVisible) // 리뷰 수정 모당 출력
          // () => setIsReviewHideModalVisible(true) // 리뷰 숨기기 모달 출력
        }>
        <View>
          <View style={styles.topReviewComponentsContainer}>
            <View style={styles.topReviewMenu}>
              <Text style={styles.postUser}>{writer}</Text>
              <Text style={styles.postDate}>{date}</Text>
            </View>
            <View style={styles.thumbsUpIcon}>
              <ThumbsUpIcon
                isActive={isReviewLiked}
                onPress={handleReviewLike}
              />
            </View>
          </View>
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
          isReviewLiked={isReviewLiked}
          onClose={closeReviewModal}
        />
      </Modal>
      <Modal visible={isReviewEditModalVisible} animationType={'fade'}>
        <ReviewEditModal
          isModalVisible={isReviewEditModalVisible}
          setIsModalVisible={setIsReviewEditModalVisible}
          writer={writer}
          date={date}
          content={content}
        />
      </Modal>
      {/* <Modal visible={isReviewHideModalVisible} animationType={'fade'}>
        <ReviewHideModal
          isModalVisible={isReviewHideModalVisible}
          setIsModalVisible={setIsReviewHideModalVisible}
          writer={writer}
          date={date}
          content={content}
        />
      </Modal> */}
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
  },
  topReviewComponentsContainer: {
    flexDirection: 'row',
  },
  topReviewMenu: {
    flex: 1,
  },
  thumbsUpIcon: {
    alignItems: 'flex-end',
    backgroundColor: 'transparent',
    marginEnd: 20,
    marginTop: 20,
  },
  postUser: {
    marginHorizontal: 20,
    marginTop: 20,
    fontSize: 15,
    fontWeight: 'bold',
  },
  postDate: {
    marginHorizontal: 20,
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

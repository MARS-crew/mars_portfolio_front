import React, {useState, useRef, useEffect} from 'react';

import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  Modal,
  Image,
  TextInput,
} from 'react-native';

import {Shadow} from 'react-native-shadow-2';
import ContentsViewPop from '../../components/commonComponent/ContentsViewPop';
import EditMode from '../../screens/Review/ReviewEdit';

const {width, height} = Dimensions.get('window');
const shadowColor = 'rgba(151, 151, 151, 0.36)';

const styles = StyleSheet.create({
  userImage: {
    width: 35,
    height: 35,
    marginRight: 10,
  },
  imageThumb: {
    width: 18,
    height: 18,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
    color: '#000000',
  },
  date: {
    marginTop: 2,
    fontSize: 12,
    color: '#9e9e9e',
  },
  reviewText: {
    fontSize: 14,
    color: '#000000',
  },
  container: {
    width: '100%',
    height: 150,
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row',
    borderColor: '#cccccc',
  },
  container2: {
    width: '100%',
    flexDirection: 'row',
    borderColor: '#cccccc',
  },
  userContentContainer: {
    flex: 1,
  },
  userContentContainerTop: {
    flexDirection: 'row',
  },
  userContentContainerBottom: {
    marginTop: 10,
  },
  userContentContainerTopElement: {
    flex: 1,
  },
  reviewTextContainer: {
    height: '100%',
  },
  editReviewText: {
    width: '100%',
    textAlignVertical: 'top',
    textAlign: 'left',
  },
});

const ReviewItem = ({
  review,
  id,
  writer,
  date,
  content,
  imageType,
  isLiked,
  currentReviewId,
  currentReviewContent,
  onEdit,
  onDelete,
  token,
  setReviewLike,
  memberId,
  currentUserId,
}) => {
  const [contentsViewPopVisible, setContentsViewPopVisible] = useState(false);
  const [reviewContent, setReviewContent] = useState(content);
  const [isReviewLiked, setIsReviewLiked] = useState(isLiked);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const inputRef = useRef();

  return (
    <Shadow distance={0.1} startColor={shadowColor} offset={[0, 12]}>
      <View style={styles.container}>
        <View style={styles.container2}>
          <View>
            <Image
              style={styles.userImage}
              source={
                imageType === 1
                  ? require('../../../assets/images/iconSmile.png')
                  : imageType === 2
                  ? require('../../../assets/images/iconWonder.png')
                  : imageType === 3
                  ? require('../../../assets/images/iconSmile.png')
                  : require('../../../assets/images/iconSmile.png')
              }
            />
          </View>

          <View style={styles.userContentContainer}>
            <View style={styles.userContentContainerTop}>
              <View style={styles.userContentContainerTopElement}>
                <Text style={styles.userName}>
                  {JSON.parse(currentUserId)[0] === memberId ? '나' : writer}
                </Text>
                <Text style={styles.date}>{date}</Text>
              </View>
              <View style={styles.thumbImageContainer}>
                <TouchableOpacity
                  onPress={() => {
                    setIsReviewLiked(!isReviewLiked);
                    setReviewLike(id);
                  }}>
                  <Image
                    style={styles.imageThumb}
                    source={
                      isReviewLiked == 1
                        ? require('../../../assets/images/thumb_active.png')
                        : require('../../../assets/images/thumb_normal.png')
                    }
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.userContentContainerBottom}>
              <TouchableOpacity
                onPress={() => setContentsViewPopVisible(true)}
                onLongPress={
                  () => setIsModalVisible(!isModalVisible) // 리뷰 수정 모달 출력
                }>
                <View style={styles.reviewTextContainer}>
                  <Text
                    style={styles.reviewText}
                    numberOfLines={3}
                    ellipsizeMode="tail">
                    {reviewContent}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <ContentsViewPop
          title={writer}
          message={content}
          contentsViewPopVisible={contentsViewPopVisible}
          setContentsViewPopVisible={setContentsViewPopVisible}
        />

        <EditMode
          review={review}
          id={id}
          writer={writer}
          reviewContent={reviewContent}
          onEdit={() => {
            onEdit();
            setIsModalVisible(!isModalVisible);
            setIsEditMode(!isEditMode);
          }}
          onCancel={() => {
            setIsModalVisible(!isModalVisible);
          }}
          inputRef={inputRef}
          currentReviewId={currentReviewId}
          currentReviewContent={currentReviewContent}
          onDelete={onDelete}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          token={token}
        />
      </View>
    </Shadow>
  );
};

export default ReviewItem;

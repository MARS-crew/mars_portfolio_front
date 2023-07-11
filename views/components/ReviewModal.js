import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ReviewModal = ({writer, date, content, isLiked, onClose}) => {
  return (
    <View style={styles.modalContainer}>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeButtonText}>X</Text>
      </TouchableOpacity>
      <View style={styles.topContentContainer}>
        <View style={styles.likeContainer}>
          <Text style={styles.postWriter}>{writer}</Text>
          <Text style={styles.postDate}>{date}</Text>
        </View>
        <Icon
          style={styles.thumbsUpIcon}
          name={isLiked ? 'thumbs-up' : 'thumbs-up'}
          size={25}
          color={isLiked ? 'blue' : 'gray'}
        />
      </View>
      <Text style={styles.postContent}>{content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f5fcff',
    padding: 20,
  },
  topContentContainer: {
    flexDirection: 'row',
  },
  postWriter: {
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
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    width: 30,
    height: 30,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  likeContainer: {
    flex: 1,
  },
  thumbsUpIcon: {
    backgroundColor: 'transparent',
    marginEnd: 20,
    marginTop: 20,
  },
});

export default ReviewModal;

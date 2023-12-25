import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import ResumeBox from '../components/ResumeBox';
import ResumeBoxMD from '../components/ResumeBoxMD';
import FAB from '../components/FloatingMenu';
import ResumeEditMode from "../components/ResumeEditMode";
import SwiperFlatList from 'react-native-swiper-flatlist';
import { useIndexContext } from '../../IndexContext';

const { width, height } = Dimensions.get('window');


const DATA = [
  { id: "0", name: "이화진" },
  { id: "1", name: "조호연" },
  { id: "2", name: "김건우" },
];

const Resume = () => {
  const { currentIndex, changeIndex } = useIndexContext();
  const [modalOpen, setModalOpen] = useState(false);
  const [resume, setResume] = useState(true);

  const [resumeBoxHeight, setResumeBoxHeight] = useState(0);




  const swiperRef = useRef(null);
  useEffect(() => {
    if (swiperRef.current && DATA.length > 0 && currentIndex !== undefined) {
      swiperRef.current.scrollToIndex({
        index: currentIndex,
        animated: true,
      });
    }
  }, [currentIndex, swiperRef]);

  const handleScroll = event => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const newIndex = Math.round(offsetY / height);
    changeIndex(newIndex);
    console.log(currentIndex);
  };

  const Item = ({ item, index }) => {
    return (
      <View>
        <TouchableOpacity
          onLongPress={toggleModal}
          activeOpacity={100}
        >
          {modalOpen ? (
            <ResumeBoxMD item={item} />
          ) : (
            <ResumeBox item={item} />
          )}
        </TouchableOpacity>
      </View>
    );
  };

  const renderItem = ({ item, index }) => (
    <Item item={item} index={index} />
  );

  const toggleModal = () => {
    if (modalOpen) {
      return false;
    }
    console.log('나는챌린')
    setModalOpen((prev) => {
      console.log("야호")
      return !prev;
    });
  };

  return (
    <View style={styles.container}>
      <SwiperFlatList
        ref={swiperRef}
        vertical={true}
        data={DATA}
        renderItem={renderItem}
        index={currentIndex}
        keyExtractor={(item) => item.id.toString()} // keyExtractor 추가
        onScroll={handleScroll}
      />
      <FAB />
      <ResumeEditMode
        resume={resume}
        isModalVisible={modalOpen}
        setIsModalVisible={setModalOpen}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 400,
    flex: 2,
    backgroundColor: '#F3F6FE',
  },
});

export default Resume;

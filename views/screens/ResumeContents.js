import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, FlatList, Image, Dimensions } from 'react-native';
import ResumeBox from '../components/ResumeBox';
import ResumeBoxMD from '../components/ResumeBoxMD';
import FAB from '../components/FloatingMenu';
import ResumeEditMode from "../components/ResumeEditMode";
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import SwiperFlatList from 'react-native-swiper-flatlist';
import SwiperFlatListComponent from '../components/SwiperFlatListComponent';
import { useIndexContext } from '../../IndexContext';



const Title = [
  {
    id: '1',
    name: '간단소개',
  },
  {
    id: '2',
    name: '기본정보',
  },
  {
    id: '3',
    name: '경력',
  },
  {
    id: '4',
    title: '수상내역',
  },
  {
    id: '5',
    title: '관심분야',
  },
  {
    id: '6',
    title: '전문분야',
  },
  {
    id: '7',
    title: '보유기술',
  },
];

const DATA = [
  {
    id: "1",
    name: "이화진"
  }, {
    id: "2",
    name: "조호연"
  },
  {
    id: "3",
    name: "김건우"
  },
]


const Resume = ({ }) => {



  const { currentIndex, changeIndex } = useIndexContext();
  const swiperRef = useRef(null);
  useEffect(() => {
    // if (swiperRef.current && data.length > 0 && currentIndex !== undefined) {
    if (swiperRef.current > 0 && currentIndex !== undefined) {
      swiperRef.current.scrollToIndex({
        index: currentIndex,
        animated: true,
      });
    }
  }, [currentIndex, swiperRef]);

  const height = Dimensions.get('window').height;
  const handleScroll = event => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const newIndex = Math.round(offsetY / height);
    // IndexData.setIndexValue(index);
    changeIndex(newIndex);
  };
  // console.log('5번째 스크린 기수 인덱스: ', currentIndex);


  const [modalOpen, setModalOpen] = useState(false); // 수정 모달 상태
  const [resume, setResume] = useState(true); // 인터뷰 페이지인지 확인하는 스테이트
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



  const Item = ({ item }) => {
    return (
      // <ScrollView>
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
      // </ScrollView>
    );
  };

  // ) <ResumeBox item={item} modalOpen={modalOpen} />; // Pass modalOpen as a prop


  return (
    <View style={styles.container}>
      {/* <TouchableOpacity 
        onPress={toggleModal}
        activeOpacity={100} > */}
      <FlatList
        data={DATA}
        renderItem={({ item }) => (<Item item={item} />)}
        keyExtractor={item => item.id}
        index={currentIndex}
        onScroll={handleScroll}
      />
      <FAB />
      <ResumeEditMode
        resume={resume}
        isModalVisible={modalOpen}
        setIsModalVisible={setModalOpen}
      />
      {/* </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 400,
    // padding: 25,
    flex: 2,
    backgroundColor: '#F3F6FE',
  },
});

export default Resume;
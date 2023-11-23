import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, FlatList, Image, Dimensions } from 'react-native';
import ResumeBox from '../components/ResumeBox';
import ResumeBoxMD from '../components/ResumeBoxMD';
import FAB from '../components/FloatingMenu';
import ResumeEditMode from "../components/ResumeEditMode";
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import SwiperFlatList from 'react-native-swiper-flatlist';
import { useIndexContext } from '../../IndexContext';

const DATA = [
  [
    {
      id: '1',
      title: '간단소개',
    },
    {
      id: '2',
      title: '기본정보',
    },
    {
      id: '3',
      title: '경력',
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
    }
  ], [
    {
      id: '1',
      title: '간단소개',
    },
    {
      id: '2',
      title: '기본정보',
    },
    {
      id: '3',
      title: '경력',
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
    }
  ],
  [
    {
      id: '1',
      title: '간단소개',
    },
    {
      id: '2',
      title: '기본정보',
    },
    {
      id: '3',
      title: '경력',
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
    }
  ],
];

const ResumeContents = (swiperIndex, setSwiperIndex) => {

  const { currentIndex, changeIndex } = useIndexContext();
  const swiperRef = useRef(null);
  useEffect(() => {
    // if (swiperRef.current && data.length > 0 && currentIndex !== undefined) {
    if (swiperRef.current)
      swiperRef.current.scrollToIndex({
        index: currentIndex,
        animated: true,
      });
  }, [currentIndex, swiperRef]);

  const height = Dimensions.get('window').height;
  const handleScroll = event => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const newIndex = Math.round(offsetY / height);
    // IndexData.setIndexValue(index);
    changeIndex(newIndex);
  }
  console.log('4번째 스크린 기수 인덱스: ', currentIndex);



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
      <SafeAreaView>
        <TouchableOpacity
          onLongPress={toggleModal}
          activeOpacity={100}
        >
          <ScrollView>
            {modalOpen ? (
              <ResumeBoxMD item={item} />
            ) : (
              <ResumeBox item={item} />
            )}
          </ScrollView>
        </TouchableOpacity>
      </SafeAreaView>
    );
  };

  // ) <ResumeBox item={item} modalOpen={modalOpen} />; // Pass modalOpen as a prop


  return (
    <SafeAreaView style={styles.container}>
      {/* <TouchableOpacity 
        onPress={toggleModal}
        activeOpacity={100} > */}
      {/* <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      /> */}
      <SwiperFlatList
        ref={swiperRef}
        vertical={true}
        data={DATA}
        renderItem={({ item }) => <Item item={item} />}
        index={currentIndex}
        onScroll={handleScroll}
        hideShadow={true}
      />
      <FAB />
      <ResumeEditMode
        resume={resume}
        isModalVisible={modalOpen}
        setIsModalVisible={setModalOpen}
      />
      {/* </TouchableOpacity> */}
    </SafeAreaView>
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

export default ResumeContents;
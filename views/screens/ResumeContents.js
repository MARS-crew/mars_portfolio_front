import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import ResumeBox from '../components/ResumeBox';
import ResumeBoxMD from '../components/ResumeBoxMD';
import FAB from '../components/FloatingMenu';
import ResumeEditMode from "../components/ResumeEditMode";
import SwiperFlatList from 'react-native-swiper-flatlist';
import { useIndexContext } from '../../IndexContext';
import SwiperFlatListComponent from '../components/SwiperFlatListComponent';
import axios from 'axios';

const { width, height } = Dimensions.get('window');


const DATA = [
  {
    id: '0',
    name: '이화진',
  },
  {
    id: '1',
    name: '조호연',
  },
  {
    id: '2',
    name: '김건우',
  },
];

const fetchResume = async ({ token }) => {
  try {
    const response = await axios({
      method: 'get',
      url: 'http://172.20.10.4:3000/api/v1/resume',
      headers: {
        Authorization: token,
      },
    });


    const extractedData = {
      // ***** 아래 데이터 지우지 말아주세요 *****

      // resume_id: response.data.data.resume_id, //이력서 아이디
      // introduce: response.data.data.introduce, //이력서 소개
      // addr: response.data.data.addr, //주소
      // detail_addr: response.data.data.detail_addr, //상세주소
      // email: response.data.data.email, //이메일
      // tel: response.data.data.tel, //전화번호
      // name: response.data.data.name, //이름
      // award_name: response.data.data.award_name, //수상이름
      // issuer: response.data.data.issuer, //표창기관
      // com_name: response.data.data.com_name, //회사이름
      // started_date: response.data.data.started_date, //회사 입사일
      // period: response.data.data.period, //재직기간
      // rank: response.data.data.rank, //직급
      // duty: response.data.data.duty, //업무
      // group_id: response.data.data.group_id, //그룹아이디
      data: response.data.data
    };
    console.log('제발제발제발' + extractedData.data[0].resume_id)

    return extractedData;

  } catch (error) {
    console.error(error);
  }
};

const Resume = ({ token }) => {
  const { currentIndex, changeIndex, horizontalIndex, changeHorizontalIndex, dataIndex, changeDataIndex, selectedMemId, changeSelectedMemId } = useIndexContext();
  const swiperRef = useRef(null);
  const [itemHeights, setItemHeights] = useState({});
  const [resumeData, setResumeData] = useState(null);
  const height = Dimensions.get('window').height;
  // const handleScroll = event => {
  //   const offsetY = event.nativeEvent.contentOffset.y;
  //   const newIndex = Math.round(offsetY / height);
  //   changeIndex(newIndex);
  //   console.log(currentIndex);
  // };
  const [modalOpen, setModalOpen] = useState(false); // 수정 모달 상태
  const [resume, setResume] = useState(true); // 인터뷰 페이지인지 확인하는 스테이트
  const toggleModal = () => {
    if (modalOpen) {
      return false;
    }
    console.log('나는챌린');
    setModalOpen(prev => {
      console.log('야호');
      return !prev;
    });
  };
  const keyExtractor = item => item.id;
  const getItemLayout = (data, index) => ({
    length: itemHeights[index],
    offset: itemHeights[index] * index,
    index,
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchResume({ token });
      setResumeData(data);
    };
    fetchData();
  }, [token]);

  // useEffect(() => {
  //   if (swiperRef.current > 0 && currentIndex !== undefined) {
  //     swiperRef.current.scrollToIndex({
  //       index: currentIndex,
  //       animated: true,
  //     });
  //   }
  // }, [currentIndex, swiperRef]);

  const Item = ({ item, index }) => {
    return (
      <TouchableOpacity onLongPress={toggleModal} activeOpacity={100}>
        {modalOpen ? (
          <ResumeBoxMD item={item} token={token} />
        ) : (
          <ResumeBox
            item={item}
            token={token}
            index={index}
            data={resumeData}
          />
        )}
      </TouchableOpacity>
    );
  };


  return (
    <View style={styles.container}>
      <FlatList
        // ref={swiperRef}
        vertical={true}
        data={DATA}
        renderItem={({ item, index, token }) => (
          <Item item={item} index={index} token={token} />
        )}
        keyExtractor={keyExtractor}
        removeClippedSubviews={true}
      // initialScrollIndex={currentIndex}
      // onScroll={handleScroll}
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

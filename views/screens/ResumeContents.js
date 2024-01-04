import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, FlatList, Image, Dimensions } from 'react-native';
import ResumeBox from '../components/ResumeBox';
import ResumeBoxMD from '../components/ResumeBoxMD';
import FAB from '../components/FloatingMenu';
import ResumeEditMode from '../components/ResumeEditMode';
import _ from 'lodash';  // lodash 라이브러리 사용
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import SwiperFlatList from 'react-native-swiper-flatlist';
import SwiperFlatListComponent from '../components/SwiperFlatListComponent';
import { useIndexContext } from '../../IndexContext';
import axios from 'axios';

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
      // url: 'http://api.mars-port.duckdns.org/api/v1/resume',
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
      data: response.data.data,
    };
    // const parseData = JSON.parse(extractedData);
    //  console.log(extractedData.)
    // console.log(extractedData.data[0].technology);

    return extractedData;
  } catch (error) {
    console.error(error);
  }
};

const Resume = ({ token }) => {
  const { currentIndex, changeIndex,
    horizontalIndex, changeHorizontalIndex,
    dataIndex, changeDataIndex,
    selectedGroupId, changeSelectedGroupId,
    selectedMemId, changeSelectedMemId,
    selectedMember, changeSelectedMember } = useIndexContext(); const swiperRef = useRef(null);
  const [itemHeights, setItemHeights] = useState({});
  const [resumeData, setResumeData] = useState([]);
  const height = Dimensions.get('window').height;
  // 스와이프 진행시 인덱스 변경
  const handleVerticalScroll = event => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const newIndex = Math.round(offsetY / height);
    const selectedData = resumeData[newIndex];

    if (horizontalIndex == 4) {
      if (selectedData) {
        changeSelectedMemId(selectedData.member_id);
        console.log("dd");
        if (selectedData.group_id !== selectedGroupId) {
          changeSelectedGroupId(selectedData.group_id);
        }
      }
      changeDataIndex(newIndex);
    }
  };
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

  useEffect(() => {
    console.log(`Token 이력서: ${token}`);
    const fetchData = async () => {
      const data = await fetchResume({ token });
      const sortedAndGroupedData = _.chain(data['data'])
        .sortBy(['group_id', 'member_id'])
        .value();
      setResumeData(sortedAndGroupedData);
    };
    fetchData();
  }, [token]);
  useEffect(() => {
    console.log("dasta: ", resumeData);
  }, [resumeData]);

  useEffect(() => {
    if (swiperRef.current > 0 && currentIndex !== undefined) {
      swiperRef.current.scrollToIndex({
        index: currentIndex,
        animated: false,
      });
    }
  }, [currentIndex, swiperRef]);

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
      <SwiperFlatList
        ref={swiperRef}
        vertical={true}
        data={resumeData}
        renderItem={({ item, index, token }) => (
          <Item item={item} index={index} token={token} />
        )}
        // keyExtractor={keyExtractor}
        index={dataIndex}
        onScroll={handleVerticalScroll}
        listKey={(item, index) => `swiperFlatList_${index}_${item.resume_id}`}

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
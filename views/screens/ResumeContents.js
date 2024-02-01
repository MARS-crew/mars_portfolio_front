import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, FlatList, Image, Dimensions } from 'react-native';
import ResumeBox from '../components/ResumeBox';
import ResumeBoxMD from '../components/ResumeBoxMD';
import FAB from '../components/FloatingMenu';
import ResumeEditMode from '../components/ResumeEditMode';
import _ from 'lodash'; // lodash 라이브러리 사용
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import SwiperFlatList from 'react-native-swiper-flatlist';
import SwiperFlatListComponent from '../components/SwiperFlatListComponent';
import { useIndexContext } from '../../IndexContext';
import axios from 'axios';
import {getResumes} from "../../api/v1/resume";
import {useDispatch, useSelector} from "react-redux";
import {getResumeListSelector} from "../../redux/slice/ResumeSlice";
import {getCurrentMemberIdSelector} from "../../redux/slice/UiRenderSlice";

const fetchResume = async ({ token }) => {
  try {
    const response = await getResumes(token);

    // const response = await axios({
    //   method: 'get',
    //   url: 'https://api.writeyoume.com/api/v1/resume',
    //   headers: {
    //     Authorization: token,
    //   },
    // });

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
  const height = Dimensions.get('screen').height;


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


  const dispatch = useDispatch();
  const _resumeList = useSelector(getResumeListSelector);
  const [resumeList, setResumeList] = useState(_resumeList);
  const _memberId = useSelector(getCurrentMemberIdSelector);

  useEffect(() => {
    setResumeList(_resumeList)
  }, [_resumeList]);



  const sortedAndGroupedData = _.chain(resumeList)
      .sortBy('member_id')
      .groupBy('group_id')
      .values()
      .value();

  console.log(`resume data`)

  const viewData = _.chain(sortedAndGroupedData[0])
      .find({ "member_id": _memberId})
      .value()


  const Item = ({ item, index }) => {
    return (
        <TouchableOpacity onLongPress={toggleModal} activeOpacity={100}>
          <ScrollView>
          {modalOpen ? (
              <ResumeBoxMD item={item} token={token} />
          ) :
              (
              <ResumeBox
                  item={item}
                  token={token}
                  index={index}
                  data={item}
              />
          )}
          </ScrollView>
        </TouchableOpacity>
    );
  };

  return (
      <View style={styles.container}>
        { (typeof(viewData) == 'undefined' || viewData == null || viewData.loop === 0) && <Image
            source={require('../../assets/images/Rectangle.png')}
            style={{width: '100%', height: '100%', flex: 10000000}}
            resizeMode="cover"
        />}
          {/*{resumeList && resumeList.map((singleItem, index) => (*/}
          {/*    <Item item={singleItem} index={index} token={token} />*/}
          {/*))}*/}
        {/*<ScrollView>*/}
        {/*<Item item={viewData} index={0} token={token} />*/}
        {/*</ScrollView>*/}
        <SwiperFlatList
            // ref={swiperRef}
            vertical={true}
            data={[viewData]}
            renderItem={({ item, index, token }) => (
                <Item item={item} index={index} token={token} />
            )}
            // keyExtractor={keyExtractor}
            index={0}
            // onScroll={handleVerticalScroll}
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
    width: '100%',
    flex: 2,
    backgroundColor: '#F3F6FE',
  },
});

export default Resume;

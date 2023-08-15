import React, {useState} from 'react';
import {StyleSheet, View, FlatList, Image} from 'react-native';
import ResumeBox from '../components/ResumeBox';
import ResumeBoxMD from '../components/ResumeBoxMD';
import FAB from '../components/FloatingMenu';
import ResumeEditMode from '../components/ResumeEditMode';
import {TouchableOpacity} from 'react-native-gesture-handler';

const DATA = [
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
  },
];

const Resume = () => {
  const [modalOpen, setModalOpen] = useState(false); // 수정 모달 상태
  const [resume, setResume] = useState(true); // 인터뷰 페이지인지 확인하는 스테이트
  const toggleModal = () => {
    setModalOpen(prevState => !prevState);
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity onLongPress={toggleModal} activeOpacity={100}>
        {modalOpen ? <ResumeBoxMD item={item} /> : <ResumeBox item={item} />}
      </TouchableOpacity>
    );
  };

  // ) <ResumeBox item={item} modalOpen={modalOpen} />; // Pass modalOpen as a prop

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleModal} activeOpacity={100}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
        <FAB yourData={`3`} />
        <ResumeEditMode
          resume={resume}
          isModalVisible={modalOpen}
          setIsModalVisible={setModalOpen}
        />
      </TouchableOpacity>
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

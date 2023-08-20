import React, {useState} from 'react';
import {View, SafeAreaView, FlatList, StyleSheet, Alert ,Text} from 'react-native';
import FAB from '../../components/FloatingMenu';
import PortfolioItem from '../Portfolio/PortfolioItem';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  gridView: {
    padding: 5,
    paddingTop: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState(true); //포트폴리오 페이지인지 확인하는 스테이트
  const numColumns = 2;
  const [portfolioData, setPortfolioData] = useState([
    {
      id: '1',
      title: '인터뷰 영상',
      src: require('../../../assets/video/videoTestData.mp4'),
      code: '1',
      message: `🌱마스외전 깍두기 조호연 학생의 인터뷰 영상
      \n"왕깍두기 개발자", "호연지기", "아바타"
      \n프론트엔드 개발자를 꿈꾸는 산업기능요원의 포부가 담긴 인터뷰`,
    },
    {
      id: '2',
      title: '프로필 사진',
      src: require('../../../assets/images/cameraTestData.png'),
      code: '2',
      message: `👋안녕하세요 깍두기 조호연입니다
      \n👀현재 웹 개발에 관심이 있습니다
      \n🌱주로 React와 React Native를 통해 개발합니다.
      \n💞️공동개발에 협력하겠습니다
      \n📫 자세한 사항은 akftjd100@naver.com 으로 문의주세요.`,
    },
    {
      id: '3',
      title: 'GitHub 링크',
      src: require('../../../assets/images/linkTestData_2.png'),
      code: '3',
      message: 'https://github.com/20200890-JoHoYeon',
    },
    {
      id: '2',
      title: 'STA+C(Smarteen App Challenge)2018',
      src: require('../../../assets/images/cameraTestData_2.jpeg'),
      code: '7',
      message: `1️⃣생활정보부문 보고서 예선 통과 > 프로젝트 고도화
      \n2️⃣발표/면접 본선 통과 > 순천향대 본선 캠프 > 멘토링
      \n3️⃣대강당 발표/ 최종 결과 발표 > 결선 통과
      \n🏃‍♂️ 생활정보 부문 장애인 콜택시 WeR팀 가작 수상`,
    },
    {
      id: '2',
      title: 'STA+C(Smarteen App Challenge)2018 캠프',
      src: require('../../../assets/images/cameraTestData_3.png'),
      code: '8',
      message: `1️⃣순천향대 본선 캠프 
      \n2️⃣안드로이드 교육
      \n3️⃣기획 교육 > 멘토링
      \n🏃‍♂️ 생활정보 부문 장애인 콜택시 WeR팀 가작 수상`,
    },
    {
      id: '3',
      title: 'VeLog 링크',
      src: require('../../../assets/images/linkTestData_4.png'),
      code: '4',
      message: 'https://velog.io/@akftjd100',
    },
    {
      id: '3',
      title: '개인 프로젝트 링크',
      src: require('../../../assets/images/linkTestData_5.png'),
      code: '5',
      message: 'https://20200890-johoyeon.github.io/kokoa-clone-2020',
    },
    {
      id: '3',
      title: 'Tistory 링크',
      src: require('../../../assets/images/linkTestData_3.png'),
      code: '6',
      message: 'https://akftjd100.tistory.com',
    },

    {
      id: '5',
      title: '',
      src: require('../../../assets/images/emptyImg.png'),
      code: '9',
      message: '',
    },

    {
      id: '5',
      title: '',
      src: require('../../../assets/images/emptyImg.png'),
      code: '10',
      message: '',
    },
    {
      id: '6',
      title: '생성',
      src: require('../../../assets/images/add.png'),
    },
  ]);

  // 플랫 리스트 데이터 item 수정 기능(개발 방식 검토중인 기능이므로 구현 미완료)
  const onModify = ({code}) => {
    Alert.alert(
      '확인 테스트',
      'Props: onModify() \n\nPortfolio > PortfolioItem\n > PortfolioModal > DetailPop',
    );
  };

  // 플랫 리스트 데이터 item 삭제 기능(개발 방식 검토중인 기능이므로 구현 미완료)
  const onDelete = ({code}) => {
    Alert.alert(
      '삭제 테스트',
      'Props: onDelete() \n\nPortfolio > PortfolioItem\n > PortfolioModal ',
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.gridView}>
          <FlatList
            data={portfolioData}
            renderItem={({item}) => (
              <PortfolioItem
                portfolio={portfolio}
                id={item.id}
                title={item.title}
                src={item.src}
                message={item.message}
                code={item.code}
                onModify={onModify}
                onDelete={onDelete}></PortfolioItem>
            )}
            keyExtractor={(item, index) => index}
            numColumns={numColumns}
          />
        </View>
      </SafeAreaView>
      <FAB />
    </View>
  );
};

export default Portfolio;

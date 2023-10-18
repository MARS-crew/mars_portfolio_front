import React, {useState, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  FlatList,
  StyleSheet,
  Alert,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import FAB from '../../components/FloatingMenu';
import PortfolioItem from '../Portfolio/PortfolioItem';
import DetailPop from './DetailPop';
import axios from 'axios'; // axios import 합니다.
import {Shadow} from 'react-native-shadow-2';
import addBtn from '../../../assets/images/add.png';
const {width, height} = Dimensions.get('window');
const squareSize = Math.min(width, height) * 0.4;

const styles = StyleSheet.create({
  content: {
    width: 54,
    height: 54,
    borderWidth: 1,
    borderRadius: 10,
  },
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
  gridItem: {
    width: squareSize,
    height: squareSize,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 10,
    display: 'flex',
    borderColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15,
  },
});

const Portfolio = () => {
  const [detailPopVisible, setDetailPopVisible] = useState(false);
  const [data, setData] = useState([]);
  const [fileIdLength, setFileIdLength] = useState(null);
  const [portfolio, setPortfolio] = useState(true); //포트폴리오 페이지인지 확인하는 스테이트
  const numColumns = 2;

  const shadowColor = 'rgba(151, 151, 151, 0.36)';

  useEffect(() => {
    const source = axios.CancelToken.source();
    axios({
      method: 'get',
      url: 'http://10.0.2.2:3000/api/v1/portfolio/',
      headers: {
        Authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InNuc19pZCI6MjAsIm1lbWJlcl9pZCI6NDYsInR5cGUiOiJnb29nbGUiLCJuYW1lIjoi7Zi465Sx7J20IiwiYWNjZXNzX3Rva2VuIjoieWEyOS5hMEFmQl9ieUN5WG5uUWk5WF9sSGgwM0VERXlpRTNQMmZ3Q25IbGtkYmRIY2l4VGRzNTQtZDRKM285ckYzV2c2YnVGeEg3Yk9aLWxLQlNPNG1qUnpxd2Mzb2RMeF9nYmUzRmhYdElRQldyVEtldnItWS1BMTdxa0tfd2FGT1dfeV9JWjFpVncwRG9PcFZpa3JST0RMa3NqeGtuQWFHVDBfY0NUYUZSYUNnWUtBVFlTQVJNU0ZRR09jTm5DLWdONzNtNkdNQnpHeXA4S0o3b2x1ZzAxNzEiLCJyZWZyZXNoX3Rva2VuIjpudWxsLCJhdXRoX2NvZGUiOm51bGwsImNvbm5lY3RfZGF0ZSI6IjIwMjMtMTAtMDlUMDI6NDk6MjcuMDAwWiJ9LCJpYXQiOjE2OTc2MTg3ODUsImV4cCI6MTY5NzYyMjM4NX0.d8HunIzNkCkJuslFO-5Sr4418LH2YARxXGT7czp3ACU',
      },
      cancelToken: source.token,
    })
      .then(function (response) {
        const extractedData = response.data.data.map(item => ({
          member_id: item.member_id,
          portfolio_id: item.portfolio_id,
          title: item.title,
          description: item.description,
          reg_date: item.reg_date,
          mod_date: item.mod_date,
          kind: item.kind,

          file_id: item.file_id,
          ext: item.ext,
          url: item.url,
          del_yn: item.del_yn,
        }));
        setData(extractedData);

        const fileIdData = response.data.data.map(item => ({
          file_id: item.file_id,
        }));
        const fileIdLength = fileIdData.length;
        console.log(fileIdData);
        console.log(fileIdLength);

        //console.log(response);
        // console.log(
        //   'file_id--------------------------------------------------',
        // );
        // console.log(
        //   response.data.data.map(item => ({
        //     file_id: item.file_id,
        //   })),
        // );
        // console.log('ext--------------------------------------------------');
        // console.log(
        //   response.data.data.map(item => ({
        //     ext: item.ext,
        //   })),
        // );
        // console.log('uri--------------------------------------------------');
        // console.log(
        //   response.data.data.map(item => ({
        //     url: item.url,
        //   })),
        // );
        // console.log('del_yn--------------------------------------------------');
        // console.log(
        //   response.data.data.map(item => ({
        //     del_yn: item.del_yn,
        //   })),
        // );
      })
      .catch(function (error) {
        console.log(error);
      });

    return () => {
      isMounted = false;
      source.cancel('API 호출이 취소되었습니다.');
    };
  }, []);

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

  const renderListItem = ({item}) => {
    const emptyItemCount = fileIdLength % numColumns;
    if (emptyItemCount === 1) {
      return (
        <Shadow distance="12" startColor={shadowColor} offset={[15, 15]}>
          <TouchableOpacity
            style={styles.gridItem}
            onPress={() => setDetailPopVisible(!detailPopVisible)}>
            <View>
              <Image source={addBtn} style={styles.content} />
            </View>
          </TouchableOpacity>
        </Shadow>
      );
    }

    return (
      <PortfolioItem
        portfolio={portfolio}
        onModify={onModify} //생성 테스트
        onDelete={onDelete} //삭제 테스트
        member_id={item.member_id} //member_id: item.member_id
        id={item.portfolio_id} // portfolio_id: item.portfolio_id,
        title={item.title} // title: item.title
        message={item.description} //description: item.description
        reg_date={item.reg_date} //reg_date: item.reg_date
        mod_date={item.mod_date} //mod_date: item.mod_date
        code={item.kind} //kind: item.kind
        file_id={item.file_id} //item.file.file_id
        src={item.url} // url: item.file.url
        ext={item.ext} //ext: item.file.ext,
        del_yn={item.del_yn}></PortfolioItem>
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.gridView}>
          <FlatList
            data={data}
            renderItem={renderListItem}
            keyExtractor={(item, index) => index}
            numColumns={numColumns}
            ListFooterComponent={
              <Shadow distance="12" startColor={shadowColor} offset={[15, 15]}>
                <TouchableOpacity
                  style={styles.gridItem}
                  onPress={() => setDetailPopVisible(!detailPopVisible)}>
                  <View>
                    <Image source={addBtn} style={styles.content} />
                  </View>
                </TouchableOpacity>
              </Shadow>
            }
          />
          <DetailPop
            onModify={onModify}
            setDetailPopVisible={setDetailPopVisible}
            detailPopVisible={detailPopVisible}></DetailPop>
        </View>
      </SafeAreaView>
      <FAB />
    </View>
  );
};

export default Portfolio;

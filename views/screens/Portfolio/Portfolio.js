import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
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
import SwiperFlatList from 'react-native-swiper-flatlist';
import {useIndexContext} from '../../../IndexContext';

const {width, height} = Dimensions.get('window');
const squareSize = Math.min(width, height) * 0.4;

// const numColumns = 2;
// const itemWidth = (Dimensions.get('window').width * 0.4) / numColumns; // 각 항목의 너비 계산

const styles = StyleSheet.create({
  content: {
    width: 54,
    height: 54,
    borderWidth: 1,
    borderRadius: 10,
  },
  container: {
    height: height,
    width: width,
    flex: 1,
    backgroundColor: '#fff',
  },

  gridView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    margin: 9,
  },
  gridItem: {
    width: squareSize, // 두 항목이 한 줄에 올 수 있도록 너비를 조정
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

const Portfolio = ({token}) => {
  const {currentIndex, changeIndex} = useIndexContext();
  const swiperRef = useRef(null);
  useEffect(() => {
    if (swiperRef.current && data.length > 0 && currentIndex !== undefined) {
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
  // console.log('4번째 스크린 기수 인덱스: ', currentIndex);

  const [detailPopVisible, setDetailPopVisible] = useState(false);
  const [data, setData] = useState([]);
  const [fileIdLength, setFileIdLength] = useState(null);
  const [portfolio, setPortfolio] = useState(true); //포트폴리오 페이지인지 확인하는 스테이트
  // const numColumns = 2;
  // const itemWidth = (Dimensions.get('window').width - 10) / numColumns; // 각 항목의 너비 계산
  const member_id = 44;

  useEffect(() => {
    console.log(`Token 포트폴리오: ${token}`);
    const source = axios.CancelToken.source();
    axios({
      method: 'get',
      // url: `http://172.16.101.59:3000/api/v1/portfolio/${member_id}`,
      url: `http://api.mars-port.duckdns.org/api/v1/portfolio/${member_id}`,
      headers: {
        Authorization: token,
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
          url: `http://10.0.2.2:3000/${item.url.replace(
            'http://172.20.10.4:3000/',
            '',
          )}`,
          del_yn: item.del_yn,
        }));
        setData(extractedData);
      })
      .catch(function (error) {
        console.log(error);
      });

    return () => {
      isMounted = false;
      source.cancel('API 호출이 취소되었습니다.');
    };
  }, [token]);

  // 플랫 리스트 데이터 item 수정 기능(개발 방식 검토중인 기능이므로 구현 미완료)
  const onModify = id => {
    Alert.alert(
      '확인 테스트',
      'Props: onModify() \n\nPortfolio > PortfolioItem\n > PortfolioModal > DetailPop',
    );
  };

  // 플랫 리스트 데이터 item 삭제 기능(개발 방식 검토중인 기능이므로 구현 미완료)
  const onDelete = id => {
    Alert.alert(
      '삭제 테스트',
      'Props: onDelete() \n\nPortfolio > PortfolioItem\n > PortfolioModal ',
    );
  };

  const Item = ({
    item,
    index,
    portfolio,
    onModify,
    onDelete,
    detailPopVisible,
    setDetailPopVisible,
    token,
  }) => {
    const shadowColor = 'rgba(151, 151, 151, 0.36)';
    return (
      <View style={styles.container}>
        <SafeAreaView>
          <ScrollView>
            <View style={styles.gridView}>
              {data.map((item, index) => (
                <View style={styles.gridItem} key={index}>
                  <PortfolioItem
                    portfolio={portfolio}
                    onModify={onModify}
                    onDelete={onDelete}
                    member_id={item.member_id}
                    id={item.portfolio_id}
                    title={item.title}
                    message={item.description}
                    reg_date={item.reg_date}
                    mod_date={item.mod_date}
                    code={item.kind}
                    file_id={item.file_id}
                    src={item.url}
                    ext={item.ext}
                    del_yn={item.del_yn}
                    token={token}
                  />
                </View>
              ))}
              <Shadow distance="12" startColor={shadowColor} offset={[15, 15]}>
                <TouchableOpacity
                  style={styles.gridItem}
                  onPress={() => setDetailPopVisible(!detailPopVisible)}>
                  <View>
                    <Image source={addBtn} style={styles.content} />
                  </View>
                </TouchableOpacity>
              </Shadow>
              <DetailPop
                code={1}
                register={true}
                onModify={onModify}
                setDetailPopVisible={setDetailPopVisible}
                detailPopVisible={detailPopVisible}
                token={token}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <SwiperFlatList
        ref={swiperRef}
        vertical={true}
        data={data}
        renderItem={({item, index}) => (
          <Item
            item={item}
            portfolio={portfolio}
            onModify={onModify}
            onDelete={onDelete}
            index={index}
            detailPopVisible={detailPopVisible}
            setDetailPopVisible={setDetailPopVisible}
            token={token}
          />
        )}
        index={currentIndex}
        onScroll={handleScroll}
        hideShadow={true}
      />
      <FAB />
    </SafeAreaView>
  );
};

export default Portfolio;

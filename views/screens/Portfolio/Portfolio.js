import React, { useState, useEffect, useRef } from 'react';
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
  FlatList,
} from 'react-native';
import _, { iteratee } from 'lodash';  // lodash 라이브러리 사용
import FAB from '../../components/FloatingMenu';
import PortfolioItem from '../Portfolio/PortfolioItem';
import DetailPop from './DetailPop';
import axios from 'axios'; // axios import 합니다.
import { Shadow } from 'react-native-shadow-2';
import addBtn from '../../../assets/images/add.png';
import SwiperFlatList from 'react-native-swiper-flatlist';
import { useIndexContext } from '../../../IndexContext';
import { useUser } from '../../../LoginUserContext';
import GroupItem from '../../components/GroupItem';
import { useLoadingContext } from '../../../LoadingContext';
import {getPortfolios} from "../../../api/v1/portfolio";
import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "../../../redux/RootReducer";
import {getPortfolioListSelector, setPortfolioList} from "../../../redux/slice/PortfolioSlice";
import {getInterviewListSelector} from "../../../redux/slice/InterviewSlice";

const { width, height } = Dimensions.get('window');
const squareSize = Math.min(width, height) * 0.4;

const styles = StyleSheet.create({
  content: {
    width: 64,
    height: 64,
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
    //  margin: 9,
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

const Portfolio = ({ token, idx }) => {
  const { currentIndex, changeIndex,
    horizontalIndex, changeHorizontalIndex,
    dataIndex, changeDataIndex,
    selectedMemId, changeSelectedMemId,
    selectedGroupId, changeSelectedGroupId
  } = useIndexContext();

  const { loading, changeLoading } = useLoadingContext();
  const swiperRef = useRef(null);
  const { user, storeUser } = useUser();

  useEffect(() => {
    if (swiperRef.current && data.length > 0 && currentIndex !== undefined) {
      swiperRef.current.scrollToIndex({
        index: dataIndex,
        animated: true,
      });
    }
  }, [dataIndex, swiperRef]);

  const handleVerticalScroll = event => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const newIndex = Math.round(offsetY / height);
    const selectedData = data[newIndex];

    if (horizontalIndex == 3) {
      if (selectedData) {
        changeSelectedMemId(selectedData[0].member_id);
        if (selectedData[0].group_id !== selectedGroupId) {
          changeSelectedGroupId(selectedData[0].group_id);
        }
      }
      changeDataIndex(newIndex);
    }
  };

  const [detailPopVisible, setDetailPopVisible] = useState(false);
  const [data, setData] = useState([]);

  const dispatch = useDispatch()
  const [fileIdLength, setFileIdLength] = useState(null);
  const [portfolio, setPortfolio] = useState(true); //포트폴리오 페이지인지 확인하는 스테이트



  const _portfolioList = useSelector(getPortfolioListSelector);
  const [portfolioList, setPortfolioList] = useState(_portfolioList); //포트폴리오 페이지인지 확인하는 스테이트

  useEffect(() => {
    setPortfolioList(_portfolioList)
  }, [_portfolioList]);

  // const transformDataForSwiper = data => {
  //   const transformedData = data.map(groupItems =>
  //     groupItems.map(singleItem => ({
  //       group_id: singleItem.group_id,
  //       member_id: singleItem.member_id,
  //       portfolio_id: singleItem.portfolio_id,
  //       title: singleItem.title,
  //       description: singleItem.description,
  //       reg_date: singleItem.reg_date,
  //       mod_date: singleItem.mod_date,
  //       kind: singleItem.kind,
  //       file_id: singleItem.file_id,
  //       ext: singleItem.ext,
  //       url: singleItem.url,
  //       del_yn: singleItem.del_yn,
  //     }))
  //   );
  //   return transformedData;
  // };




  // useEffect(() => {
  //   setData();
  //   // if (!loading) { changeLoading(); }
  //   // console.log(`Token 포트폴리오: ${token}`);
  //   const source = axios.CancelToken.source();
  //   getPortfolios(token, null, {
  //     cancelToken: source.token,
  //   })
  //   // axios({
  //   //   method: 'get',
  //   //   url: `https://api.writeyoume.com/api/v1/portfolio/`,
  //   //   headers: {
  //   //     Authorization: token,
  //   //   },
  //   //   cancelToken: source.token,
  //   // })
  //     .then(function (response) {
  //       const extractedData = response.data.data.map(item => ({
  //         group_id: item.group_id,
  //         member_id: item.member_id,
  //         portfolio_id: item.portfolio_id,
  //         title: item.title,
  //         description: item.description,
  //         reg_date: item.reg_date,
  //         mod_date: item.mod_date,
  //         kind: item.kind,
  //         file_id: item.file_id,
  //         ext: item.ext,
  //         url: item.url,
  //         del_yn: item.del_yn,
  //       }));
  //       const sortedAndGroupedData = _.chain(extractedData)
  //         .sortBy('group_id, member_id')
  //         .groupBy('member_id')
  //         .values()
  //         .value();
  //
  //       const groups = Object.values(sortedAndGroupedData);
  //       const transformedData = transformDataForSwiper(groups);
  //       setData(transformedData);
  //       dispatch(setPortfolioList(transformedData));
  //       console.log();
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  //
  //   return () => {
  //     source.cancel('API 호출이 취소되었습니다.');
  //   };
  // }, [token]);

  const onModify = id => {
    Alert.alert(
      '확인 테스트',
      'Props: onModify() \n\nPortfolio > PortfolioItem\n > PortfolioModal > DetailPop',
    );
  };

  const onDelete = id => {
    Alert.alert(
      '삭제 테스트',
      'Props: onDelete() \n\nPortfolio > PortfolioItem\n > PortfolioModal ',
    );
  };

  const shadowColor = 'rgba(151, 151, 151, 0.16)';


  return (
    <View style={styles.container}>
      <ScrollView>
            <View style={styles.gridView}>
              {portfolioList && portfolioList.map(singleItem => (
                  <View style={styles.gridItem} key={singleItem[0].portfolio_id.toString()}>
                    <PortfolioItem
                        portfolio={portfolio}
                        onModify={onModify}
                        onDelete={onDelete}
                        member_id={singleItem[0].member_id}
                        id={singleItem[0].portfolio_id}
                        title={singleItem[0].title}
                        message={singleItem[0].description}
                        reg_date={singleItem[0].reg_date}
                        mod_date={singleItem[0].mod_date}
                        code={singleItem[0].kind}
                        file_id={singleItem[0].file_id}
                        src={singleItem[0].url}
                        ext={singleItem[0].ext}
                        del_yn={singleItem[0].del_yn}
                        token={token}
                    />
                  </View>
              ))}
              <Shadow distance="10" startColor={shadowColor} offset={[15, 15]}>
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
                  memberId={user}
              />
            </View>
      </ScrollView>
      <FAB />
    </View>
  );
};

export default Portfolio;

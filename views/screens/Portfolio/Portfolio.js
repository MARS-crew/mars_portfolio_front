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
import GroupItem from '../../components/GroupItem';

const { width, height } = Dimensions.get('window');
const squareSize = Math.min(width, height) * 0.4;

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

const Portfolio = ({ token }) => {
  const { currentIndex, changeIndex, horizontalIndex, changeHorizontalIndex, dataIndex, changeDataIndex, selectedMemId, changeSelectedMemId, selectedGroupId, changeSelectedGroupId } = useIndexContext();
  const swiperRef = useRef(null);
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
        console.log("cc");
        console.log(selectedData);
        if (selectedData[0].group_id !== selectedGroupId) {
          changeSelectedGroupId(selectedData[0].group_id);
        }
      }
      changeDataIndex(newIndex);
    }
  };

  const [detailPopVisible, setDetailPopVisible] = useState(false);
  const [data, setData] = useState([]);

  const [fileIdLength, setFileIdLength] = useState(null);
  const [portfolio, setPortfolio] = useState(true); //포트폴리오 페이지인지 확인하는 스테이트
  // const numColumns = 2;
  // const itemWidth = (Dimensions.get('window').width - 10) / numColumns; // 각 항목의 너비 계산
  const member_id = 44;

  const transformDataForSwiper = data => {
    const transformedData = data.map(groupItems =>
      groupItems.map(singleItem => ({
        group_id: singleItem.group_id,
        member_id: singleItem.member_id,
        portfolio_id: singleItem.portfolio_id,
        title: singleItem.title,
        description: singleItem.description,
        reg_date: singleItem.reg_date,
        mod_date: singleItem.mod_date,
        kind: singleItem.kind,
        file_id: singleItem.file_id,
        ext: singleItem.ext,
        url: singleItem.url,
        del_yn: singleItem.del_yn,
      }))
    );
    return transformedData;
  };

  useEffect(() => {
    console.log(`Token 포트폴리오: ${token}`);
    const source = axios.CancelToken.source();
    axios({
      method: 'get',
      // url: `http://api.mars-port.duckdns.org:3000/api/v1/portfolio`,
      url: `http://172.20.10.4:3000/api/v1/portfolio`,

      headers: {
        Authorization: token,
      },
      cancelToken: source.token,
    })
      .then(function (response) {
        const extractedData = response.data.data.map(item => ({
          group_id: item.group_id,
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

        const sortedAndGroupedData = _.chain(extractedData)
          .sortBy('group_id, member_id')
          .groupBy('member_id')
          .values()
          .value();

        const groups = Object.values(sortedAndGroupedData);
        const transformedData = transformDataForSwiper(groups);
        setData(transformedData);

        console.log('portfolio--------------------------------------------------');
        console.log(groups);

      })
      .catch(function (error) {
        console.log(error);
      });

    return () => {
      source.cancel('API 호출이 취소되었습니다.');
    };
  }, [token]);

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

  const Item = ({
    item: groupItem,
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
              {/* {groupItems.map((singleItem, index) => ( */}
              <View style={styles.gridItem} key={groupItem.member_id}>
                <PortfolioItem
                  portfolio={portfolio}
                  onModify={onModify}
                  onDelete={onDelete}
                  member_id={groupItem.member_id}
                  id={groupItem.portfolio_id}
                  title={groupItem.title}
                  message={groupItem.description}
                  reg_date={groupItem.reg_date}
                  mod_date={groupItem.mod_date}
                  code={groupItem.kind}
                  file_id={groupItem.file_id}
                  src={groupItem.url}
                  ext={groupItem.ext}
                  del_yn={groupItem.del_yn}
                  token={token}
                />
              </View>
              {/* ))} */}
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
  const shadowColor = 'rgba(151, 151, 151, 0.36)';

  const renderItem = ({ item: groupItems }) => (
    <View style={styles.container}>
      <SafeAreaView>
        <ScrollView>
          <View style={styles.gridView}>
            {groupItems.map(singleItem => (
              <View style={styles.gridItem} key={singleItem.portfolio_id}>
                <PortfolioItem
                  portfolio={portfolio}
                  onModify={onModify}
                  onDelete={onDelete}
                  member_id={singleItem.member_id}
                  id={singleItem.portfolio_id}
                  title={singleItem.title}
                  message={singleItem.description}
                  reg_date={singleItem.reg_date}
                  mod_date={singleItem.mod_date}
                  code={singleItem.kind}
                  file_id={singleItem.file_id}
                  src={singleItem.url}
                  ext={singleItem.ext}
                  del_yn={singleItem.del_yn}
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

  return (
    <SafeAreaView style={styles.container}>
      <SwiperFlatList
        ref={swiperRef}
        data={data}
        renderItem={renderItem}
        vertical
        index={dataIndex}
        onScroll={handleVerticalScroll}
        hideShadow
      />
      <FAB />
    </SafeAreaView>
  );
};

export default Portfolio;

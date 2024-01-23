import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import Video from 'react-native-video';
import { Shadow } from 'react-native-shadow-2';
import EditMode from '../../components/commonComponent/EditMode';
import ContentsViewPop from '../../components/commonComponent/ContentsViewPop';
import DetailPop from './DetailPop';
const { width, height } = Dimensions.get('window');
const squareSize = Math.min(width, height) * 0.4;

const styles = StyleSheet.create({
  image: {
    resizeMode: 'contain',
  },
  content: {
    width: squareSize,
    height: squareSize,
    borderWidth: 1,
    borderRadius: 10,
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

const PortfolioItem = ({
  member_id,
  portfolio,
  id,
  title,
  code,
  file_id,
  src,
  ext,
  del_yn,
  message,
  onModify,
  onDelete,
  token,
}) => {
  // useEffect(() => {
  //   const source = axios.CancelToken.source();
  //   axios({
  //     method: 'get',
  //     url: `https://api.writeyoume.com/api/v1/portfolio`,
  //     headers: {
  //       Authorization: token,
  //     },
  //     cancelToken: source.token,
  //   })
  //     .then(function (response) {
  //       const extractedData = response.data.data.map(item => ({
  //         member_id: item.member_id,
  //         portfolio_id: item.portfolio_id,
  //         title: item.title,
  //         description: item.description,
  //         reg_date: item.reg_date,
  //         mod_date: item.mod_date,
  //         kind: item.kind,
  //         file_id: item.file_id,
  //         ext: item.ext,
  //         url: `http://10.0.2.2:3000/${item.url.replace(
  //           'http://172.20.10.4:3000/',
  //           '',
  //         )}`,
  //         del_yn: item.del_yn,
  //       }));
  //       // setData(extractedData);

  //       setData(extractedData);

  //       console.log(
  //         'portfolio--------------------------------------------------',
  //       );
  //       console.log(extractedData);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });

  //   return () => {
  //     isMounted = false;
  //     source.cancel('API 호출이 취소되었습니다.');
  //   };
  // }, []);
  const [contentsViewPopVisible, setContentsViewPopVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [detailPopVisible, setDetailPopVisible] = useState(false);

  const shadowColor = 'rgba(151, 151, 151, 0.36)';

  return (
    <Shadow distance="12" startColor={shadowColor} offset={[15, 15]}>
      <View style={[styles.gridItem]}>
        <TouchableOpacity
          onPress={() =>
            // id === '6'
            //   ? setDetailPopVisible(!detailPopVisible)
            //   : setContentsViewPopVisible(!contentsViewPopVisible)
            setContentsViewPopVisible(!contentsViewPopVisible)
          }
          onLongPress={() =>
            // id === '6'
            //   ? setDetailPopVisible(!detailPopVisible)
            //   : setIsModalVisible(!isModalVisible)
            [
              console.log(member_id),
              member_id == '46' ? setIsModalVisible(!isModalVisible) : '',
            ]
          }>
          {(code === 1 || code === 3) && (
            <View>
              <Image
                source={{ uri: src }}
                style={[styles.content, styles.image]}
              />
            </View>
          )}
          {code === 2 && (
            <View>
              <Video
                ref={useRef(null)}
                source={{ uri: src }}
                style={styles.content}
                repeat={true}
                resizeMode="contain"
              />
            </View>
          )}
        </TouchableOpacity>
        <ContentsViewPop
          portfolio={portfolio}
          id={id}
          title={title}
          src={src}
          code={code}
          message={message}
          onModify={onModify}
          onDelete={onDelete}
          contentsViewPopVisible={contentsViewPopVisible}
          setContentsViewPopVisible={
            setContentsViewPopVisible
          }></ContentsViewPop>
        <EditMode
          portfolio={portfolio}
          id={id}
          code={code}
          onModify={onModify}
          onDelete={onDelete}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          token={token}></EditMode>

        <DetailPop
          id={id}
          onModify={onModify}
          token={token}
          setDetailPopVisible={setDetailPopVisible}
          detailPopVisible={detailPopVisible}></DetailPop>
      </View>
    </Shadow>
  );
};

export default PortfolioItem;

import React, {useState} from 'react';
import {View, SafeAreaView, FlatList, StyleSheet, Alert} from 'react-native';

import PortfolioItem from './PortfolioItem';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  gridView: {
    marginTop: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Portfolio = () => {
  const numColumns = 2;
  const [portfolioData, setPortfolioData] = useState([
    {
      id: '1',
      title: 'Video 데이터 영역',
      src: require('../../assets/images/camera.png'),
    },
    {
      id: '2',
      title: 'Photo 데이터 영역',
      src: require('../../assets/images/camera.png'),
    },
    {
      id: '3',
      title: 'Link 데이터 영역',
      src: require('../../assets/images/Link.png'),
    },
    {
      id: '4',
      title: 'Project 프로젝트 영역',
      src: require('../../assets/images/project.png'),
    },
    {
      id: '1',
      title: 'Video 데이터 영역',
      src: require('../../assets/images/camera.png'),
    },
    {
      id: '2',
      title: 'Photo 데이터 영역',
      src: require('../../assets/images/camera.png'),
    },
    {
      id: '5',
      title: 'Null 데이터 영역',
      src: require('../../assets/images/marsLogo.png'),
    },

    {
      id: '5',
      title: 'Null 데이터 영역',
      src: require('../../assets/images/marsLogo.png'),
    },
    {
      id: '6',
      title: 'More 데이터 영역',
      src: require('../../assets/images/add.png'),
    },
  ]);

  // 플랫 리스트 데이터 item 수정 기능(개발 방식 검토중인 기능이므로 구현 미완료)
  const onModify = ({id}) => {
    Alert.alert(
      '수정 테스트',
      'Props: onModify() \n\nPortfolio > PortfolioItem\n > PortfolioModal > DetailPop',
    );
  };

  // 플랫 리스트 데이터 item 삭제 기능(개발 방식 검토중인 기능이므로 구현 미완료)
  const onDelete = ({id}) => {
    Alert.alert(
      '삭제 테스트',
      'Props: onDelete() \n\nPortfolio > PortfolioItem\n > PortfolioModal > ChoosePop',
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
                id={item.id}
                src={item.src}
                onModify={onModify}
                onDelete={onDelete}></PortfolioItem>
            )}
            keyExtractor={(item, index) => index}
            numColumns={numColumns}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Portfolio;

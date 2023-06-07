import {View, SafeAreaView, FlatList, StyleSheet} from 'react-native';

import PortfolioItem from '../components/PortfolioItem';

const DATA = [
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
    id: '5',
    title: 'More 추가 데이터 영역',
    // src: require('../../assets/images/add.png'),
  },
];

const Item = ({id, src}) => (
  <View>
    <PortfolioItem id={id} src={src}></PortfolioItem>
  </View>
);

const Portfolio = () => {
  const numColumns = 2;
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View>
          <FlatList
            data={DATA}
            renderItem={({item}) => <Item id={item.id} src={item.src} />}
            keyExtractor={(item, index) => index}
            numColumns={numColumns}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default Portfolio;

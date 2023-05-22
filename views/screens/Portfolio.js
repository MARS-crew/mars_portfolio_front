import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';
import Camera from '../../assets/images/camera.png';
import Link from '../../assets/images/Link.png';
const DATA = [
  {
    id: 'Video',
    title: '(TEST)_영상 데이터 영역',
    image: '../../assets/images/camera.png',
  },
  {
    id: 'Photo',
    title: '(TEST)_사진 데이터 영역',
    image: '../../assets/images/camera.png',
  },
  {
    id: 'Link',
    title: '(TEST)_링크 데이터 영역',
    image: '../../assets/images/camera.png',
  },
  {
    id: 'Project',
    title: '(TEST)_참여 프로젝트 영역',
    image: '../../assets/images/camera.png',
  },
  {
    id: 'More',
    title: '(TEST)_추가 데이터 영역',
    image: '../../assets/images/Link.png',
  },
];
const Item = ({title, width}) => (
  <View
    style={{
      width,
      height: Dimensions.get('window').height / 2,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#000',
    }}>
    <Image source={Camera} style={styles.image} />
    <Text style={{color: 'black', fontSize: 14}}>{title}</Text>
  </View>
);

const Portfolio = () => {
  const [containerWidth, setContainerWidth] = useState(0);

  const margins = 0;
  const numColumns = 2;
  return (
    <View>
      <SafeAreaView style={{marginTop: 0}}>
        <View>
          <FlatList
            data={DATA}
            onLayout={e => setContainerWidth(e.nativeEvent.layout.width)}
            renderItem={({item}) => (
              <Item
                title={item.title}
                width={(containerWidth - margins) / numColumns}
              />
            )}
            keyExtractor={(item, index) => index}
            numColumns={numColumns}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};
const styles = StyleSheet.create({
  image: {
    width: 60,
    height: 60,
  },
});
export default Portfolio;

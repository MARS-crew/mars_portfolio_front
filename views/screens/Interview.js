import React, { useRef, useState } from 'react';
import {
  View,
  // Text,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  Animated,
  TouchableWithoutFeedback,
  Easing,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import EmptyImg from '../../assets/images/emptyImg.png';

const Interview = () => {
  const opacity = useRef(new Animated.Value(0)).current;
  const [heart, setHeart] = useState(false);

  var lastTap = null;

  const handleDoubleTap = () => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;
    //두번째 tap이 지난 tap을 한지 0.03초 이내에 이뤄졌을 때 -> Double tap
    if (lastTap && now - lastTap < DOUBLE_PRESS_DELAY) {
      toggleHeart();
    } else {
      lastTap = now;
    }
  };

  const toggleHeart = () => {
    setHeart(previousState => !previousState);
    fillHeart();
  };

  const fillHeart = () => {
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 400,
        easing: Easing.quad,
        useNativeDriver: true,
      }),
      Animated.delay(600),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bar}>
        <View style={styles.iconbar}>
          <TouchableOpacity
            onPress={toggleHeart}
            style={{
              width: 25,
              height: 25,
            }}>
            {heart ? (
              <Icon name="heart" size={23} color={'#3D3D3D'}></Icon>
            ) : (
              <Icon name="hearto" size={23} color={'#595959'}></Icon>
            )}
          </TouchableOpacity>
          <Icon name="sharealt" size={23} color={'#3D3D3D'} />
        </View>
      </View>
      <View style={styles.section}>
        <TouchableWithoutFeedback onPress={handleDoubleTap}>
          <ImageBackground
            resizeMode="contain"
            source={EmptyImg}
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </TouchableWithoutFeedback>
        {/* Animated로 변경, opacity 값 */}
        <Animated.View style={[styles.animate, { opacity: opacity }]}>
          {heart ? (
            <Icon name="heart" size={80} color={'red'}></Icon>
          ) : (
            <Icon name="hearto" size={80} color={'gray'}></Icon>
          )}
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // padding: 10,
  },
  bar: {
    borderTopWidth: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  section: {
    borderTopWidth: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 6,
    padding: 15,
  },
  iconbar: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  animate: {
    position: 'absolute',
  },

  user: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  userimage: {
    width: 32,
    height: 32,
    borderRadius: 32 / 2,
    backgroundColor: 'black',
    marginHorizontal: 5,
  },
  username: {
    fontSize: 15,
    fontWeight: '500',
    fontFamily: 'SpoqaHanSansNeo-Regular',
  },
  text: {
    fontSize: 15,
    marginVertical: 5,
    fontFamily: 'SpoqaHanSansNeo-Light',
  },
  tags: {
    fontSize: 15,
    color: 'green',
    marginVertical: 5,
  },
});

export default Interview;

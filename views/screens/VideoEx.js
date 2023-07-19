import React from "react";
import { StyleSheet, View } from "react-native";
import Video from "react-native-video";

const VideoEx = () => {
  return (
    <View style={styles.container}>
      <Video
        source={require('../../assets/video/mars_profil1.mp4')}
        style={styles.video} // 스타일 속성 이름 변경
        paused={false}
        resizeMode={"cover"}
        onLoad={e => console.log(e)}
        repeat={true}
        onAnimatedValueUpdate={() => {}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white"
  },
  video: {
    flex: 1, // Video 컴포넌트가 부모 View 컴포넌트에 꽉 차도록 flex 속성 추가
  }
});

export default VideoEx;

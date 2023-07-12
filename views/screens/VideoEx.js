import React from "react";
import { StyleSheet, View } from "react-native";
import Video from "react-native-video";

const VideoEx = () => {
  return (
    <View style={styles.container}>
      <Video
        source={{ uri: 'https://www.youtube.com/watch?v=DtVB9LuJrIQ' }}
        style={styles.fullScreen}
        paused={false} // 재생/중지 여부
        resizeMode={"cover"} // 프레임이 비디오 크기와 일치하지 않을 때 비디오 크기를 조정하는 방법을 결정합니다. cover : 비디오의 크기를 유지하면서 최대한 맞게
        onLoad={e => console.log(e)} // 미디어가 로드되고 재생할 준비가 되면 호출되는 콜백 함수입니다.
        repeat={true} // video가 끝나면 다시 재생할 지 여부
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
  fullScreen: {
      position: "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
  }
});

export default VideoEx;

import React, { useState, useCallback, useRef } from "react";
import { Button, View, Alert } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";

const Youtube = () => {
const [playing, setPlaying] = useState(false);

const onStateChange = useCallback((state) => {
if (state === "ended") {
    setPlaying(false);
    Alert.alert("Video has ended!");
}
}, []);

const togglePlaying = useCallback(() => {
setPlaying((prev) => !prev);
}, []);

return (
<View>
    <YoutubePlayer
    height={700}
    play={playing}
    videoId={"Nka4RfmCJfU"}
    onChangeState={onStateChange}
    />
    <Button title={playing ? "pause" : "play"} onPress={togglePlaying} />
</View>
);
};

export default Youtube;

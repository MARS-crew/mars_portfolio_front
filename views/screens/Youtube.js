import React, { useState, useCallback, useRef } from "react";
import { Button, View, Alert,StyleSheet,Image } from "react-native";
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
<View style={styles.container}>
<View style={styles.con1}>
    <Image 
    source={require('../../assets/images/heart_icon.png')}
    style={styles.image}
    />
    <Image 
    source={require('../../assets/images/share_icon.png')}
    style={styles.image}
    />
</View>

<View>
<YoutubePlayer
    height={500}
    play={playing}
    videoId={"Nka4RfmCJfU"}
    onChangeState={onStateChange}
/>
<Button title={playing ? "pause" : "play"} onPress={togglePlaying} />
</View>
</View>
);
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#fff'
    },
    image:{
        margin : 10,
        width: 30,
        height: 30,
    },
    con1 : {
        justifyContent : 'flex-end',
        flexDirection:'row'
    }
});

export default Youtube;

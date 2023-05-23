import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CubeNavigationVertical } from 'react-native-3dcube-navigation';
import Main from "./Main";
import Main2 from "./Main2";
import Main3 from "./Main3";

const Test = () => {
const callBackAfterSwipe = () => {
// 스와이프 후의 동작 정의
};

return (
    <View style={styles.container}>
    <CubeNavigationVertical callBackAfterSwipe={callBackAfterSwipe}>
        <Main />
        <Main2 />
        <Main3 />
    </CubeNavigationVertical>
    </View>
);
};

const styles = StyleSheet.create({
    container: {
    flex: 1,
},
});

export default Test;

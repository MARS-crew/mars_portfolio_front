import React from 'react';
import {View, Image, StyleSheet, TouchableOpacity, Text} from 'react-native';
import LottieView from 'lottie-react-native';

const Splash = ({navigation}) => {
    return (
    <View>
    <Text>그림을 클릭시 메인화면으로 갑니다.</Text>
    <TouchableOpacity onPress={() => navigation.navigate('Main')}>
        <LottieView
        source={require('../../assets/lottie/spaceship.json')}
        style={styles.lottie}
        autoPlay
        loop
        />
    </TouchableOpacity>
    </View>
);
};

const styles = StyleSheet.create({
    lottie: {
        width: '80%',
        height: '80%',
    },
});

export default Splash;
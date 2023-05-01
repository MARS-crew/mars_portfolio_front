import React from "react";
import { View,Image,StyleSheet, TouchableOpacity,Text} from "react-native";
import SplashImg from '../../assets/images/SplashImg.jpeg';

const Splash=({navigation})=>{
    return(
        <View>
            <Text>그림을 클릭시 메인화면으로 갑니다.</Text>
            <TouchableOpacity onPress={()=>navigation.navigate("Main")}>
                <Image 
                source={SplashImg}
                style={styles.image}
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    image:{
        width:'100%',
        height:'100%'
    }
})

export default Splash;
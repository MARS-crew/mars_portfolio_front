import {View,Text,StyleSheet,Image} from "react-native";
import React from "react";

import tel_icon from '../../../assets/images/icon-telephone.png';
import home_icon from '../../../assets/images/icon-home.png';
import main_icon from '../../../assets/images/icon-mail.png';

const Id2=() =>{
    return(
        <View>
        <Text style={styles.infoText}>이화진</Text>
        <View style={styles.icons}>
                <View style={styles.iconsText}>
                    <Image 
                    source={tel_icon} 
                    style={styles.icon} />
                        <Text style={styles.defaultText}>010-1111-2222</Text>
                </View>
                <View style={styles.iconsText} >
            <Image 
            source={home_icon} 
            style={styles.icon} />
            <Text style={styles.defaultText}>경기도</Text>
            </View>
            <View style={styles.iconsText}>
            <Image 
            source={main_icon} 
            style={styles.icon} />
            <Text style={styles.defaultText}>123@naver.com</Text>
            </View>
        </View>
    </View>
    )
}

const styles = StyleSheet.create({
    infoText :{
        color: '#000000',
        fontSize: 16,
        fontWeight:'900',
        marginBottom:5
    },
    icon : {
        flexDirection: 'column',
        width:20,
        height:20,
    },
    defaultText:{
        color:'#000000',
        marginLeft:10,
        fontSize:14
    },
    iconsText:{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop:7,
    },
})

export default Id2;
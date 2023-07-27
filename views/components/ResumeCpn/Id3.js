import {View,Text,StyleSheet} from "react-native";
import React from "react";


const Id3=() =>{
    return(
        <View>
        <View>
            <View style={styles.iconsText}>
                <Text style={styles.infoText}>회사명</Text>
                <Text style={styles.defaultText}>사원</Text>
            </View>
            <Text style={styles.dateText}>2020.06.06 ~ 2023.06.06 (3년 0개월)</Text>
            <Text style={styles.defaultText2}>개발</Text>
        </View>
        <View style={styles.line} />
        <View>
            <View style={styles.iconsText}>
                <Text style={styles.infoText}>회사명</Text>
                <Text style={styles.defaultText}>사원</Text>
            </View>
            <Text style={styles.dateText}>2020.06.06 ~ 2023.06.06 (3년 0개월)</Text>
            <Text style={styles.defaultText2}>개발</Text>
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
    line: {
        width:'100%',
        borderColor: '#F5F5F5',
        borderWidth: 0.2,
        marginTop:12,
        marginBottom:15,
    },
    defaultText2:{
        color:'#000000',
        fontSize:14
    },
})

export default Id3;
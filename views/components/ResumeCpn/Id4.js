import {View,Text,StyleSheet} from "react-native";
import React from "react";


const Id4=() =>{
    return(
        <View>
        <View>
            <View>
                <Text style={styles.infoText}>프로젝트 우수상</Text>
            </View>
            <Text style={styles.dateText}>2020.06.06</Text>
            <Text style={styles.defaultText2}>마스외전</Text>
        </View>
        <View style={styles.line} />
        <View>
            <View>
                <Text style={styles.infoText}>프로젝트 우수상</Text>
            </View>
            <Text style={styles.dateText}>2020.06.06</Text>
            <Text style={styles.defaultText2}>마스외전</Text>
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
    defaultText:{
        color:'#000000',
        marginLeft:10,
        fontSize:14
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
    dateText:{
        fontSize:12,
        marginBottom:5,
    },
})

export default Id4;
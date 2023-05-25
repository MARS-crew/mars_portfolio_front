import React from "react";
import { View, Button ,StyleSheet,Image,Text,ScrollView} from "react-native";

function Resume() {
return (
    <View style={styles.container}>
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.con1}>
        <Text style={styles.text1}>Introduce</Text>
        <Text style={styles.text2}>안녕하세요. 저는 마스외전4기 김채린입니다.</Text>
        </View>
        <View style={styles.con1}>
        <Text style={styles.text1}>Info</Text>
        <Text style={styles.text2}>Name          김채린</Text>
        <Text style={styles.text2}>Tel               010-1234-1234</Text>
        <Text style={styles.text2}>Adress        경기도 용인시 유부우동</Text>
        <Text style={styles.text2}>E-mail         123@naver.com</Text>
        </View>
        <View style={styles.con1}>
        <Text style={styles.text1}>Career</Text>
        <Text style={styles.text2}>회사명      입사일      기간      직위      업무</Text>
        <Text style={styles.text2}>mars      2022.01      1년      사원      기획</Text>
        </View>
        <View style={styles.con1}>
        <Text style={styles.text1}>Awards</Text>
        <Text style={styles.text2}>기간                  수상명                  발행기간</Text>
        <Text style={styles.text2}>기간                  수상명                  발행기간</Text>
        </View>
    </ScrollView>
    </View>
);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    scrollViewContent: {
        flexGrow: 10
    },
    text1: {
        fontSize: 45,
        fontWeight: 'bold',
    },
    text2: {
        margin: 10,
        fontSize: 20,
        fontWeight: 'light',
    },
    con1: {
        margin: 10,
        borderStyle: 'solid',
        borderWidth: 1
    }
});

export default Resume;

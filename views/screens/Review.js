import React from "react";
import { View, Button ,StyleSheet,Image,Text,ScrollView} from "react-native";

function Review() {
return (
    <View style={styles.container}>
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.con1}>
        <Text style={styles.text1}>작성자 김채린 작성일시</Text>
        <Text style={styles.text2}>2022-01-01 12:33:44</Text>
        <Text style={styles.text2}>리뷰내용 입니다.리뷰내용 입니다.리뷰내용 입니다.리뷰내용 입니다.리뷰내용 입니다.리뷰내용 입니다.리뷰내용 입니다.리뷰내용 입니다.리뷰내용 입니다.리뷰내용 입니다.리뷰내용 입니다.리뷰내용 입니다.리뷰내용 입니다.리뷰내용 입니다.리뷰내용 입니다.리뷰내용 입니다.ㅍ
        리뷰내용 입니다.리뷰내용 입니다.리뷰내용 입니다.리뷰내용 입니다.ㅍ리뷰내용 입니다.리뷰내용 입니다.리뷰내용 입니다.리뷰내용 입니다.리뷰내용 입니다.리뷰내용 입니다.ㅍ</Text>
        </View>
        <View style={styles.con1}>
        <Text style={styles.text1}>작성자 김채린 작성일시</Text>
        <Text style={styles.text2}>2022-01-01 12:33:44</Text>
        <Text style={styles.text2}>리뷰내용 입니다.리뷰내용 입니다.리뷰내용 입니다.리뷰내용 입니다.리뷰내용 입니다.리뷰내용 입니다.리뷰내용 입니다.리뷰내용 입니다.리뷰내용 입니다.리뷰내용 입니다.리뷰내용 입니다.리뷰내용 입니다.리뷰내용 입니다.리뷰내용 입니다.리뷰내용 입니다.리뷰내용 입니다.ㅍ
        리뷰내용 입니다.리뷰내용 입니다.리뷰내용 입니다.리뷰내용 입니다.ㅍ리뷰내용 입니다.리뷰내용 입니다.리뷰내용 입니다.리뷰내용 입니다.리뷰내용 입니다.리뷰내용 입니다.ㅍ</Text>
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
        marginTop:20,
        textAlign:"center",
        fontSize: 15,
        fontWeight: 'bold',
    },
    text2: {
        textAlign:"center",
        margin: 6,
        fontSize: 20,
        fontWeight: 'light',
    },
    con1: {
        margin: 10,
        borderStyle: 'solid',
        borderWidth: 1,
        
    }
});

export default Review;

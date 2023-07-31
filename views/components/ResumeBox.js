import {View,Text,StyleSheet,Image} from "react-native";
import React, {useState} from "react";
import {Resume} from '../screens/Resume'
import Id2 from './ResumeCpn/Id2'
import Id3 from './ResumeCpn/Id3'
import Id4 from './ResumeCpn/Id4'
import Id5 from './ResumeCpn/Id5'
import Id7 from './ResumeCpn/Id7'

import {Shadow} from 'react-native-shadow-2';

const ResumeBox = ({ item }) => {
const [contentsViewPopVisible, setContentsViewPopVisible] = useState(false);

let content = null;
let contentStyles = {}; // 컨텐츠 부분의 스타일

if (item.id === '1') { //소개글
    content = '소개글을 입력해주세요';
    contentStyles = styles.introContent;

} else if (item.id === '2') { //기본정보
    content = 
        <Id2 />
    ;

} else if (item.id === '3') {//경력
    content = 
        <Id3 />
    ; 

} else if (item.id === '4') {// 수상내역 
    content = 
        <Id4 
        style={styles.boxMarginStyle}/>
    ;

} else if (item.id === '5') {//보유기술
    content = 
        <Id5 
        style={styles.boxMarginStyle} />
    ;
    contentStyles = styles.interestContent; // 관심분야 컨텐츠 스타일
} else if (item.id === '6') {
        content = 
        <Id5 
        style={styles.boxMarginStyle} />
    ;
// 전문분야 컨텐츠 스타일
} else if (item.id === '7') {
    content = 
    <Id7 
    style={styles.boxMarginStyle} 
    />
// 보유기술 컨텐츠 스타일
}

return (
    <Shadow
    style={[styles.container]} // 추가 스타일 적용
    radius={100}
    offset={[1, 1]}
    startColor={'rgba(151, 151, 151, 0.05)'}
    endColor={'rgba(151, 151, 151, 0.01)'}
    distance={8}
    >
    <Text style={styles.title}>{item.title}</Text>
    {(item.id === '5' || item.id === '6' ||item.id === '7')?(
        <View style={styles.line2} />
    ):(
        <View style={styles.line} />
    )}
    <Text style={[styles.content, contentStyles]}>{content}</Text>
    </Shadow>
);
};

const styles = StyleSheet.create({
container: {
    width: '88%',
    borderRadius: 10,
    borderColor: '#F5F5F5',
    borderWidth: 1,
    color: 'white',
    borderStyle: 'solid',
    backgroundColor: '#ffffff',
 //   marginBottom: 20,
    marginLeft:25,
    marginRight:25,
    marginTop:25,
},
title: {
    fontSize: 15,
    paddingLeft: 15,
    paddingTop: 15,
 //   paddingBottom: 12,
    fontWeight: 'bold',
  //  marginBottom: 5,
    color: 'black',
},
boxMarginStyle: {
    marginLeft:15
},
line: {
    width:'100%',
    borderColor: '#F5F5F5',
    borderWidth: 0.2,
    marginTop:12,
    marginBottom:15,
},
line2: {
    width:'100%',
    borderColor: '#F5F5F5',
    borderWidth: 0.2,
    marginTop:12,
    //marginBottom:15,
},
content: {
   // paddingTop: 15,
    paddingLeft: 15,
    paddingBottom: 15,
},
introContent: {
    color: '#D9D9D9',
},
});

export default ResumeBox;
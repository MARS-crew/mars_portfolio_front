import {View,Text,StyleSheet,Image} from "react-native";
import {Resume} from '../screens/Resume'
import Id7Popup from "./Id7Popup";
import {Shadow} from 'react-native-shadow-2';
import tel_icon from '../../assets/images/icon-telephone.png';
import home_icon from '../../assets/images/icon-home.png';
import main_icon from '../../assets/images/icon-mail.png';

import java_icon from '../../assets/images/devIcon/java.png'
import php_icon from '../../assets/images/devIcon/php.png'
import js_icon from '../../assets/images/devIcon/javascript.png'
import mysql_icon from '../../assets/images/devIcon/mysql.png'
import react_icon from '../../assets/images/devIcon/react.png'
import css3_icon from '../../assets/images/devIcon/css3.png'
import html5_icon from '../../assets/images/devIcon/html5.png'
import springboot_icon from '../../assets/images/devIcon/springboot.png'



import { help } from "yargs";
import React,{useState} from "react";
import { TouchableOpacity } from 'react-native-gesture-handler';

const ResumeBox = ({ item }) => {
    const containerStyles = item.id === '1' ? { ...styles.container, marginTop: 20 } : 
    item.id === '7' ? { ...styles.container, marginBottom: 20 } : styles.container;

let content = null;
let contentStyles = {}; // 컨텐츠 부분의 스타일

if (item.id === '1') {
    content = '소개글을 입력해주세요';
    contentStyles = styles.introContent; // 소개글 컨텐츠 스타일
} else if (item.id === '2') {
    content = 
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
    ;
    contentStyles = styles.basicInfoContent; // 기본정보 컨텐츠 스타일
} else if (item.id === '3') {
    content = 
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
    ;
    contentStyles = styles.careerContent; // 경력 컨텐츠 스타일
} else if (item.id === '4') {
    content = 
    <View>
        <View>
            <View>
                <Text style={styles.infoText}>프로젝트 우수상</Text>
            </View>
            <Text style={styles.dateText}>2020.06.06</Text>
            <Text style={styles.defaultText2}>마스외전</Text>
        </View>
        {/* <View style={styles.line} />
        <View>
            <View>
                <Text style={styles.infoText}>프로젝트 우수상</Text>
            </View>
            <Text style={styles.dateText}>2020.06.06</Text>
            <Text style={styles.defaultText2}>마스외전</Text>
        </View> */}
    </View>
;
    contentStyles = styles.awardContent; // 수상내역 컨텐츠 스타일
} else if (item.id === '5') {
    content = 
    <View>
        <Text style={styles.bunyaText}> IT > 인공지능 > 빅데이터 머신러닝 </Text>
        <Text style={styles.bunyaText}> IT > 인공지능 > 빅데이터 머신러닝 </Text>
    </View>
    ;
    contentStyles = styles.interestContent; // 관심분야 컨텐츠 스타일
} else if (item.id === '6') {
        content = 
    <View>
        <Text style={styles.bunyaText}> IT > 인공지능 > 빅데이터 머신러닝 </Text>
        <Text style={styles.bunyaText}> IT > 인공지능 > 빅데이터 머신러닝 </Text>
    </View>
    ;
    contentStyles = styles.specialtyContent; // 전문분야 컨텐츠 스타일
} else if (item.id === '7') {
    const [popupIcon, setPopupIcon] = useState('');
    const [contentsViewPopVisible, setContentsViewPopVisible] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [detailPopVisible, setDetailPopVisible] = useState(false);

    const handleIconClick = (id) => {
        // 클릭하면 상세 팝업 가시성과 컨텐츠 뷰 팝업 가시성을 모두 반전시킴
        setDetailPopVisible(!detailPopVisible);
        setContentsViewPopVisible(!contentsViewPopVisible);
    
        // 클릭한 아이콘의 아이디를 설정
        setPopupIcon(id);
    };

    const handleClosePopup = () => {
        setPopupIcon('');
    };
    
    content = 
    <View style={styles.devContainer}>

    {/* 자바 */}
    <TouchableOpacity onPress={() => handleIconClick('java')}>
        <View style={styles.devIcons}>
            <Image
                source={java_icon}
                style={styles.devIcon} />
            <Text style={styles.devIconText}>JAVA</Text>
        </View>
    </TouchableOpacity>

    {/* php */}
    <TouchableOpacity onPress={() => handleIconClick('php')}>
        <View style={styles.devIcons}>
            <Image
                source={php_icon}
                style={styles.devIcon} />
            <Text style={styles.devIconText}>PHP</Text>
        </View>
    </TouchableOpacity>

    {/* 리액트 */}
    <TouchableOpacity onPress={() => handleIconClick('react')}>
        <View style={styles.devIcons}>
            <Image
                source={react_icon}
                style={styles.devIcon} />
            <Text style={styles.devIconText}>React</Text>
        </View>
    </TouchableOpacity>

    {/* mysql */}
    <TouchableOpacity onPress={() => handleIconClick('mysql')}>
        <View style={styles.devIcons}>
            <Image
                source={mysql_icon}
                style={styles.devIcon} />
            <Text style={styles.devIconText}>MySQL</Text>
        </View>
    </TouchableOpacity>

    {/* 자바스크립트  */}
    <TouchableOpacity onPress={() => handleIconClick('js')}>
        <View style={styles.devIcons}>
            <Image
                source={js_icon}
                style={styles.devIcon} />
            <Text style={styles.devIconText}>JavaScript</Text>
        </View>
    </TouchableOpacity>

    {/* html */}
    <TouchableOpacity onPress={() => handleIconClick('html')}>
        <View style={styles.devIcons}>
            <Image
                source={html5_icon}
                style={styles.devIcon} />
            <Text style={styles.devIconText}>HTML5</Text>
        </View>
    </TouchableOpacity>

     {/* 팝업 */}
        {popupIcon !== '' && (
        <Id7Popup
        id={popupIcon}
        onClose={handleClosePopup}
        contentsViewPopVisible={contentsViewPopVisible}
        setContentsViewPopVisible={setContentsViewPopVisible}
        detailPopVisible={detailPopVisible} // 추가: 상세 팝업 가시성 상태를 전달
        setDetailPopVisible={setDetailPopVisible} // 추가: 상세 팝업 가시성 상태를 업데이트하는 함수를 전달
    />
    )}
</View>
    contentStyles = styles.skillContent; // 보유기술 컨텐츠 스타일
}

return (
    <Shadow
    style={[containerStyles]} // 추가 스타일 적용
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
    width: 360,
    margin: 1,
    borderRadius: 10,
    borderColor: '#F5F5F5',
    borderWidth: 1,
    color: 'white',
    borderStyle: 'solid',
    backgroundColor: '#ffffff',
    marginBottom: 20,
    marginLeft:20,
    marginRight:20
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

basicInfoContent: {
    color: '#000000',
},
infoText :{
    color: '#000000',
    fontSize: 16,
    fontWeight:'900',
    marginBottom:5
},
icons : {
    

},
icon : {
    flexDirection: 'column',
    width:20,
    height:20,
},
iconsText:{
    flexDirection: 'row',
    alignItems: 'center',
    marginTop:7,
},
bunyaText :{
    color:'#072AC8',
    backgroundColor:'#F5F4F9',
    marginTop:12,
    padding:6,
    borderRadius:5

},
careerContent: {
    // 경력 컨텐츠 스타일
},
awardContent: {
    // 수상내역 컨텐츠 스타일
},
interestContent: {
    // 관심분야 컨텐츠 스타일
},
specialtyContent: {
    // 전문분야 컨텐츠 스타일
},
skillContent: {
    // 보유기술 컨텐츠 스타일
},
mainText:{

},
defaultText:{
    color:'#000000',
    marginLeft:10,
    fontSize:14
},
defaultText2:{
    color:'#000000',
    fontSize:14
},
dateText:{
    fontSize:12,
    marginBottom:5,
},
devIconText : {
    justifyContent: 'center',
    marginLeft:5,
    color:'#000000',
    fontSize:14,
},
devIcons:{
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor:'#F5F4F9',
    padding:6,
    borderRadius:5,
    marginTop:12,
    marginRight:12,
},
devIcon : {
    flexDirection: 'column',
    width:22,
    height:22,
},
devContainer:{
    width:320,
    flex: 1,
    flexDirection: 'row',
    flexWrap:'wrap',
},
});

export default ResumeBox;
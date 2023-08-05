import {View,Text,StyleSheet,Image,TextInput,Button,Modal} from "react-native";
import {Resume} from '../screens/Resume'
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
import write from '../../assets/images/write.png'
import Postcode from '@actbase/react-daum-postcode';



import { help } from "yargs";
import React,{useState} from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

const ResumeBox = ({ item }) => {
const containerStyles = item.id === '1' ? { ...styles.container, marginTop: 20 } : 
item.id === '7' ? { ...styles.container, marginBottom: 80 } : styles.container;

let content = null;
let contentStyles = {}; // 컨텐츠 부분의 스타일
const [inputText, setInputText] = useState('');
const [resume, setResume] = useState({})
// const test = async () => {
//     const result = await axios.get("/api/v1/resume/123");

//     setResume(result.data.data)

// }
if (item.id === '1') {
    content = 
    <View>
        <TextInput
            onChangeText={(text) => { setInputText(text) }}
            placeholder="소개글을 입력해주세요"
            />
    </View>
} else if (item.id === '2') {
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState('');
    
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
                    {/* <TextInput
            onChangeText={(text) => { setInputText(text) }}
            placeholder="주소를 입력해주세요."
            /> */}
<Modal visible={isModalVisible} transparent={true} animationType="slide">
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <View style={{ width: 400, height: 400, backgroundColor: 'white', borderRadius: 10, padding: 20 }}>
           {/* <Text>{resume.introduce}</Text> */}
            <Postcode
                style={{ width: '100%', height: '100%' }}
                jsOptions={{ animation: true, hideMapBtn: true }}
                onSelected={data => {
                    setSelectedAddress(data.address); // 선택한 주소 저장
                    setModalVisible(false); // 모달 닫기
                }}
            />
            {/* <Text>선택한 주소: {selectedAddress}</Text> 선택한 주소 표시 */}
            {/* <TouchableOpacity 
            onPress={() => setModalVisible(false)} 
            style={{ marginTop: 10, alignSelf: 'flex-end', padding: 10, backgroundColor:'' }}>
                
                <Text>닫기</Text>
            </TouchableOpacity> */}
<TouchableOpacity onPress={() => setModalVisible(false)}>
  <Text>닫기</Text>
</TouchableOpacity>

        </View>
    </View>
</Modal>
        <TouchableOpacity onPress={() => setModalVisible(true)} style={{ width: 300, height: 40, justifyContent: 'center', alignItems: 'flex-end' }}>
    <Text>주소 등록</Text>
</TouchableOpacity>
            
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
        <View style={styles.line} />
        <View>
            <View>
                <Text style={styles.infoText}>프로젝트 우수상</Text>
            </View>
            <Text style={styles.dateText}>2020.06.06</Text>
            <Text style={styles.defaultText2}>마스외전</Text>
        </View>
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
    content = 
    <View style={styles.devContainer}>
        <View style={styles.devIcons}>
            <Image             
                source={java_icon} 
                style={styles.devIcon} />
            <Text style={styles.devIconText}>JAVA</Text>
        </View>
        <View style={styles.devIcons}>
            <Image             
                source={php_icon} 
                style={styles.devIcon} />
            <Text style={styles.devIconText}>PHP</Text>
        </View>
        <View style={styles.devIcons}>
            <Image             
                source={react_icon} 
                style={styles.devIcon} />
            <Text style={styles.devIconText}>React</Text>
        </View>
        <View style={styles.devIcons}>
            <Image             
                source={mysql_icon} 
                style={styles.devIcon} />
            <Text style={styles.devIconText}>MySQL</Text>
        </View>
        <View style={styles.devIcons}>
            <Image             
                source={js_icon} 
                style={styles.devIcon} />
            <Text style={styles.devIconText}>JavaScript</Text>
        </View>
        <View style={styles.devIcons}>
            <Image             
                source={html5_icon} 
                style={styles.devIcon} />
            <Text style={styles.devIconText}>HTML5</Text>
        </View>
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
        <View style={styles.titleContainer}>
        <Image 
                source={write} 
                style={styles.writeImg}
            />
    <Text style={styles.title}>{item.title}
        </Text>

        </View>
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
titleContainer:{
    flexDirection: 'row-reverse', // Add this line to set content direction to right-to-left
    alignItems: 'center', // Add this line to align content to the center
    justifyContent: 'space-between', // Add this line to create space between text and writeImg
  },

writeImg:{
    width:20,
    height:20,
    marginRight: 15,
    marginTop:13
}
});

export default ResumeBox;
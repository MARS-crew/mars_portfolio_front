import {View,Text,StyleSheet,Image} from "react-native";
import {Resume} from '../screens/Resume'
import {Shadow} from 'react-native-shadow-2';
import tel_icon from '../../assets/images/icon-telephone.png';
import home_icon from '../../assets/images/icon-home.png';
import main_icon from '../../assets/images/icon-mail.png';
import { help } from "yargs";

const ResumeBox = ({ item }) => {
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
                        <Text>010-1111-2222</Text>
                </View>
                <View style={styles.iconsText} >
            <Image 
            source={home_icon} 
            style={styles.icon} />
            <Text>경기도</Text>
            </View>
            <View style={styles.iconsText}>
            <Image 
            source={main_icon} 
            style={styles.icon} />
            <Text>123@naver.com</Text>
            </View>
        </View>
    </View>
    ;
    contentStyles = styles.basicInfoContent; // 기본정보 컨텐츠 스타일
} else if (item.id === '3') {
    content = '회사명';
    contentStyles = styles.careerContent; // 경력 컨텐츠 스타일
} else if (item.id === '4') {
    content = '프로젝트 우수상';
    contentStyles = styles.awardContent; // 수상내역 컨텐츠 스타일
} else if (item.id === '5') {
    content = 'IT > 인공지능 > 빅데이터 머신러닝';
    contentStyles = styles.interestContent; // 관심분야 컨텐츠 스타일
} else if (item.id === '6') {
    content = 'IT > 인공지능 > 빅데이터 머신러닝';
    contentStyles = styles.specialtyContent; // 전문분야 컨텐츠 스타일
} else if (item.id === '7') {
    content = '';
    contentStyles = styles.skillContent; // 보유기술 컨텐츠 스타일
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
    <View style={styles.line} />
    <Text style={[styles.content, contentStyles]}>{content}</Text>
    </Shadow>
);
};

const styles = StyleSheet.create({
container: {
    width: '100%',
    margin: 1,
    borderRadius: 10,
    borderColor: '#F5F5F5',
    borderWidth: 1,
    color: 'white',
    borderStyle: 'solid',
    backgroundColor: '#ffffff',
    marginBottom: 20,
},
title: {
    fontSize: 15,
    paddingLeft: 15,
    paddingTop: 15,
    paddingBottom: 12,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
},
line: {
    borderColor: '#F5F5F5',
    borderWidth: 0.2,
},
content: {
    paddingTop: 15,
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
    fontWeight:'900'
},
icons : {
    

},
icon : {
    width:20,
    height:20,
    marginTop:6,
    marginRight:10
},
iconsText:{
    flexDirection: 'row',
    alignItems: 'center',
    marginTop:7,
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

});

export default ResumeBox;
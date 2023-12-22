import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from "react-native";
import { Resume } from '../screens/ResumeContents'
import Id7Popup from "./Id7Popup";
import { Shadow } from 'react-native-shadow-2';
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
import axios from 'axios';



import { help } from "yargs";
import { TouchableOpacity } from 'react-native-gesture-handler';

const fetchResume = async ({ token }) => {
    try {
      const response = await axios({
        method: 'get',
        url: 'http://192.168.200.22:3000/api/v1/resume',
        headers: {
          Authorization: token
        },
      });
      console.log('resume:'+response.data.data[0].resume_id);

      const extractedData = {
        resume_id: response.data.data.resume_id, //이력서 아이디
        introduce: response.data.data.introduce, //이력서 소개
        addr: response.data.data.addr, //주소
        detail_addr: response.data.data.detail_addr, //상세주소
        email: response.data.data.email, //이메일
        tel: response.data.data.tel, //전화번호
        name: response.data.data.name, //이름
        award_name: response.data.data.award_name, //수상이름
        issuer: response.data.data.issuer, //표창기관
        com_name: response.data.data.com_name, //회사이름
        started_date: response.data.data.started_date, //회사 입사일
        period: response.data.data.period, //재직기간
        rank: response.data.data.rank, //직급
        duty: response.data.data.duty, //업무
        group_id: response.data.data.group_id, //그룹아이디
      };

    } catch (error) {
      console.error('여기?'+error);
    }
 };

const IntroContent = ({ item }) => {
    const containerStyles = { ...styles.container, marginTop: 20 }
    return (
        <Shadow
            style={[containerStyles]} // 추가 스타일 적용
            radius={100}
            offset={[1, 1]}
            startColor={'rgba(151, 151, 151, 0.05)'}
            endColor={'rgba(151, 151, 151, 0.01)'}
            distance={8}
        >
            <View>
                <Text style={styles.title}>간단소개</Text>
                <View style={styles.line} />
                <Text style={[styles.content, styles.introContent]}>
                    소개글을 입력해주세요
                </Text>
            </View>
        </Shadow>
    );
}

const InfoContent = ({ item }) => {
    const containerStyles = { ...styles.container };
    return (
        <Shadow
            style={[containerStyles]} // 추가 스타일 적용
            radius={100}
            offset={[1, 1]}
            startColor={'rgba(151, 151, 151, 0.05)'}
            endColor={'rgba(151, 151, 151, 0.01)'}
            distance={8}
        >
            <View>
                <Text style={styles.title}>기본정보</Text>
                <View style={styles.line} />
                <Text style={[styles.content, styles.basicInfoContent]}>
                    <View>
                        <Text style={styles.infoText}>{item.name}</Text>
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
                </Text>
            </View>
        </Shadow>
    )
}
const CareerContent = ({ item }) => {
    const containerStyles = { ...styles.container };
    return (
        <Shadow
            style={[containerStyles]} // 추가 스타일 적용
            radius={100}
            offset={[1, 1]}
            startColor={'rgba(151, 151, 151, 0.05)'}
            endColor={'rgba(151, 151, 151, 0.01)'}
            distance={8}
        >
            <View>
                <Text style={styles.title}>경력</Text>
                <View style={styles.line} />
                <Text style={[styles.content, styles.careerContent]}>
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
                </Text>
            </View>
        </Shadow>
    )
}

const AwardContent = () => {
    const containerStyles = { ...styles.container };
    return (
        <Shadow
            style={[containerStyles]} // 추가 스타일 적용
            radius={100}
            offset={[1, 1]}
            startColor={'rgba(151, 151, 151, 0.05)'}
            endColor={'rgba(151, 151, 151, 0.01)'}
            distance={8}
        >
            <View>
                <Text style={styles.title}>수상내역</Text>
                <View style={styles.line} />
                <Text style={[styles.content, styles.careerContent]}>
                    <View>
                        <View>
                            <View>
                                <Text style={styles.infoText}>프로젝트 우수상</Text>
                            </View>
                            <Text style={styles.dateText}>2020.06.06</Text>
                            <Text style={styles.defaultText2}>마스외전</Text>
                        </View>
                    </View>
                </Text>
            </View>
        </Shadow>
    );
}

const InterestContent = () => {
    const containerStyles = { ...styles.container };
    return (
        <Shadow
            style={[containerStyles]} // 추가 스타일 적용
            radius={100}
            offset={[1, 1]}
            startColor={'rgba(151, 151, 151, 0.05)'}
            endColor={'rgba(151, 151, 151, 0.01)'}
            distance={8}
        >
            <View>
                <Text style={styles.title}>관심분야</Text>
                <View style={styles.line2} />
                <Text style={[styles.content, styles.interestContent]}>
                    <View>
                        <Text style={styles.bunyaText}> IT > 인공지능 > 빅데이터 머신러닝 </Text>
                        <Text style={styles.bunyaText}> IT > 인공지능 > 빅데이터 머신러닝 </Text>
                    </View>
                </Text>
            </View>
        </Shadow>
    );
}

const SpecialityContent = () => {
    const containerStyles = { ...styles.container };
    return (
        <Shadow
            style={[containerStyles]} // 추가 스타일 적용
            radius={100}
            offset={[1, 1]}
            startColor={'rgba(151, 151, 151, 0.05)'}
            endColor={'rgba(151, 151, 151, 0.01)'}
            distance={8}
        >
            <View>
                <Text style={styles.title}>전문분야</Text>
                <View style={styles.line2} />
                <Text style={[styles.content, styles.specialtyContent]}>
                    <View>
                        <Text style={styles.bunyaText}> IT > 인공지능 > 빅데이터 머신러닝 </Text>
                        <Text style={styles.bunyaText}> IT > 인공지능 > 빅데이터 머신러닝 </Text>
                    </View>
                </Text>
            </View>
        </Shadow>
    );
}

const SkillContent = () => {
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

    const containerStyles = { ...styles.container, marginBottom: 20 };
    return (
        <Shadow
            style={[containerStyles]} // 추가 스타일 적용
            radius={100}
            offset={[1, 1]}
            startColor={'rgba(151, 151, 151, 0.05)'}
            endColor={'rgba(151, 151, 151, 0.01)'}
            distance={8}
        >
            <View>
                <Text style={styles.title}>보유기술</Text>
                <View style={styles.line2} />
                <Text style={[styles.content, styles.skillContent]}>
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
                </Text>
            </View>
        </Shadow>
    );

}

const ResumeBox = ({ item, token }) => {
    useEffect(() => {
        // fetchResume 함수에 token을 객체 형태로 전달
        fetchResume({token:token });
    }, [token]); // token이 변경될 때마다 fetchResume 함수를 다시 호출합니다.

    return (
        <View>
            <IntroContent item={item} />
            <InfoContent item={item} />
            <CareerContent item={item} />
            <AwardContent item={item} />
            <InterestContent item={item} />
            <SpecialityContent item={item} />
            <SkillContent item={item} />
        </View>
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
        marginLeft: 20,
        marginRight: 20
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
        width: '100%',
        borderColor: '#F5F5F5',
        borderWidth: 0.2,
        marginTop: 12,
        marginBottom: 15,
    },
    line2: {
        width: '100%',
        borderColor: '#F5F5F5',
        borderWidth: 0.2,
        marginTop: 12,
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
    infoText: {
        color: '#000000',
        fontSize: 16,
        fontWeight: '900',
        marginBottom: 5
    },
    icons: {


    },
    icon: {
        flexDirection: 'column',
        width: 20,
        height: 20,
    },
    iconsText: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 7,
    },
    bunyaText: {
        color: '#072AC8',
        backgroundColor: '#F5F4F9',
        marginTop: 12,
        padding: 6,
        borderRadius: 5

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
    mainText: {

    },
    defaultText: {
        color: '#000000',
        marginLeft: 10,
        fontSize: 14
    },
    defaultText2: {
        color: '#000000',
        fontSize: 14
    },
    dateText: {
        fontSize: 12,
        marginBottom: 5,
    },
    devIconText: {
        justifyContent: 'center',
        marginLeft: 5,
        color: '#000000',
        fontSize: 14,
    },
    devIcons: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F4F9',
        padding: 6,
        borderRadius: 5,
        marginTop: 12,
        marginRight: 12,
    },
    devIcon: {
        flexDirection: 'column',
        width: 22,
        height: 22,
    },
    devContainer: {
        width: 320,
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
});

export default ResumeBox;
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList } from "react-native";
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

import { help } from "yargs";
import { TouchableOpacity } from 'react-native-gesture-handler';

// const IntroContent = ({ item, data }) => {
//     const containerStyles = { ...styles.container, marginTop: 20 }
//     return (
//         <Shadow
//             style={[containerStyles]}
//             radius={100}
//             offset={[1, 1]}
//             startColor={'rgba(151, 151, 151, 0.05)'}
//             endColor={'rgba(151, 151, 151, 0.01)'}
//             distance={8}
//         >
//             <View>
//                 <Text style={styles.title}>간단소개</Text>
//                 <View style={styles.line} />
//                 <Text style={[styles.content, styles.introContent]}>
//                     {data}
//                 </Text>
//             </View>
//         </Shadow>
//     );
// }

const InfoContent = ({ item, name, tel, addr, email }) => {
    const containerStyles = { ...styles.container, marginTop: 20};
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
                <View style={{ marginTop: 10 }}>
                <Text style={[styles.content, styles.basicInfoContent]}>
                    <View style={{ marginTop: 15 }}>
                        <Text style={styles.infoText}>{name}</Text>
                        <View style={styles.icons}>
                            <View style={styles.iconsText}>
                                <Image
                                    source={tel_icon}
                                    style={styles.icon} />
                                <Text style={styles.defaultText}>{tel}</Text>
                            </View>
                            <View style={styles.iconsText} >
                                <Image
                                    source={home_icon}
                                    style={styles.icon} />
                                <Text style={styles.defaultText}>{addr}</Text>
                            </View>
                            <View style={styles.iconsText}>
                                <Image
                                    source={main_icon}
                                    style={styles.icon} />
                                <Text style={styles.defaultText}>{email}</Text>
                            </View>
                        </View>
                    </View>
                </Text>
                </View>
            </View>
        </Shadow>
    )
}

const CareerItem = ({ career }) => {
    return (
        <View>
            <Text style={styles.title}>경력</Text>
            <View style={styles.line} />
            <View style={styles.content}>
                <View style={styles.iconsText}>
                    <Text style={styles.infoText}>{career.com_name}</Text>
                    <Text style={styles.defaultText}>{career.rank}</Text>
                </View>
                <Text style={styles.dateText}>{career.started_date} ~ 2023-06-06 ({career.period})</Text>
                <Text style={styles.defaultText2}>{career.duty}</Text>
            </View>
            <View style={styles.line} />
        </View>
    );
};

const CareerContent = ({ item, carreer }) => {
    const containerStyles = { ...styles.container };
    const careerData = JSON.parse(carreer);

    return (
        <Shadow
            style={[containerStyles]}
            radius={100}
            offset={[1, 1]}
            startColor={'rgba(151, 151, 151, 0.05)'}
            endColor={'rgba(151, 151, 151, 0.01)'}
            distance={8}
        >
            <FlatList
                data={careerData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => <CareerItem career={item} />}
            />
        </Shadow>
    );
};

// const AwardContent = ({award_name, date, issuer}) => {
//     const containerStyles = { ...styles.container };
//     return (
//         <Shadow
//             style={[containerStyles]} // 추가 스타일 적용
//             radius={100}
//             offset={[1, 1]}
//             startColor={'rgba(151, 151, 151, 0.05)'}
//             endColor={'rgba(151, 151, 151, 0.01)'}
//             distance={8}
//         >
//             <View>
//                 <Text style={styles.title}>수상내역</Text>
//                 <View style={styles.line} />
//                 <Text style={[styles.content, styles.careerContent]}>
//                     <View>
//                         <View>
//                             <View>
//                                 <Text style={styles.infoText}>{award_name}</Text>
//                             </View>
//                             <Text style={styles.dateText}>{date}</Text>
//                             <Text style={styles.defaultText2}>{issuer}</Text>
//                         </View>
//                     </View>
//                 </Text>
//             </View>
//         </Shadow>
//     );
// }

// const InterestContent = () => {
//     const containerStyles = { ...styles.container };
//     return (
//         <Shadow
//             style={[containerStyles]} // 추가 스타일 적용
//             radius={100}
//             offset={[1, 1]}
//             startColor={'rgba(151, 151, 151, 0.05)'}
//             endColor={'rgba(151, 151, 151, 0.01)'}
//             distance={8}
//         >
//             <View>
//                 <Text style={styles.title}>관심분야</Text>
//                 <View style={styles.line2} />
//                 <Text style={[styles.content, styles.interestContent]}>
//                     <View>
//                         <Text style={styles.bunyaText}> IT > 인공지능 > 빅데이터 머신러닝 </Text>
//                         <Text style={styles.bunyaText}> IT > 인공지능 > 빅데이터 머신러닝 </Text>
//                     </View>
//                 </Text>
//             </View>
//         </Shadow>
//     );
// }

const SpecialityItem = ({ speciality }) => {
    return (
        // <View style={{ justifyContent: 'center' }}>
        <View style={[styles.content,]}>
            <Text style={styles.bunyaText}> 
                {speciality.parent_category_id} > 
                {speciality.middle_category_id} > 
                {speciality.category_id} 
            </Text>
        </View>
        // </View>
    );
};

const SpecialityContent = ({ specialities }) => {
    const containerStyles = { ...styles.container };
    const specialData = JSON.parse(specialities);

    return (
        <Shadow
            style={[containerStyles]}
            radius={100}
            offset={[1, 1]}
            startColor={'rgba(151, 151, 151, 0.05)'}
            endColor={'rgba(151, 151, 151, 0.01)'}
            distance={8}
        >
            <Text style={styles.title}>전문분야</Text>
            <View style={styles.line2} />
            <FlatList
                data={specialData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => <SpecialityItem speciality={item} />}
            />
        </Shadow>
    );
};

const skillImages = {
    'JAVA': require('../../assets/skills/java.png'),
    'PHP': require('../../assets/skills/php.png'),
    'JavaScript': require('../../assets/skills/js.png'),
    'MySQL': require('../../assets/skills/mysql.png'),
    'React': require('../../assets/skills/react.png'),
    'HTML5': require('../../assets/skills/HTML5.png'),
};

const SkillItem = ({ skill }) => {
    const skillImage = skillImages[skill.tec_name];

    return (
        <View style={styles.skillContainer}>
            <Image source={skillImage} style={styles.skill}/>
        </View>
    );
};


const SkillContent = ({ technology }) => {
    const technologyData = JSON.parse(technology);
    const containerStyles = { ...styles.container, paddingBottom: 12, };
    console.log(technology)

    return (
        <Shadow
            style={[containerStyles]}
            radius={100}
            offset={[1, 1]}
            startColor={'rgba(151, 151, 151, 0.05)'}
            endColor={'rgba(151, 151, 151, 0.01)'}
            distance={8}
        >
            <View>
                <Text style={styles.title}>보유기술</Text>
                <View style={styles.line2} />
                <FlatList
                    data={technologyData}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => <SkillItem skill={item} />}
                    horizontal={false}
                    numColumns={2} // 두 열로 표시
                    contentContainerStyle={styles.devContainer}
                />
            </View>
        </Shadow>
    );
};


const ResumeBox = ({ item, data, index }) => {
    if (!data || !data.data || !data.data[index]) {
        return <View />;
    }

    const resumeItem = data.data[index];


    return (
        <View style={styles.resumeBoxContainer}>
            {/* <IntroContent item={item} data={resumeItem.introduce} /> */}
            <InfoContent 
                item={item} 
                name={resumeItem.name} 
                tel={resumeItem.tel} 
                addr={resumeItem.addr} 
                email={resumeItem.email} 
            />
            <CareerContent 
                item={item} 
                carreer={resumeItem.career}
            />
            {/* <AwardContent 
                item={item} 
                award_name={resumeItem.award_name}
                date={resumeItem.date}
                issuer={resumeItem.issuer}
                 /> */}
            {/* <InterestContent item={item} data={data} /> */}
            <SpecialityContent item={item} specialities={resumeItem.specialities} />
            <SkillContent item={item} technology={resumeItem.technology} />
        </View>
    );
};

const styles = StyleSheet.create({
    resumeBoxContainer: {
        paddingTop: 10, 
        paddingBottom: 10,
    },
    container: {
        width: 360,
        margin: 1,
        borderRadius: 10,
        borderColor: '#F5F5F5',
        borderWidth: 1,
        color: 'white',
        borderStyle: 'solid',
        backgroundColor: '#ffffff',
        marginBottom: 10,
        marginLeft: 20,
        marginRight: 20
    },
    title: {
        fontSize: 15,
        paddingLeft: 15,
        paddingTop: 10,
        fontWeight: 'bold',
        color: 'black',
    },
    line: {
        width: '100%',
        borderColor: '#F5F5F5',
        borderWidth: 0.2,
        marginTop: 12,
    },
    line2: {
        width: '100%',
        borderColor: '#F5F5F5',
        borderWidth: 0.2,
        marginTop: 12,
    },
    content: {
        marginLeft: 15,
        marginRight:15,
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
    skill: {
        height: 30, 
        resizeMode: 'contain', 
    },
    skillContainer:{
         marginTop: 12,
    }
});

export default ResumeBox;
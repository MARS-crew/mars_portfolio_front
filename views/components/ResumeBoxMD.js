import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    Button,
    Modal,
    Pressable,
} from 'react-native';
import {Resume} from '../screens/Resume';
import {Shadow} from 'react-native-shadow-2';
import tel_icon from '../../assets/images/icon-telephone.png';
import home_icon from '../../assets/images/icon-home.png';
import main_icon from '../../assets/images/icon-mail.png';
import java_icon from '../../assets/images/devIcon/java.png';
import php_icon from '../../assets/images/devIcon/php.png';
import js_icon from '../../assets/images/devIcon/javascript.png';
import mysql_icon from '../../assets/images/devIcon/mysql.png';
import react_icon from '../../assets/images/devIcon/react.png';
import css3_icon from '../../assets/images/devIcon/css3.png';
import html5_icon from '../../assets/images/devIcon/html5.png';
import springboot_icon from '../../assets/images/devIcon/springboot.png';
import write from '../../assets/images/write.png';
import Postcode from '@actbase/react-daum-postcode';

import {help} from 'yargs';
import React, {useMemo, useState} from 'react';
import {TouchableOpacity} from 'react-native';

import ResumePopup from './ResumePopup';

const getTechIcon = (techName) => {
    switch(techName) {
        case "JAVA": return java_icon; break;
        case "PHP": return php_icon; break;
        case "SPRING": return springboot_icon; break;
        case "HTML5": return html5_icon; break;

    }
}
const ResumeBox = ({item}) => { 
const containerStyles =
    item.id === '1'
    ? {...styles.container, marginTop: 20}
    : item.id === '7'
    ? {...styles.container, marginBottom: 80}
    : styles.container;

let content = null;
let contentStyles = {}; // 컨텐츠 부분의 스타일
const [inputText, setInputText] = useState('');
const [resume, setResume] = useState({});
// const test = async () => {
//     const result = await axios.get("/api/v1/resume/123");

//     setResume(result.data.data)

// }

const [selectedFirst, setSelectedFirst] = useState("");
const [selectedSecond, setSelectedSecond] = useState("");
const [selectedThird, setSelectedThird] = useState("");

const [interestBunya, setInterestBunya] = useState([]);
const [specialityBunya, setSpecialityBunya] = useState([]);

if (item.id === '1') {
    content = (
    <View>
        <View style={styles.titleContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Image source={write} style={styles.writeImg} />
        </View>
        <View style={styles.line3} />
        <TextInput
        onChangeText={text => {
            setInputText(text);
        }}
        placeholder="소개글을 입력해주세요"
        />
    </View>
    );
} else if (item.id === '2') {
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState('');

    content = (
    <View>
        <View style={styles.titleContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Image source={write} style={styles.writeImg} />
        </View>
        <View style={styles.line} />
        <Text style={styles.infoText}>이화진</Text>
        <View style={styles.icons}>
        <View style={styles.iconsText}>
            <Image source={tel_icon} style={styles.icon} />
            <Text style={styles.defaultText}>010-1111-2222</Text>
        </View>
        <View style={styles.iconsText}>
            <Image source={home_icon} style={styles.icon} />
            <Text style={styles.defaultText}>{selectedAddress}</Text>
            <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={styles.postcode}>
            <Text>주소 등록</Text>
            </TouchableOpacity>
            <Pressable
            onPress={() => {
                setModalOpen(true);
            }}>
            <Modal
                visible={isModalVisible}
                transparent={true}
                animationType="slide">
                <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                }}>
                <View
                    style={{
                    width: 400,
                    height: 470,
                    backgroundColor: 'white',
                    borderRadius: 10,
                    padding: 20,
                    }}>
                    {/* <Text>{resume.introduce}</Text> */}
                    <TouchableOpacity
                    onPress={() => setModalVisible(false)}
                    style={{
                        marginBottom: 0,
                        alignSelf: 'flex-end',
                        padding: 0,
                        backgroundColor: '',
                    }}>
                    <Text>X</Text>
                    </TouchableOpacity>
                    <Postcode
                    style={{width: '100%', height: '100%'}}
                    jsOptions={{animation: true, hideMapBtn: true}}
                    onSelected={data => {
                        setSelectedAddress(data.address); // 선택한 주소 저장
                        setModalVisible(false); // 모달 닫기
                    }}
                    />
                    {/* <Text>선택한 주소: {selectedAddress}</Text> 선택한 주소 표시 */}
                </View>
                </View>
            </Modal>
            </Pressable>

        </View>
        <View style={styles.iconsText}>
            <Image source={main_icon} style={styles.icon} />
            <Text style={styles.defaultText}>123@naver.com</Text>
        </View>
        </View>
    </View>
    );
} else if (item.id === '3') {
    const [companyName, setcompanyName] = useState('');
    const [tenureDate, settenureDate] = useState('');
    const [companyRank, setCompanyRank] = useState('');
    const [mainWork, setMainWork] = useState('');
    const [savedCareer, setSavedCareer] = useState([]);

    const submitBtn = () => {
    if (companyName && tenureDate && companyRank && mainWork) {
        const newContent = {
        name: companyName,
        date: tenureDate,
        Rank: companyRank,
        work: mainWork,
        };

        // 기존의 저장된 내용과 새로운 내용을 함께 저장
        setSavedCareer(prevContents => [...prevContents, newContent]);

        // 상태 변수 초기화
        setcompanyName('');
        settenureDate('');
        setCompanyRank('');
        setMainWork('');
    }
    };
    content = (
    <View>
        <View style={styles.titleContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <TouchableOpacity
            onPress={submitBtn}>
            <Image source={write} style={styles.writeImg} />
        </TouchableOpacity>
        </View>
        {/* ... */}
        {savedCareer.map((content, index) => (
        <View key={index}>
            <View style={styles.line} />
            <View>
            <View style={styles.iconsText}>
                <Text style={styles.infoText}>{content.name}</Text>
                <Text style={styles.defaultText}>{content.Rank}</Text>
            </View>
            <Text style={styles.dateText}>{content.date}</Text>
            <Text style={styles.defaultText2}>{content.work}</Text>
            </View>
        </View>
        ))}
        <View>
        <View style={styles.line} />
        <TextInput
            style={styles.textInput}
            onChangeText={text => {
            setcompanyName(text);
            }}
            placeholder="회사명"
            value={companyName}
        />
        <TextInput
            style={styles.textInput}
            onChangeText={text => {
            settenureDate(text);
            }}
            placeholder="업무기간"
            value={tenureDate}
        />
        <TextInput
            style={styles.textInput}
            onChangeText={text => {
            setCompanyRank(text);
            }}
            placeholder="직급"
            value={companyRank}
        />
        <TextInput
            style={styles.textInput}
            onChangeText={text => {
            setMainWork(text);
            }}
            placeholder="주요업무"
            value={mainWork}
        />
        </View>
    </View>
    );
    contentStyles = styles.careerContent; // 경력 컨텐츠 스타일
} else if (item.id === '4') {
    const [awardName, setAwardName] = useState('');
    const [awardDate, setAwardDate] = useState('');
    const [awardOrganization, setAwardOrganization] = useState('');
    const [savedContents, setSavedContents] = useState([]);

    const submitBtn = () => {
    if (awardName && awardDate && awardOrganization) {
        const newContent = {
        name: awardName,
        date: awardDate,
        organization: awardOrganization,
        };

        // 기존의 저장된 내용과 새로운 내용을 함께 저장
        setSavedContents(prevContents => [...prevContents, newContent]);

        // 상태 변수 초기화
        setAwardName('');
        setAwardDate('');
        setAwardOrganization('');
    }
    };

    content = (
    <View>
        <View style={styles.titleContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <TouchableOpacity
            onPress={submitBtn}>
            <Image source={write} style={styles.writeImg} />
        </TouchableOpacity>
        </View>
        {/* ... */}
        {savedContents.map((content, index) => (
        <View key={index}>
            <View style={styles.line} />
            <View>
            <Text style={styles.infoText}>{content.name}</Text>
            </View>
            <Text style={styles.dateText}>{content.date}</Text>
            <Text style={styles.defaultText2}>{content.organization}</Text>
        </View>
        ))}
        <View>
        <View style={styles.line} />
        <TextInput
            style={styles.textInput}
            onChangeText={text => {
            setAwardName(text);
            }}
            placeholder="수상명"
            value={awardName}
        />
        <TextInput
            style={styles.textInput}
            onChangeText={text => {
            setAwardDate(text);
            }}
            placeholder="수상한 날짜"
            value={awardDate}
        />
        <TextInput
            style={styles.textInput}
            onChangeText={text => {
            setAwardOrganization(text);
            }}
            placeholder="수상기관"
            value={awardOrganization}
        />
        </View>
    </View>
    );

    contentStyles = styles.awardContent; // 수상내역 컨텐츠 스타일
} else if (item.id === '5') {
    const [detailPopVisible,setDetailPopVisible] = useState(false);
    


    content = (
    <View>
        <View style={styles.titleContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <TouchableOpacity
        onPress={() => setDetailPopVisible(true)}
        >
        <Image source={write} style={styles.writeImg} >
        </Image>
        { detailPopVisible ? (
        <ResumePopup
            id={item.id}
            setDetailPopVisible={setDetailPopVisible}
            interestBunya={interestBunya}
            setInterestBunya={setInterestBunya}
        />
        ):null}
        </TouchableOpacity>
        </View>
        <View style={styles.line2} />
        <Text>
        {(interestBunya.length > 0)
                    ?
                    (
                        <View style={styles.selectResult}>
                        { /* {selectedFirst} {">"} {selectedSecond} {">"} {selectedThird} */ }
                        {interestBunya.map((bunya, index) => (
                            <View key={index}>
                                <Text style={styles.bunyaText}>
                                    {bunya.selectedFirst} {">"} {bunya.selectedSecond} {">"} {bunya.selectedThird}
                                </Text>
                                </View>
                                
                        )
                        )}
                        </View>
                    )
                        : (null)
                }
        </Text>
    </View>
    );
    contentStyles = styles.interestContent; // 관심분야 컨텐츠 스타일
} else if (item.id === '6') {

    const [detailPopVisible,setDetailPopVisible] = useState(false);

    content = (
    <View>
        <View style={styles.titleContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <TouchableOpacity
        onPress={() => setDetailPopVisible(true)}
        >
        <Image source={write} style={styles.writeImg} >
        </Image>
        {console.log("please", detailPopVisible)}
        { detailPopVisible ? (
        <ResumePopup
            id={item.id}
            setDetailPopVisible={setDetailPopVisible}
            specialityBunya={specialityBunya}
            setSpecialityBunya={setSpecialityBunya}
        />
        ):null}
        </TouchableOpacity>
        </View>
        <View style={styles.line2} />
        <Text>
        {(specialityBunya.length > 0)
                    ?
                    (
                        <View style={styles.selectResult}>
                        { /* {selectedFirst} {">"} {selectedSecond} {">"} {selectedThird} */ }
                        {specialityBunya.map((bunya, index) => (
                            <View key={index}>
                                <Text style={styles.bunyaText}>
                                    {bunya.selectedFirst} {">"} {bunya.selectedSecond} {">"} {bunya.selectedThird}
                                </Text>
                                </View>
                                
                        )
                        )}
                        </View>
                    )
                        : (null)
                }
        </Text>
    </View>
    );
    contentStyles = styles.specialtyContent; // 전문분야 컨텐츠 스타일
} else if (item.id === '7') {
    const [detailPopVisible,setDetailPopVisible] = useState(false);
    const [techInfo, setTechInfo] = useState([])
    content = (
    <View style={styles.devContainer}>
        <View>
        <View style={styles.titleContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <TouchableOpacity
        onPress={() => setDetailPopVisible(true)}
        >
        <Image source={write} style={styles.writeImg} >
        </Image>
        { detailPopVisible ? (
        <ResumePopup
            id={item.id}
            detailPopVisible={detailPopVisible}
            setDetailPopVisible={setDetailPopVisible}
            setTechInfo={setTechInfo}
        />
        ):null}
        </TouchableOpacity>
        </View>
        </View>
        <View style={styles.line} />
            {techInfo.map((tech, index) => {
                return (
                    <View key={index}
                    style={styles.devIcons}>
                        <Image source={getTechIcon(tech.techName)} style={styles.devIcon} />
                        <Text style={styles.devIconText}>{tech.techName}</Text>

                    </View>
                )
            })}
        {/*<View style={styles.devIcons}>
        <Image source={php_icon} style={styles.devIcon} />
        <Text style={styles.devIconText}>PHP</Text>
        </View>
        <View style={styles.devIcons}>
        <Image source={react_icon} style={styles.devIcon} />
        <Text style={styles.devIconText}>React</Text>
        </View>
        <View style={styles.devIcons}>
        <Image source={mysql_icon} style={styles.devIcon} />
        <Text style={styles.devIconText}>MySQL</Text>
        </View>
        <View style={styles.devIcons}>
        <Image source={js_icon} style={styles.devIcon} />
        <Text style={styles.devIconText}>JavaScript</Text>
        </View>
        <View style={styles.devIcons}>
        <Image source={html5_icon} style={styles.devIcon} />
        <Text style={styles.devIconText}>HTML5</Text>
        </View> */}
    </View>
    );
    contentStyles = styles.skillContent; // 보유기술 컨텐츠 스타일
}

return (
    <Shadow
    style={[containerStyles]} // 추가 스타일 적용
    radius={100}
    offset={[1, 1]}
    startColor={'rgba(151, 151, 151, 0.05)'}
    endColor={'rgba(151, 151, 151, 0.01)'}
    distance={8}>
    {/* {item.id === '5' || item.id === '6' || item.id === '7' ? (
        <View style={styles.line2} />
    ) : (
        <View style={styles.line} />
    )} */}
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
    marginLeft: 20,
    marginRight: 20,
},
title: {
    fontSize: 15,
    paddingTop: 15,
    color: 'black',
    fontWeight:'900'
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
    marginBottom:12,
},
line3: {
    width: '100%',
    borderColor: '#F5F5F5',
    borderWidth: 0.2,
    marginTop: 12,
},
content: {
    flex:1,
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
    marginBottom: 5,
},
icons: {},
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
},
defaultText: {
    color: '#000000',
    marginLeft: 10,
    fontSize: 14,
},
defaultText2: {
    color: '#000000',
    fontSize: 14,
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
    width: 340,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
},
titleContainer: {
    width:320,
 //   backgroundColor:'red',
    flexDirection: 'row',
    justifyContent: 'space-between',
},

writeImg: {
    width: 20,
    height: 20,
    marginTop: 13,
},
selectResult :{
    backgroundColor: '#F5F4F9',
    padding: 6,
    borderRadius: 5,
    marginBottom:12
},
bunyaText2: {
    color: '#072AC8',
},
postcode :{
    width: 300,
    height: 40,
    justifyContent: 'center',
},
bunyablock:{
    marginBottom:12,
}
});

export default ResumeBox;

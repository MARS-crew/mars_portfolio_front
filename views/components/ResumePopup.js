import React, {useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Pressable,
  Text,
  TextInput,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Slider from 'react-native-slider';

const styles = StyleSheet.create({
  modalView: {
    width: 325,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#EEEEEE',
    padding: 20,
    backgroundColor: '#fff',
    marginHorizontal: 25,
  },
  contentView: {
    alignItems: 'center',
  },
  chooseContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    display: 'flex',
    marginBottom: 25,
  },
  chooseBtn: {
    width: 95,
    height: 26,
    borderColor: '#F5F5F5',
    borderBottomWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 5,
  },
  input: {
    borderColor: '#EEEEEE',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 12,
    paddingTop: 14,
    paddingBottom: 14,
    marginBottom: 12,
    width: 285,
    height: 45,
  },
  description: {
    height: 100,
    textAlignVertical: 'top',
  },

  pickBtn: {
    width: 132,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#EEEEEE',
    borderWidth: 1,
    borderRadius: 20,
  },
  chooseOkBtn: {backgroundColor: '#072AC8', borderWidth: 0, marginLeft: 22},
  inputRightMargin: {
    marginRight: 5,
    marginBottom: 0,
  },
  flexEnd: {
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  flexCenter: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 20,
    flexDirection: 'row',
  },
  PressedBtn: {borderBottomWidth: 2, borderColor: '#072AC8'},
  selectBox:{
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#EEEEEE',
    height: 55,
    marginBottom:20,
    marginTop:12
},
selectConponent:{
    width:285,
    height:50,
},
categortTitle:{
    color:'#000000',
    fontWeight:'900',
    marginLeft:5,
    fontSize:16,
    marginBottom:15
},
categortTitle2:{
  color:'#000000',
  fontWeight:'900',
  marginLeft:5,
  fontSize:16,
},
selectResult:{
    color:'#000000',
    fontSize:14,
    padding:15
},
trackStyle1:{
  backgroundColor:'#EEEEEE',
  borderRadius: 100,
  height: 40,
},
trackStyle2:{
  backgroundColor:'#ffffff',
  borderRadius: 100,
  height: 40,
  width: 40,
  
},
trackStyle3:{
  backgroundColor:'red'
},
trackStyle:{
  borderWidth: 1,
  borderRadius: 100,
  backgroundColor:'#EEEEEE',
  borderColor: '#EEEEEE',
  marginBottom:20,
  marginTop:12
},
// thumb: {
//   backgroundColor: '#838486',
//   borderRadius: 1,
//   height: 30,
//   width: 20,
// },
// track: {
//   backgroundColor: '#d5d8e8',
//   borderRadius: 1,
//   height: 18,
// },

});
import PublicModal from './commonComponent/PublicModal';
import Title from './commonComponent/Title';
import ChooseButton from './commonComponent/ChooseButton';
import closeblack from '../../assets/images/closeblack.png';
const DetailPop = ({
  id,
  portfolio,
  onModify,
  detailPopVisible,
  setDetailPopVisible,
  checkChoosePopOkButton,
  setCheckChoosePopOkButton,
  setTogleButton,
  interestBunya,
  setInterestBunya,
  specialityBunya,
  setSpecialityBunya,
  setTechInfo,
}) => {
  const [selectedButton, setSelectedButton] = useState(selectedValue());
  const [button1Pressed, setButton1Pressed] = useState(selected1Pressed());
  const [button2Pressed, setButton2Pressed] = useState(selected2Pressed());
  const [button3Pressed, setButton3Pressed] = useState(selected3Pressed());
  const [choosePopVisible, setChoosePopVisible] = useState(false);
  const [addPressedIf, SetAddPressedIf] = useState(true);
  const [technologyState, setTechnologyState] = useState(0);
  
  const [selectedFirst, setSelectedFirst] = useState("");
  const [selectedSecond, setSelectedSecond] = useState("");
  const [selectedThird, setSelectedThird] = useState("");

  // 포트폴리오 아이템에서 Add 버튼 클릭 시 등장하는 디테일 팝업 적용 후 확인을 눌렀는지 확인하는 스테이트
  {console.log("set", setTechInfo)}
  function selectedValue() {
    if (id == '5') return 'Interset';
    else if (id == '6') return 'Specialty';
    else if (id == '7') return 'Technology';
    else return 'Interset';
  } // id값을 통해 사진 수정 시 초기 selected 값을 사진으로 적용하여 각 종류에 맞는 DetailPopup이 열려있도록 구현

  function selected1Pressed() {
    if (id == '1' || id == '4' || id == '5' || id == '6') return true;
  } // id값을 통해 Photo나 나머지 블럭에서 DetailPopup을 실행한 경우 Photo 버튼의 초기 색상을 설정
  function selected2Pressed() {
    if (id == '2') return true;
  }
  function selected3Pressed() {
    if (id == '3') return true;
  } // id값을 통해 buttonPressed 1~3의 Pressed 값을 useState 초기값으로 설정(버튼의 초기 색상을 담당)

  const handleButtonPress = buttonName => {
    setSelectedButton(buttonName);
  }; // buttonName값을 통해 selectedButton의 Pressed 값을 useState 초기값으로 설정(버튼의 초기 토글을 담당)

  const handleButton1Press = () => {
    setButton1Pressed(true);
    setButton2Pressed(false);
    setButton3Pressed(false);
  };

  const handleButton2Press = () => {
    setButton1Pressed(false);
    setButton2Pressed(true);
    setButton3Pressed(false);
  };

  const handleButton3Press = () => {
    setButton1Pressed(false);
    setButton2Pressed(false);
    setButton3Pressed(true);
  }; // buttonPressed 1~3의 Pressed 여부로 나머지 버튼의 토글 여부를 결정

  // DetailPop Button onPress 용 Props 컴포넌트 start------------------------------------------------------------------------------------------------------------------------

  // const DetailPopCheck = () => {
  //   // 디테일 팝 확인 버튼 클릭 시 발생
  //   if (id == 6) {
  //     setChoosePopVisible(true);
  //   } else {
  //     setDetailPopVisible(false); // pickBtn: 모달 영역 안 (DetailPopup Register 등록)
  //   }

  //   if (setCheckChoosePopOkButton !== undefined) {
  //     setCheckChoosePopOkButton(true);
  //   }

  //   console.log(checkChoosePopOkButton);
  // };
  // DetailPop Button onPress 용 Props 컴포넌트 end------------------------------------------------------------------------------------------------------------------------

  const DetailSectionChooseBtn = ({title, buttonPressed, onPress}) => {
  
    //디테일 팝 섹션(이미지, 영상, 링크) 선택 버튼 공통 컴포넌트
    return (
      <TouchableOpacity
        style={[
          styles.chooseBtn,
          buttonPressed ? styles.PressedBtn : styles.chooseBtn,
        ]}
        onPress={onPress}>
        <Title fontSize={16} color={buttonPressed ? 'blue' : null}>
          {title}
        </Title>
      </TouchableOpacity>
    );
  };
  // const DetailInput = ({description, placeholder}) => {
  //   // 디테일 팝 섹션(이미지, 영상, 링크)별 페이지 속 인풋 구성요소 공통 컴포넌트
  //   const descriptionStyle = {
  //     height: description == true ? 100 : 45,
  //     textAlignVertical: 'top',
  //   };
  //   return (
  //     <TextInput
  //       style={[styles.input, descriptionStyle]}
  //       placeholder={placeholder}
  //       placeholderTextColor="#D8D8D8"></TextInput>
  //   );
  // };
  return (
    <PublicModal
      id={id}
      onModify={onModify}
      isModalVisible={detailPopVisible}
      setIsModalVisible={setDetailPopVisible}>
        {console.log("visible",detailPopVisible)}
      <Pressable
        onPress={() => setDetailPopVisible(true)} // Pressable: Modal 영역 안 클릭 시 Modal 유지 구현을 위해 Pressable로 감싸서 적용
        style={styles.modalView}>
        <View style={styles.flexEnd}>
          <TouchableOpacity
            onPress={() => {
              setDetailPopVisible(false); // pickBtn: 모달 영역 안 (DetailPopup X 닫기)
            }}>
            <Image source={closeblack}></Image>
          </TouchableOpacity>
        </View>
        <View style={styles.contentView}>
 
          {selectedButton === 'Interset' && (
            <View style={styles.TextInputContainer}>
       <View>
            <Text style={styles.categortTitle}>
                1차 카테고리
            </Text>
            <View style={styles.selectBox}>
                <Picker 
                style={styles.selectConponent}
                selectedValue={selectedFirst}
                onValueChange={(value,index) => setSelectedFirst(value)}>
                    <Picker.Item label='선택' value="" />
                    <Picker.Item label='IT' value="IT" />
                    <Picker.Item label='디자인' value="디자인" />
                </Picker>
                
            </View>
            <View>
                <Text style={styles.categortTitle}>
                    2차 카테고리 선택
                </Text>
                <View style={styles.selectBox}>
                <Picker 
                style={styles.selectConponent}
                selectedValue={selectedSecond}
                onValueChange={(value,index) => setSelectedSecond(value)}
                >   
                    <Picker.Item label='선택' value="" />
                    <Picker.Item label='IT' value="IT" />
                    <Picker.Item label='디자인' value="디자인" />
                </Picker>
                </View>
            </View>
            <View>
                <Text style={styles.categortTitle}>
                    3차 카테고리 선택
                </Text>
                <View style={styles.selectBox}>
                <Picker 
                style={styles.selectConponent}
                selectedValue={selectedThird}
                onValueChange={(value,index) => setSelectedThird(value)}
                    >
                    <Picker.Item label='선택' value="" />
                    <Picker.Item label='IT' value="IT" />
                    <Picker.Item label='디자인' value="디자인" />
                </Picker>
                </View>
            </View>
            <View>
                <Text style={styles.categortTitle}>
                    카테고리 선택
                </Text>
                <View style={styles.selectBox}>
                    {selectedFirst !== "" && selectedSecond !== "" && selectedThird !== ""
                    ?
                    (
                        <Text style={styles.selectResult}>
                            
                        {selectedFirst} {">"} {selectedSecond} {">"} {selectedThird}
                        </Text>
                    )
                        : (null)
                }

                </View>
            </View>
        </View>
            </View>
          )}
            {selectedButton === 'Specialty' && (
            <View style={styles.TextInputContainer}>
                      <View>
            <Text style={styles.categortTitle}>
                1차 카테고리
            </Text>
            <View style={styles.selectBox}>
                <Picker 
                style={styles.selectConponent}
                selectedValue={selectedFirst}
                onValueChange={(value,index) => setSelectedFirst(value)}>
                    <Picker.Item label='선택' value="" />
                    <Picker.Item label='IT' value="IT" />
                    <Picker.Item label='디자인' value="디자인" />
                </Picker>
                {console.log(selectedFirst)}
            </View>
            <View>
                <Text style={styles.categortTitle}>
                    2차 카테고리 선택
                </Text>
                <View style={styles.selectBox}>
                <Picker 
                style={styles.selectConponent}
                selectedValue={selectedSecond}
                onValueChange={(value,index) => setSelectedSecond(value)}
                >   
                    <Picker.Item label='선택' value="" />
                    <Picker.Item label='IT' value="IT" />
                    <Picker.Item label='디자인' value="디자인" />
                </Picker>
                </View>
            </View>
            <View>
                <Text style={styles.categortTitle}>
                    3차 카테고리 선택
                </Text>
                <View style={styles.selectBox}>
                <Picker 
                style={styles.selectConponent}
                selectedValue={selectedThird}
                onValueChange={(value,index) => setSelectedThird(value)}
                    >
                    <Picker.Item label='선택' value="" />
                    <Picker.Item label='IT' value="IT" />
                    <Picker.Item label='디자인' value="디자인" />
                </Picker>
                </View>
            </View>
            <View>
                <Text style={styles.categortTitle}>
                    카테고리 선택
                </Text>
                <View style={styles.selectBox}>
                    {selectedFirst !== "" && selectedSecond !== "" && selectedThird !== ""
                    ?
                    (
                        <Text style={styles.selectResult}>
                            
                        {selectedFirst} {">"} {selectedSecond} {">"} {selectedThird}
                        </Text>
                    )
                        : (null)
                }

                </View>
            </View>
        </View>
            </View>
          )}
            {selectedButton === 'Technology' && (
            <View style={styles.TextInputContainer}>
                <Text style={styles.categortTitle2}>
                  기술명
                </Text>
                <View style={styles.selectBox}>
                <Picker 
                style={styles.selectConponent}
                selectedValue={selectedThird}
                onValueChange={(value,index) => setSelectedThird(value)}
                    >
                    <Picker.Item label='선택' value="" />
                    <Picker.Item label='JAVA' value="JAVA" />
                    <Picker.Item label='PHP' value="PHP" />
                    <Picker.Item label='SPRING' value="SPRING" />
                    <Picker.Item label='JAVASCRIPT' value="JAVASCRIPT" />
                    <Picker.Item label='HTML5' value="HTML5" />
                </Picker>
  </View>
  <Text style={styles.categortTitle}>
                  레벨
                </Text>
                <View style={styles.input}>
                <Text>
                {technologyState}
                </Text>
                </View>
                <View
                style={styles.trackStyle}>
                <Slider
                          minimumTrackTintColor="#072AC8"
                          Style={styles.trackStyle3}
                          trackStyle={styles.trackStyle1}
                          thumbStyle={styles.trackStyle2}
                         //width={10}
                          height={50}
                          minimumValue={0}
                          maximumValue={100}
                          step={1}
                          value={technologyState}
                          onValueChange={(value) => setTechnologyState(value)}/>

              </View>
            <Text style={styles.categortTitle}>
                  상세설명
                </Text>
            <TextInput
              onFocus={(e) => e.stopPropagation()}
              style={styles.input}
              placeholder="설명"
              placeholderTextColor="#D8D8D8">
            </TextInput>

            
            </View>
          )}
    
    

          <View style={styles.flexCenter}>
            <ChooseButton
              size="M"
              onPress={() => {
                setDetailPopVisible(false); // pickBtn: 모달 영역 안 (DetailPopup Register 등록)
              }}>
              취소
            </ChooseButton>
            {selectedButton === 'Interset' && (
            <ChooseButton
              size="M"
              background={'blue'}
              onPress={() => {
                
                setInterestBunya((prevList) => [...prevList, {selectedFirst, selectedSecond, selectedThird}] )
                /* DetailPopCheck(); */
                setDetailPopVisible(false);
              }}>
              확인
            </ChooseButton>
            )}
            {selectedButton === 'Specialty' &&(
            <ChooseButton
            size="M"
            background={'blue'}
            onPress={() => {
              
              setSpecialityBunya((prevList) => [...prevList, {selectedFirst, selectedSecond, selectedThird}] )
              /* DetailPopCheck(); */
              setDetailPopVisible(false);
            }}>
            확인
          </ChooseButton>
            )}
            {selectedButton === 'Technology' && (
            <ChooseButton
              size="M"
              background={'blue'}
              onPress={() => {
                setTechInfo((prevList) => [...prevList, {techName: selectedThird, techLevel: technologyState} ])
                /* DetailPopCheck(); */
                setDetailPopVisible(false);
              }}>
              확인
            </ChooseButton>
            )}
          </View>
        </View>
      </Pressable>
{/* 
      <ChoosePop
        id={id}
        title="수정된 내용을 저장하시겠습니까?"
        onModify={onModify}
        portfolio={portfolio}
        addPressedIf={addPressedIf}
        choosePopVisible={choosePopVisible}
        setChoosePopVisible={setChoosePopVisible}
        setDetailPopVisible={setDetailPopVisible}></ChoosePop> */}
    </PublicModal>
  );
};
export default DetailPop;

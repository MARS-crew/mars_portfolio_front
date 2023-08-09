import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Id7Popup from './Id7Popup'

import java_icon from '../../../assets/images/devIcon/java.png'
import php_icon from '../../../assets/images/devIcon/php.png'
import js_icon from '../../../assets/images/devIcon/javascript.png'
import mysql_icon from '../../../assets/images/devIcon/mysql.png'
import react_icon from '../../../assets/images/devIcon/react.png'
import css3_icon from '../../../assets/images/devIcon/css3.png'
import html5_icon from '../../../assets/images/devIcon/html5.png'
import springboot_icon from '../../../assets/images/devIcon/springboot.png'

const Id7 = () => {
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
    

    return (
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
    )
}

const styles = StyleSheet.create({
    devContainer: {
        width: 320,
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
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
    devIconText: {
        justifyContent: 'center',
        marginLeft: 5,
        color: '#000000',
        fontSize: 14,
    },
    devIcon: {
        flexDirection: 'column',
        width: 22,
        height: 22,
    },
    popupContainer: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: '#FFFFFF',
        padding: 10,
        borderRadius: 5,
        elevation: 5,
    },
    popupText: {
        fontSize: 16,
        color: '#000000',
    },
})

export default Id7;

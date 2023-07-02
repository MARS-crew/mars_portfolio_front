import React from "react";
import {
    StyleSheet,
    Text,
    View,
    FlatList
} from 'react-native';
import ResumeBox from "../components/ResumeBox";

const DATA = [
    {
        id : '1',
        title : 'Introduce'
    },
    {
        id : '2',
        title : 'Info'
    },
    {
        id : '3',
        title : 'Career'
    },
    {
        id : '4',
        title : 'Awards'
    },
    {
        id : '5',
        title : 'Specialty'
    },
    {
        id : '6',
        title : 'Interests'
    },
    {
        id : '7',
        title : 'Technology'
    }
];

const Resume = () => {
    const renderItem = ({item}) => <ResumeBox item={item} />;
    return(
    <View style={styles.container}>
        <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        />
    </View>
    )

}

const styles = StyleSheet.create({
    container:{
        padding : 20,
        flex : 1,
        backgroundColor : "rgb(255,255,255)"
    }
})
export default Resume;
import React from "react";
import { View, Button ,StyleSheet,Image,Text,TouchableOpacity} from "react-native";
import people1 from '../../assets/images/people1.jpeg';
import people2 from '../../assets/images/people2.jpg';
//import people3 from '../../assets/images/people3.jpg';
import people4 from '../../assets/images/people4.jpg';

function Main3() {

return (
    <View style={styles.container}>
    <View style={styles.con1}>
    <Image source={people1} style={styles.item1} />
    <Image source={people2} style={styles.item2} />
    </View>
    <View style={styles.con2}>
    <Image source={people4} style={styles.item3} />
    <Image source={people4} style={styles.item4} />
    </View>
    </View>
);
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#fff'
    },
    con1:{
        flex:1,
        flexDirection:'row',
        width:'100%',
        height:'100%'
    },
    con2:{
        flex:1,
        flexDirection:'row',
        width:'100%',
        height:'100%'
    },
    item1:{
        flex:1,
        width:'100%',
        height:'100%'
    },
    item2:{
        flex:1,
        right:0,
        width:'100%',
        height:'100%'
    },
    item3:{
        flex:1,
        width:'100%',
        height:'100%'
    },
    item4:{
        flex:1,
        width:'100%',
        height:'100%'
    }
})
export default Main3;

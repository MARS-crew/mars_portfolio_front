import {View,Text,StyleSheet} from "react-native";
import {Resume} from '../screens/Resume'

const ResumeBox = ({item}) => {

    return(
        <View style={styles.container}>
            <Text style={styles.title}>{item.title}</Text>
            <View style={styles.line}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        borderRadius: 5,
        borderColor: "#adb5bd",
        borderWidth: 1,
        padding: 10,
        marginBottom: 10,
        color: "white",
        borderStyle : 'solid'
     //   backgroundColor: "rgba(50,50,50,1)",
    },
    title : {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 5,
        color : "black"
    },
    line :{
        borderColor: "#00000",
        borderWidth: 0.2,
    }
})

export default ResumeBox;
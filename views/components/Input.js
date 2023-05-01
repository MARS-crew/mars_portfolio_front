import React from "react";
import { TextInput,StyleSheet } from "react-native";

const Input=({inputType,placeholder})=>{
    return(
        <TextInput
        style={styles.input}
        placeholder={placeholder}
        secureTextEntry={inputType == 'password' ? true : false}
        >
        </TextInput>
    )
}

const styles = StyleSheet.create({
    input:{
        margin: 10,
        borderRadius:10,
        backgroundColor: 'yellow'
    }
})

export default Input;
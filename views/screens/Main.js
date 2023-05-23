import React from "react";
import { View, Button} from "react-native";

function Main({ navigation }) {
    const handleLoginPress = () => {
    navigation && navigation.navigate("Login");
};

return (
    <View>
    <Button title="로그인" onPress={handleLoginPress} />
    </View>
);
}

export default Main;

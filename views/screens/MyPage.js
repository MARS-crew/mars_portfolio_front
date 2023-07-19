import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { back } from "react-native/Libraries/Animated/Easing";

const MyPage = () => {
  return (
    <View style={styles.Container}>
      <View style={styles.visitContainer}>
        <View style={styles.visitSubContainer}>
          <Text >오늘방문자 수</Text>
          <Text style={styles.visitText}>10</Text>
        </View>
        <View style={styles.line}/>
        <View>
          <Text>누적방문자 수</Text>
          <Text style={styles.visitText}>300</Text>
        </View>
      </View>

      <View style={styles.logContainer1}>
        <View style={styles.logContainer2}>
          <TouchableOpacity style={styles.btn1}>
            <Text>방문기록</Text>
            <View style={styles.btnLine} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn}>
            <Text>좋아요</Text>
            <View style={styles.btnLine} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn}>
            <Text>찜하기</Text>
            <View style={styles.btnLine} />
          </TouchableOpacity>
        </View>
        <View style={styles.logContainer3}>
          <Text>jeaHYeopLee님 2020-03-22 15:33:33</Text>
          <Text>jeaHYeopLee님 2020-03-22 15:33:33</Text>
          <Text>jeaHYeopLee님 2020-03-22 15:33:33</Text>
          <Text>jeaHYeopLee님 2020-03-22 15:33:33</Text>
          <Text>jeaHYeopLee님 2020-03-22 15:33:33</Text>
          <Text>jeaHYeopLee님 2020-03-22 15:33:33</Text>
          <Text>jeaHYeopLee님 2020-03-22 15:33:33</Text>
          <Text>jeaHYeopLee님 2020-03-22 15:33:33</Text>
          <Text>jeaHYeopLee님 2020-03-22 15:33:33</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Container:{
    width:'100%',
    flex:1,
    backgroundColor:'#F5F4F9'
  },
  logContainer1: {
    marginLeft:20,
    marginRight:20,
    backgroundColor:'#ffffff',
    borderColor: "#000000",
    borderWidth: 1,
    borderRadius:10,
    
  },
  logContainer2: {
    flexDirection: "row",
    height:40
  },
  visitContainer:{
    marginTop:25,
    marginLeft:15,
    marginRight:15,
    marginBottom:25,
    backgroundColor:'#ffffff',
    flexDirection: "row",
    justifyContent: 'space-around',
    borderRadius:10,
    borderStyle:'solid',
    borderWidth: 1,
    padding:15
  },
  visitSubContainer:{

  },
  visitText:{
    textAlign:'center'
  },
  btn1: {
    width: 120,
    height:40,
    alignItems: "center",
    justifyContent: 'center',
    marginBottom:25,
    
  },
  line:{
    borderStyle:'solid',
    borderWidth: 0.2,
    borderColor:'#F5F5F5'
  },
  btn: {
    width: 110,
    height:40,
    alignItems: "center",
    justifyContent: 'center',
  },
  btnLine:{
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 1,
    backgroundColor: '#F5F5F5',
    
  },
  logContainer3:{

  }
});

export default MyPage;

import React from "react";
import { View, Button ,StyleSheet,Image,Text,ScrollView ,FlatList,StatusBar, SafeAreaView} from "react-native";

const a=()=>(
    <View style={{ margin: 10, borderStyle: 'solid', borderWidth: 1 }}>
    <Text style={{ fontSize: 45, fontWeight: 'bold' }}>Introduce</Text>
    <Text style={{ margin: 10, fontSize: 20, fontWeight: 'normal' }}>안녕하세요. 저는 마스외전4기 김채린입니다.</Text>
  </View>
    
);

const b=()=>(
    <View style={{ margin: 10, borderStyle: 'solid', borderWidth: 1 }}>
    <Text style={{ fontSize: 45, fontWeight: 'bold' }}>Info</Text>
    <Text style={{ margin: 10, fontSize: 20, fontWeight: 'normal' }}>Name          김채린</Text>
    <Text style={{ margin: 10, fontSize: 20, fontWeight: 'normal' }}>Tel               010-1234-1234</Text>
    <Text style={{ margin: 10, fontSize: 20, fontWeight: 'normal' }}>Adress        경기도 용인시 유부우동</Text>
    <Text style={{ margin: 10, fontSize: 20, fontWeight: 'normal' }}>E-mail         123@naver.com</Text>
  </View>
);

const c=()=>(
    <View style={{ margin: 10, borderStyle: 'solid', borderWidth: 1 }}>
    <Text style={{ fontSize: 45, fontWeight: 'bold' }}>Career</Text>
    <Text style={{ margin: 10, fontSize: 20, fontWeight: 'normal' }}>회사명      입사일      기간      직위      업무</Text>
    <Text style={{ margin: 10, fontSize: 20, fontWeight: 'normal' }}>mars      2022.01      1년      사원      기획</Text>
  </View>
);

const d=()=>(
    <View style={{ margin: 10, borderStyle: 'solid', borderWidth: 1 }}>
    <Text style={{ fontSize: 45, fontWeight: 'bold' }}>Awards</Text>
    <Text style={{ margin: 10, fontSize: 20, fontWeight: 'normal' }}>기간                  수상명                  발행기간</Text>
    <Text style={{ margin: 10, fontSize: 20, fontWeight: 'normal' }}>기간                  수상명                  발행기간</Text>
  </View>
);

const DATA=[
        {
            id: '1',
            title:a(),
        },
        {
            id: '2',
            title: b(),
        },
        {
            id: '3',
            title: c(),
        },
        {
            id: '4',
            title: d()
        },
    
];

const Item = ({ title }) => (
    <View style={styles.item}>
    <View style={styles.title}>{title}</View>
</View>
);

function Resume() {

const renderItem = ({ item }) => {
    return (
    <Item title={item.title}    />
    );
};

return (
    <View style={styles.container}>
            <SafeAreaView>
    <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
    />
    </SafeAreaView>
    </View>
);
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: StatusBar.currentHeight || 0,
    },
    scrollViewContent: {
    flexGrow: 10
    },
    item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    },
    title: {
    fontSize: 32,
    },
    /*
    text1: {
    fontSize: 45,
    fontWeight: 'bold',
    },
    text2: {
    margin: 10,
    fontSize: 20,
    fontWeight: 'normal',
    },
    con1: {
    margin: 10,
    borderStyle: 'solid',
    borderWidth: 1
    }
    */
});

export default Resume;

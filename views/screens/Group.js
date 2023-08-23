import {React} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  SafeAreaView,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';

import GroupItem from '../components/GroupItem';
import GroupLogo from '../components/GroupLogo';
import LoginItem from '../components/LoginItem';

const Item = ({id, src, medal}) => (
  <View>
    <GroupItem id={id} src={src} medal={medal} />
  </View>
);

const Group = ({data}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <FlatList
          data={data}
          renderItem={({item}) => <Item id={item.id} src={item.src} />}>
        </FlatList>
        <Image
          source={require('../../assets/images/GroupLogo.png')}
          style={styles.image}
          resizeMode="stretch"
        />
        <Text style={styles.text}>9기</Text>
        {/* <GroupLogo style={styles.logo} /> */}
        <View style={styles.login}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.btn_text}>로그인</Text>
            <Image source={require('../../assets/images/LoginNextItem.png')} />
            {/* <LoginItem style={styles.login} /> */}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  login: {
    position: 'absolute',
  },
  text: {
    position: 'absolute',
    color: 'white',
    left: 95,
    top: 67,
    fontSize: 24,
  },
  image: {
    position: 'absolute',
    width: 70,
    height: 70,
    resizeMode: 'contain',
    left: 20,
    top: 25,
  },
  button: {
    width: 104,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderStyle: 'solid',
    top: 650,
    left: 245,
    borderRadius: 24,
    borderColor: 'white',
    border: 2,
    flexDirection: 'row',
  },
  btn_text: {
    color: 'white',
    fontSize: 16,
  },
});

export default Group;

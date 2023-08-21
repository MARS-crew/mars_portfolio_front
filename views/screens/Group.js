import {React} from 'react';
import {StyleSheet, View, FlatList, SafeAreaView} from 'react-native';

import GroupItem from '../components/GroupItem';
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
          renderItem={({item}) => <Item id={item.id} src={item.src} />}
        />
        <LoginItem style={styles.login}/>
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
});

export default Group;

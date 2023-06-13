import {React} from 'react';
import {StyleSheet, View, FlatList, SafeAreaView} from 'react-native';

import ManyGroupItem from '../components/ManyGroupItem';

const ManyItem = ({id, src}) => (
  <View>
    <ManyGroupItem id={id} src={src} />
  </View>
);

const ManyGroup = ({data}) => {
  return (
    <SafeAreaView style={styles.containbox}>
      <FlatList
        data={data}
        renderItem={({item}) => <ManyItem id={item.id} src={item.src} />}
        numColumns={2}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containbox: {
    flex: 1,
    backgroundColor: 'white',
  },
  button: {
    width: 40,
    height: 20,
    position: 'absolute',
  },
  container: {
    backgroundColor: 'white',
  },
  manyRow: {
    flex: 1,
    flexDirection: 'row',
  },
});

export default ManyGroup;

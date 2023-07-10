import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const Help = () => {
  return (
    <View style={styles.container}>
      <Text>Help</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  con1: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    height: '100%',
  },
  con2: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    height: '100%',
  },
  item1: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  item2: {
    flex: 1,
    right: 0,
    width: '100%',
    height: '100%',
  },
  item3: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  item4: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  floatingMenu: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
});
export default Help;

import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const ManyGroupItem = ({id, src}) => {
  return (
    <View style="outLine">
      <TouchableOpacity>
        <View style={styles.midLine}>
          <Image source={src} style={styles.manyImage} />
          <View style={styles.manyTitle}>
            <Text style={styles.manyText}>{id}기입니다만</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  outline: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 15,
  },
  midLine: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  manyImage: {
    width: 200,
    height: 200,
    left: 0,
    top: 0,
    borderWidth: 2,
    borderColor: '#000000',
    borderStyle: 'solid',
  },
  manyTitle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    height: 50,
    borderWidth: 2,
    borderColor: '#000000',
    borderStyle: 'solid',
  },
  manyText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default ManyGroupItem;

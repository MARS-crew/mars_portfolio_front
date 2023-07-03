import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const GroupVideoItem = ({id, video}) => {
  return (
    <View style="outLine">
      <TouchableOpacity>
        <View style={styles.midLine}>
          <Image source={video} style={styles.manyImage} />
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

export default GroupVideoItem;

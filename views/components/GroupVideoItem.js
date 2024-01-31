import React from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Image,
  Dimensions,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import MedalItem from './MedalItem';
import { useIndexContext } from '../../IndexContext';
import {useDispatch} from "react-redux";
import {setCurrentMemberIdRx, setIsReloadViewDataRx, setScreenTypeRx} from "../../redux/slice/UiRenderSlice";
import {SCREEN_3, SCREEN_4} from "../../AppConst";

const { width, height } = Dimensions.get('window');
const widthCol = width / 2;
const heightCol = height / 2;


const GroupVideoItem = ({ id, medal, src }) => {
  const { currentIndex, changeIndex,
    horizontalIndex, changeHorizontalIndex,
    dataIndex, changeDataIndex,
    selectedMemId, changeSelectedMemId,
    selectedGroupId, changeSelectedGroupId,
    selectedMember, changeSelectedMember } = useIndexContext();

  const dispatch = useDispatch();

  const handlePress = () => {

    dispatch(setScreenTypeRx(SCREEN_3))
    dispatch(setCurrentMemberIdRx(id))
    // dispatch(setIsReloadViewDataRx(true))
    // if (selectedMemId !== id && !selectedMember) {
    //
    //
    //   changeSelectedMemId(id);
    //   changeHorizontalIndex(2);
    //   changeSelectedMember(true);
    //
    // }
  }

  return (
    <TouchableOpacity style={styles.outline} onPress={handlePress}>
      <View style={styles.midLine}>
        <ImageBackground source={src} style={styles.manyImage}>
          {medal === 'y' ? (
            <MedalItem />
          ) : null}
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  outline: {
    width: width / 2,
    height: height / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  midLine: {
    // width: widthCol,
    // height: heightCol,
    width: width / 2,
    height: height / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },

  manyImage: { resizeMode: 'cover', width: '104%', height: '100%' },
});

export default GroupVideoItem;

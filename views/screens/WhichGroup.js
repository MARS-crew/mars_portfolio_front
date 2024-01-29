import React, { useEffect, useState } from 'react';
import axios from 'axios'; // axios를 import 하세요.
import Group from './Group';
import {getGroupImage} from "../../api/v1/img";
import {useDispatch, useSelector} from "react-redux";
import {getGroupImgSelector, setGroupImgList} from "../../redux/slice/GroupImgSlice";
import GroupItem from "../components/GroupItem";
import {View} from "react-native";
import {userTokenSelector} from "../../redux/slice/UserInfoSlice";

const WhichGroup = ({ idx }) => {
  const [token, setToken] = useState();
  const [fileData, setFileData] = useState(null);
  const dispatch = useDispatch();

  const groupImgList = useSelector(getGroupImgSelector);
  useEffect(() => {
    setFileData(groupImgList)
  }, [groupImgList]);

  const userToken = useSelector(userTokenSelector);
  useEffect(() => {
    setToken(userToken)
  }, [userToken]);

  return <View>
    {(fileData != null && fileData.length > 0 ? <GroupItem id={fileData[idx].group_id} src={fileData[idx].url} token={token} /> : null)}
  </View>;
};

export default WhichGroup;

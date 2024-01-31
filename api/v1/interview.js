import {reqGet, reqPost, reqPut} from '../common';
import axios from "axios";

const SUB_DIR = '/api/v1/interview';

const getInterview = async function (token, config){
    return reqGet(`${SUB_DIR}/`, token, null, config);
}

const getInterviewOne = async function (token, id, config){
    return reqGet(`${SUB_DIR}/${id}`, token, null, config);
}

const updateInterview = async function(token, data, config){
    return reqPut(`${SUB_DIR}/` + data.interviewId, token, data, config);
}

const toggleInterviewHeart = async function(token, data){
    return reqPost(`${SUB_DIR}/heart/${data.id}`, token);
}



export { getInterview, getInterviewOne, updateInterview, toggleInterviewHeart };

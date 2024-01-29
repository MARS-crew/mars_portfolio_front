import {reqDelete, reqGet, reqPost, reqPut} from '../common';
import axios from "axios";

const SUB_DIR = '/api/v1/resume';

const getResumes = async function (token, data, config){
    return reqGet(`${SUB_DIR}`, token, null, config);
}


const regResume = async function (token, data, config){
    // https://api.writeyoume.com/api/v1/review/${selectedMemId}
    return reqPost(`${SUB_DIR}`, token, data, config);
}

const updateResume = async function (token, data, config){
    return reqPut(`${SUB_DIR}/${data.id}`, token, data, config);
}

const deleteResume = async function (token, data, config){
    return reqDelete(`${SUB_DIR}/${data.id}`, token, data, config);
}



export { getResumes, regResume, updateResume, deleteResume };

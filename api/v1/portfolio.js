import {reqDelete, reqGet, reqPost, reqPut, reqPutForm} from '../common';
import axios from "axios";

const SUB_DIR = '/api/v1/portfolio';

const getPortfolios = async function (token, data, config){
    return reqGet(`${SUB_DIR}`, token, null, config);
}


const regPortfolio = async function (token, data, config){
    // https://api.writeyoume.com/api/v1/review/${selectedMemId}
    return reqPost(`${SUB_DIR}`, token, data, config);
}

const updatePortfolio = async function (token, data, config){
    return reqPutForm(`${SUB_DIR}/${data.id}`, token, data, config);
}

const deletePortfolio = async function (token, data, config){
    return reqDelete(`${SUB_DIR}/${data.id}`, token, data, config);
}



export { getPortfolios, regPortfolio, updatePortfolio, deletePortfolio};

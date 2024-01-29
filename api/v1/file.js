import { reqGet } from '../common';
import axios from "axios";

const SUB_DIR = '/api/v1';

const getRetrieveUrl = async function (token, file, config){
    return reqGet(`${SUB_DIR}/presignedUrl?name=${file.uri}`, token, null, config);
}


export { getRetrieveUrl };

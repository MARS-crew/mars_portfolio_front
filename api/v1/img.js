import { reqGet } from '../common';
import axios from "axios";

const SUB_DIR = '/api/v1/img';

const getGroupImage = async function (token){
    return reqGet(`${SUB_DIR}/group`, token, null, null);
}

const getAlbumImage = async function (token, config){
    return reqGet(`${SUB_DIR}/album`, token, null, config);
}


export { getGroupImage, getAlbumImage };

import {reqDelete, reqGet, reqPost, reqPut} from '../common';
import axios from "axios";

const SUB_DIR = '/api/v1/review';

const getReviews = async function (token, id, config){
    // https://api.writeyoume.com/api/v1/review/${selectedMemId}
    return reqGet(`${SUB_DIR}/${id}`, token, null, config);
}


const regReview = async function (token, data, config){
    // https://api.writeyoume.com/api/v1/review/${selectedMemId}
    return reqPost(`${SUB_DIR}`, token, data, config);
}

const updateReviewAjax = async function (token, data, config){
    return reqPut(`${SUB_DIR}/${data.reviewId}`, token, data, config);
}

const deleteReviewAjax = async function (token, data, config){
    return reqDelete(`${SUB_DIR}/${data.reviewId}`, token, data, config);
}

const toggleReviewLike = async function (token, data, config){
    return reqPost(`${SUB_DIR}/like`, token, data, config);
}


export { getReviews, regReview, updateReviewAjax, deleteReviewAjax, toggleReviewLike};

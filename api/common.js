import axios from './axios';

const reqAjax = async function  (url, type, token, data, extend_conf) {
    let conf = {
        method: type,
        url: url,
        headers: {
            Authorization: token,
        }
    };

    if(type === 'GET') {
        conf.params = data;
    }
    else {
        conf.data = data;
    }

    if(typeof(extend_conf) != 'undefined' && extend_conf !== null) {
        conf = Object.assign({}, conf, extend_conf);
    }
    return axios(conf);
}


const reqGet = async function (url, token, params, config) {
    return await reqAjax(url, 'GET', token,  params, config);
}

const reqPost = async function (url, token, data, config) {
    return await reqAjax(url, 'POST', token, data,  config);
}

const reqPut = async function (url, token, data, config) {
    return await reqAjax(url, 'PUT', token, data, config);
}

const reqPutForm = async function (url, token, data, config) {
    if(typeof(config) == 'undefined' || config == null){
        config = {
            'Content-Type': 'multipart/form-data'
        }
    }
    return await reqPut(url, token, data, config);
}


const reqDelete = async function (url, token, data, config) {
    return await reqAjax(url, 'DELETE', token, data, config);
}




export { reqAjax, reqGet, reqPost, reqPut, reqDelete, reqPutForm }

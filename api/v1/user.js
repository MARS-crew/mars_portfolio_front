import { reqGet } from '../common';

const SUB_DIR = '/api/v1';

const getUserTokenInCookie = async function (){
    return reqGet(`/main`, null, null, null)
        .then(function (response) {
            const cookie = response.headers.get('set-cookie');

            console.log('cookie = ' + JSON.stringify(cookie));

            // 순수 토큰값을 가져오기 위한 전처리, 넘어오는 토큰 데이터의 형식이 'token={순수 토큰값}; Path' 형식으로 들어옴
            if(cookie != null){
                return cookie[0].split('token=')[1].split(';')[0]
            }

            throw 'COOKIE IS NULL';
        })
        .catch(function (error) {
            console.error(error);
        })
}


const getUserInfoByToken = async function (token, config){
    return reqGet(`${SUB_DIR}/userbytoken`, token, null, config);
}

const getMyPageInfo = async function (token, user_id){
    return reqGet(`${SUB_DIR}/mypage/${user_id}`, token, null, null);
}


export { getUserTokenInCookie, getUserInfoByToken, getMyPageInfo };

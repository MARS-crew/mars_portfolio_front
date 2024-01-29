import axios from 'axios';

const inst = axios.create();
inst.defaults.timeout = 10000;
inst.defaults.baseURL = process.env.BACKEND_URL || 'https://api.writeyoume.com'; //TODO:실서버변경포인트

export default inst;

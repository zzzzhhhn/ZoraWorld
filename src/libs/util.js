import axios from 'axios';
import env from '../config/env';

let util = {

};
util.title = function(title) {
    title = title ? title + ' - Home' : 'iView project';
    window.document.title = title;
};

util.ajaxUrl = env === 'development' ?
    'http://127.0.0.1:88' :
    env === 'production' ?
    'http://zoraworld.club' :
    'https://debug.url.com';
const url = util.ajaxUrl;
util.ajax = axios.create({
    baseURL: url,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    timeout: 30000
});

export default util;
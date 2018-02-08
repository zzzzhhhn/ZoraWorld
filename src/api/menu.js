import Util from '../libs/util';

function fetch(url, params, cb) {
    Util.ajax.post(url, params, cb)
        .then(res => {
            return cb(res.data);
        }).catch(err => {
        if (err.response) {
            // 请求已经发出，但是服务器响应返回的状态吗不在2xx的范围内
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.header);
        } else {
            // 一些错误是在设置请求的时候触发
            console.log('Error', err.message);
        }
        console.log(err.config);
    });
}

/*
 * @Description: 数据请求方法
 * @Date: 2017-07-05 08:13:38
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2017-09-18 12:50:21
 */
export default {
    // 登录信息
    getMenuData(cb, params) {
        return fetch('server/main.php', {menu: true}, cb);
    },
    getIndexData(cb, params) {
        return fetch('server/main.php', { bNo: params }, cb);
    },
};
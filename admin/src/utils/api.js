import requestAll from './request.js';

// const webUrl = '域名'
// const baseUrl = apiUrl + '?act='

const api= {
    //获取所有用户
    getUserList(data){
        let param={
            url:"/getUserList",
            method:"get",
            data:data
        }
        return requestAll.requestGet(param);
    },
    //添加新用户
    newUser(data){
        let param={
            url:"/newUser",
            method:"post",
            data:data
        }
        return requestAll.request(param);
    },
};

export default api
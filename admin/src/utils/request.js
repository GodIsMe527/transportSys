import axios from 'axios'
const baseUrl = process.env.VUE_APP_API_URL||"/app/api"
axios.interceptors.request.use(
    config => {
        // 判断是否存在token，如果存在的话，则每个http header都加上token
        // let token = localStorage.getItem('token')
        // if (token) {
        //     config.headers["X-USER-TOKEN"] = token;
        // }
        return config;
    },
    error => {
        return Promise.reject(error);
    });

function request(param) {
    return new Promise((resolve, reject) => {
        axios({
            url: baseUrl+param.url,
            method: param.method,
            headers: {
                'Content-Type': 'application/json'
            },
            data: param.data
        })
            .then(res => {
                //成功
                resolve(res)
            })
            .catch(res => {
                //失败
                reject(res)
            })
    })
}
function requestGet(param) {
  return new Promise((resolve, reject) =>{
        axios.get(baseUrl+param.url, {
            params: param.data
        }).then(res => {
            resolve(res);
        }).catch(err =>{
            reject(err)
        })
    })
}

export default {
    request: request,
    requestGet: requestGet,
}
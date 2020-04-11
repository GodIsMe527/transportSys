import requestAll from './request.js';

// const webUrl = '域名'
// const baseUrl = apiUrl + '?act='

const api= {
    //登录
    login(data){
        let param={
            url:"/login",
            method:"post",
            data:data
        }
        return requestAll.request(param);
    },
    //获取货物列表
    getCargos(data){
        let param={
            url:"/getCargos",
            method:"get",
            data:data
        }
        return requestAll.request(param);
    },
    //获取地址列表
    getAddress(data){
        let param={
            url:"/getAddress",
            method:"get",
            data:data
        }
        return requestAll.request(param);
    },
    //获取地址列表
    getVehicles(data){
        let param={
            url:"/getVehicles",
            method:"get",
            data:data
        }
        return requestAll.request(param);
    },
    //添加运输记录
    addTransportation(data){
        let param={
            url:"/addTransportation",
            method:"post",
            data:data
        }
        return requestAll.request(param);
    },
    //根据id获取运输记录
    getTransportationByUserId(data){
        let param={
            url:"/getTransportationByUserId",
            data:data
        }
        return requestAll.requestGet(param);
    },
    //修改运输记录
    editTransportation(data){
        let param={
            url:"/editTransportation",
            method:"post",
            data:data
        }
        return requestAll.request(param);
    },
    //删除运输记录
    delTransportation(data){
        let param={
            url:"/delTransportation",
            method:"post",
            data:data
        }
        return requestAll.request(param);
    },
    //添加其他费用
    addOtherFee(data){
        let param={
            url:"/addOtherFee",
            method:"post",
            data:data
        }
        return requestAll.request(param);
    },
    //修改其他费用
    editOtherFee(data){
        let param={
            url:"/editOtherFee",
            method:"post",
            data:data
        }
        return requestAll.request(param);
    },
    //修改其他费用
    delOtherFee(data){
        let param={
            url:"/delOtherFee",
            method:"post",
            data:data
        }
        return requestAll.request(param);
    },
};

export default api
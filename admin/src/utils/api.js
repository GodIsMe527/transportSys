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
        };
        return requestAll.request(param);
    },
    //获取所有用户
    getUserList(data){
        let param={
            url:"/getUserList",
            method:"get",
            data:data
        }
        return requestAll.requestGet(param);
    },
    //获取所有地点
    getStartPointList(data){
        let param={
            url:"/getStartPointList",
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
        };
        return requestAll.request(param);
    },
    //编辑新用户
    editUser(data){
        let param={
            url:"/editUser",
            method:"post",
            data:data
        };
        return requestAll.request(param);
    },
    //添加新地点
    newPoint(data){
        let param={
            url:"/newPoint",
            method:"post",
            data:data
        };
        return requestAll.request(param);
    },
    //修改用户状态
    delUser(data){
        let param={
            url:"/delUser",
            method:"post",
            data:data
        };
        return requestAll.request(param);
    },
    //修改地点
    editPoint(data){
        let param={
            url:"/editStartPoint",
            method:"post",
            data:data
        };
        return requestAll.request(param);
    },
    //修改地点状态
    deletePoint(data){
        let param={
            url:"/deletePoint",
            method:"post",
            data:data
        };
        return requestAll.request(param);
    },
    //修改车辆状态
    deleteVehicle(data){
        let param={
            url:"/deleteVehicle",
            method:"post",
            data:data
        };
        return requestAll.request(param);
    },
    //修改记录状态
    delRecord(data){
        let param={
            url:"/delRecord",
            method:"post",
            data:data
        };
        return requestAll.request(param);
    },
    //添加车辆
    newVehicle(data){
        let param={
            url:"/newVehicle",
            method:"post",
            data:data
        };
        return requestAll.request(param);
    },
    //获取所有车辆
    getVehicleList(data){
        let param={
            url:"/getVehicleList",
            method:"get",
            data:data
        };
        return requestAll.requestGet(param);
    },
    //添加货物
    newCargo(data){
        let param={
            url:"/newCargo",
            method:"post",
            data:data
        };
        return requestAll.request(param);
    },
    //新增记录
    newRecord(data){
        let param={
            url:"/newRecord",
            method:"post",
            data:data
        };
        return requestAll.request(param);
    },
    //修改记录
    editRecord(data){
        let param={
            url:"/editRecord",
            method:"post",
            data:data
        };
        return requestAll.request(param);
    },
    //修改车辆
    editVehicle(data){
        let param={
            url:"/editVehicle",
            method:"post",
            data:data
        };
        return requestAll.request(param);
    },
    //获取所有货物
    getCargoList(data){
        let param={
            url:"/getCargoList",
            method:"get",
            data:data
        };
        return requestAll.requestGet(param);
    },
    //修改货物
    editCargo(data){
        let param={
            url:"/editCargo",
            method:"post",
            data:data
        };
        return requestAll.request(param);
    },
    //修改货物状态
    deleteCargo(data){
        let param={
            url:"/deleteCargo",
            method:"post",
            data:data
        };
        return requestAll.request(param);
    },
    //获取所有运输记录列表
    getRecordList(data){
        let param={
            url:"/getRecordList",
            method:"get",
            data:data
        };
        return requestAll.requestGet(param);
    }

};

export default api
<template>
    <div class="filter">
        <div class="firstCondition" v-if="showDate">
            <div class="block">
                <span class="title">开始日期: </span>
                <el-date-picker
                        v-model="startD"
                        :type="dateType"
                        placeholder="开始日期">
                </el-date-picker>
            </div>
            <div class="block">
                <span class="title">结束日期: </span>
                <el-date-picker
                        v-model="endD"
                        :type="dateType"
                        placeholder="结束日期">
                </el-date-picker>
            </div>
            <div class="block">
                <el-button type="primary" @click="commit">提交</el-button>
            </div>
        </div>
        <div class="firstCondition secondCondition" v-if="showSecondCondition">
            <el-select v-model="driverD" filterable placeholder="选择司机" class="block">
                <el-option
                        v-for="item in drivers"
                        :key="item.id"
                        :label="item.userName"
                        :value="item.id">
                </el-option>
            </el-select>
            <el-select v-model="cargoD" filterable placeholder="选择货物" class="block">
                <el-option
                        v-for="item in cargoes"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                </el-option>
            </el-select>
            <el-select v-model="vehicleD" filterable placeholder="选择车辆" class="block">
                <el-option
                        v-for="item in vehicles"
                        :key="item.id"
                        :label="item.no"
                        :value="item.id">
                </el-option>
            </el-select>
            <el-select v-model="start" filterable placeholder="选择起点" class="block">
                <el-option
                        v-for="item in startPoints"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                </el-option>
            </el-select>
            <el-select v-model="end" filterable placeholder="选择终点" class="block">
                <el-option
                        v-for="item in endPoints"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                </el-option>
            </el-select>
        </div>
    </div>
</template>

<script>
    import api from '../../utils/api'

    export default {
        name: "filterHead",
        props: {
            showDate: {
                type: Boolean,
                default: true
            },
            showSecondCondition: {
                type: Boolean,
                default: true
            },
            dateType:{
                type: String,
                default: "datetime"
            }
        },
        data() {
            return {
                drivers: [],
                points: [],
                startPoints:[],
                endPoints:[],
                cargoes: [],
                vehicles: [],
                start: "",   //起始地点
                end: "",     //结束地点
                driverD: "",
                startD: "",
                endD: "",    //起始日期
                cargoD: "",   //货物
                vehicleD: "",   //车辆
            }
        },
        methods: {
            getStart() {
                return this.start;
            },
            getEnd() {
                return this.end;
            },
            getDriverD() {
                return this.driverD;
            },
            getStartD() {
                return this.startD;
            },
            getEndD() {
                return this.endD;
            },
            getVehicleD() {
                return this.vehicleD;
            },
            getCargoD() {
                return this.cargoD;
            },
            setStartD(param) {
                this.startD=param;
            },
            setEndD(param) {
                this.endD=param;
            },
            //提交
            commit() {
                console.log("提交");
                this.$emit("queryCommit");
            },
            //获取所有货物列表
            getCargoList() {
                let param = {
                    currentPage: 1,          //当前页数
                    pageSize: 9999,       //页容量
                    status: 1
                };
                return new Promise((resolve, reject) => {
                    api.getCargoList(param).then(res => {
                        if (res.data.code == 0) {
                            // this.cargoes = res.data.data;
                            this.cargoes = this.points = this.vehicles = [{id: "", name:"请选择货物"}].concat(res.data.data);
                            resolve()
                        } else {
                            reject();
                        }
                    });
                })
            },
            //查询所有地点列表
            getAddressList() {
                let param = {
                    currentPage: 1,          //当前页数
                    pageSize: 9999,       //页容量
                    status: 1
                };
                return new Promise((resolve, reject) => {
                    api.getStartPointList(param).then(res => {
                        if (res.data.code == 0) {
                            // this.points = res.data.data;
                            // this.points = [{id: "", name:"请选择地点"}].concat(res.data.data);
                            res.data.data.map(item=>{
                                if(item.type == 1 || item.type == 0){
                                    this.startPoints.push(item);
                                }
                                if(item.type == 2 || item.type == 0){
                                    this.endPoints.push(item);
                                }
                            });
                            this.startPoints = [{id: "", name:"请选择起点"}].concat(this.startPoints);
                            this.endPoints = [{id: "", name:"请选择起点"}].concat(this.endPoints);
                            resolve()
                        } else {
                            reject();
                        }
                    });
                })
            },
            //查询车辆列表
            getVehicleList() {
                let param = {
                    currentPage: 1,          //当前页数
                    pageSize: 9999,       //页容量
                    status: 1
                };
                return new Promise((resolve, reject) => {
                    api.getVehicleList(param).then(res => {
                        if (res.data.code == 0) {
                            this.vehicles = [{id: "", no: "请选择车辆"}].concat(res.data.data);
                            resolve()
                        } else {
                            reject();
                        }
                    });
                })
            },
            //查询所有司机列表
            getDriver() {
                let param = {
                    currentPage: 1,          //当前页数
                    pageSize: 99999,       //页容量
                    type: 1,
                    status:1
                };
                return new Promise((resolve, reject) => {
                    api.getUserList(param).then(res => {
                        if (res.data.code == 0) {
                            this.drivers = [{id: "", userName: "请选择司机"}].concat(res.data.data);
                            resolve();
                        } else {
                            reject();
                        }
                    })
                });
            },
        },
        mounted() {
            this.getCargoList();
            this.getAddressList();
            this.getVehicleList();
            this.getDriver();
        }
    }
</script>

<style scoped lang="less">
    .firstCondition {
        display: flex;
        margin-bottom: 10px;
        justify-content: center;
        .block {
            margin-right: 15px;
            font-size: 14px;
            span{
                margin-right: 10px;
            }
        }
    }

    .secondCondition {
        justify-content: center;
    }
</style>
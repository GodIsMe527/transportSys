<template>
    <div class="driverPage PageL">
        <mt-navbar v-model="selected">
            <mt-tab-item id="1">新增记录</mt-tab-item>
            <mt-tab-item id="2"><span @click="showRocords">今日记录</span></mt-tab-item>
            <div class="avatar">
                <img src="../assets/images/user.jpg" alt="头">
            </div>
        </mt-navbar>
        <mt-tab-container v-model="selected">
            <mt-tab-container-item id="1">
                <div class="transportInfo">
                    <h5>添加运输记录</h5>
                    <div class="oneInfo">
                        <p>货物名称</p>
                        <input type="text" v-model="name" @click="getName" readonly="true">
                    </div>
                    <div class="oneInfo">
                        <p>重量</p>
                        <input type="number" v-model="Num">
                    </div>
                    <div class="oneInfo">
                        <p>起点</p>
                        <input type="text" v-model="start" @click="getAddress(0)" readonly="true">
                    </div>
                    <div class="oneInfo">
                        <p>终点</p>
                        <input type="text" v-model="end" @click="getAddress(1)" readonly="true">
                    </div>
                    <div class="oneInfo">
                        <p>装卸车费</p>
                        <input type="number" v-model="handingFee">
                    </div>
                    <div class="oneInfo">
                        <p>过路费</p>
                        <input type="number" v-model="roleFee">
                    </div>
                    <div class="oneInfo">
                        <p>车号</p>
                        <input type="text" v-model="vehicleNo" @click="getVehicles" readonly="true">
                    </div>
                    <div v-if="editFlag" class="edifBtn">
                        <div @click="cancelEdit">取消修改</div>
                        <div @click="saveEdit">保存修改</div>
                        <div @click="delRecord">删除记录</div>
                    </div>
                    <div class="saveOneInfo" @click="newTransportation" v-else>
                        提交
                    </div>
                </div>
                <div class="otherInfo">
                    <h5>添加其他费用支出记录</h5>
                    <div class="oneInfo">
                        <p>费用名称</p>
                        <input type="text" v-model="otherFeeName">
                    </div>
                    <div class="oneInfo">
                        <p>费用金额</p>
                        <input type="number" v-model="otherFeeNum">
                    </div>
                    <div v-if="editFlagOtherFee" class="edifBtn">
                        <div @click="cancelEditOF">取消修改</div>
                        <div @click="saveEditOF">保存修改</div>
                        <div @click="delRecordOF">删除记录</div>
                    </div>
                    <div class="saveOneInfo" @click="newOtherFee" v-else>
                        提交
                    </div>
                </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="2">
                <div class="part">
                    <p>今日运输记录</p>
                    <table>
                        <thead>
                        <th>时间</th>
                        <th>名称</th>
                        <th>重量</th>
                        <th>起点</th>
                        <th>终点</th>
                        <th>车号</th>
                        <th>操作</th>
                        </thead>
                        <tbody>
                        <tr v-for="record in transportationRecords" :key="record.id">
                            <td>{{record.time}}</td>
                            <td>{{record.cargoName}}</td>
                            <td>{{record.num}}</td>
                            <td>{{record.startPointName}}</td>
                            <td>{{record.endPointName}}</td>
                            <td>{{record.vehicleName}}</td>
                            <td class="edit" @click="editTransportation(record.id)">修改</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div class="part">
                    <p>其他费用记录</p>
                    <table>
                        <thead>
                        <th>时间</th>
                        <th>名称</th>
                        <th>费用</th>
                        <th>操作</th>
                        </thead>
                        <tbody>
                        <tr v-for="record in otherFeeRecords" :key="record.id">
                            <td>{{record.time}}</td>
                            <td>{{record.name}}</td>
                            <td>{{record.money}}</td>
                            <td class="edit" @click="editOtherFee(record.id)">修改</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </mt-tab-container-item>
        </mt-tab-container>
        <div class="layerLC" :class="{noContent:isNone}" v-show="selectBox">
            <div class="layer" @click="hideLayerLC"></div>
            <div class="content" @click.stop="noThing">
                <p class="noContentP">暂无内容，请前往后台管理补充信息!</p>
                <div class="contentBox" v-for="item in selectCont" :key="item.id" @click.stop="checkOption(item.id)">
                    <p>{{item.name}}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import api from '../utils/api';
    import {MessageBox} from 'mint-ui';

    export default {
        name: "driver",
        data() {
            return {
                selected: "1",     //切换标签栏
                name: "",          //货物名称
                nameID: "",        //货物ID
                Num: "",           //吨数
                start: "",         //起点
                startID: "",       //起点ID
                end: "",           //终点
                endID: "",         //终点ID
                handingFee: "",    //装卸车费
                roleFee: "",       //过路费
                otherFeeName: "",  //其他费用名称
                otherFeeNum: "",   //其他费用金额
                vehicleNo: "",     //车牌号
                vehicleID: "",     //车牌号ID
                selectBox: false,    //是否显示选择框
                selectCont: "",      //显示框内要显示的内容
                isNone: false,        //显示内容是否为空
                cargos: "",          //货物列表
                address: "",          //地址列表
                vehicles: "",          //车辆列表
                selectBoxType: 0,      //0货物名称 1起点 2终点
                transportationRecords: "",      //货物运输记录
                otherFeeRecords: "",      //其他费用记录
                editFlag: false,          //运输记录修改还是新增
                editFlagOtherFee: false,          //其他费用修改还是新增
                editRecordId: "",          //修改记录的ID
                editOtherFeeId: "",          //修改费用的ID
            }
        },
        methods: {
            /**
             * 获取货物列表
             */
            getName() {
                api.getCargos("").then(res => {
                    if (res.data && res.data.data) {
                        let data = res.data.data;
                        if (data.length > 0) {
                            this.cargos = data;
                            this.selectCont = data;
                        } else {
                            this.isNone = true
                        }
                        this.selectBox = true;
                        this.selectBoxType = 0;
                    }
                })
            },
            /**
             * 获取地点列表
             */
            getAddress(type) {
                api.getAddress("").then(res => {
                    if (res.data && res.data.data) {
                        let data = res.data.data;
                        if (data.length > 0) {
                            this.address = data;
                            this.selectCont = data;
                        } else {
                            this.isNone = true
                        }
                        this.selectBox = true;
                        type === 0 ? this.selectBoxType = 1 : this.selectBoxType = 2
                    }
                })
            },
            /**
             * 获取车辆列表
             */
            getVehicles() {
                api.getVehicles("").then(res => {
                    if (res.data && res.data.data) {
                        let data = res.data.data;
                        if (data.length > 0) {
                            this.vehicles = data;
                            this.selectCont = data;
                        } else {
                            this.isNone = true
                        }
                        this.selectBox = true;
                        this.selectBoxType = 3;
                    }
                })
            },
            /**
             * 选择框里选择选项（货物名称、起点、终点）
             * @param id
             */
            checkOption(id) {
                switch (this.selectBoxType) {
                    case 0:
                        this.cargos.map(item => {
                            if (item.id == id) {
                                this.name = item.name;
                                this.nameID = id;
                                this.selectBox = false;
                            }
                        })
                        break;
                    case 1:
                        this.address.map(item => {
                            if (item.id == id) {
                                this.start = item.name;
                                this.startID = id;
                                this.selectBox = false;
                            }
                        })
                        break;
                    case 2:
                        this.address.map(item => {
                            if (item.id == id) {
                                this.end = item.name;
                                this.endID = id;
                                this.selectBox = false;
                            }
                        })
                        break;
                    case 3:
                        this.vehicles.map(item => {
                            if (item.id == id) {
                                this.vehicleNo = item.name;
                                this.vehicleID = id;
                                this.selectBox = false;
                            }
                        })
                        break;
                    default:
                        this.cargos.map(item => {
                            if (item.id == id) {
                                this.name = item.name;
                                this.nameID = id;
                                this.selectBox = false;
                            }
                        })
                }

            },
            //点击蒙布隐藏弹出选项框
            hideLayerLC() {
                this.selectBox = false;
            },
            //点击弹出选项框空白部分不隐藏弹出选项框
            noThing() {
                this.selectBox = true;
            },
            /**
             * 提交新的运输记录
             */
            newTransportation() {
                let data = {
                    nameID: this.nameID,
                    startID: this.startID,
                    endID: this.endID,
                    Num: this.Num,
                    handingFee: this.handingFee || 0,
                    roleFee: this.roleFee || 0,
                    vehicleID: this.vehicleID,
                    userId: localStorage.getItem("userId"),
                    time: new Date().getTime().toString()
                }
                if (!data.nameID) {
                    MessageBox('提示', '请填写货物名称');
                    return;
                }
                if (!data.Num) {
                    MessageBox('提示', '请填写吨数');
                    return;
                }
                if (!data.startID) {
                    MessageBox('提示', '请填写起点');
                    return;
                }
                if (!data.endID) {
                    MessageBox('提示', '请填写终点');
                    return;
                }
                if (!data.vehicleID) {
                    MessageBox('提示', '请填写车号');
                    return;
                }
                api.addTransportation(data).then(res => {
                    console.log(res);
                    if (res.data.code == 0) {
                        MessageBox('提示', '添加成功');
                        this.clearData();
                    }
                })
            },
            /**
             * 查看记录
             */
            showRocords() {
                let userId = localStorage.getItem("userId");
                // getTransportationByUserId
                api.getTransportationByUserId({userId: userId}).then(res => {
                    console.log(res);
                    if (res.data.code == 0) {
                        console.log(res.data.data);
                        this.transportationRecords = res.data["records"]
                        this.otherFeeRecords = res.data["otherFees"]
                    } else {
                        MessageBox("提示", res.data.errorInfo)
                    }
                })
            },
            /**
             * 点击修改记录
             * @param id 记录ID
             */
            editTransportation(id) {
                this.transportationRecords.map(item => {
                    if (item.id == id) {
                        this.name = item.cargoName;
                        this.nameID = item.cargoId;
                        this.Num = item.num;
                        this.start = item.startPointName;
                        this.startID = item.startPointId;
                        this.end = item.endPointName;
                        this.endID = item.endPointId;
                        this.handingFee = item.handlingFee;
                        this.roleFee = item.roadFee;
                        this.vehicleNo = item.vehicleName;
                        this.vehicleID = item.vehicleId;
                        this.editRecordId = id;
                    }
                })
                this.selected = "1"
                this.editFlag = true;
            },
            /**
             * 取消修改
             */
            cancelEdit() {
                this.editFlag = false;
                this.clearData();
            },
            /**
             * 保存修改
             */
            saveEdit() {
                let data = {
                    nameID: this.nameID,
                    startID: this.startID,
                    endID: this.endID,
                    Num: this.Num,
                    handingFee: this.handingFee || 0,
                    roleFee: this.roleFee || 0,
                    vehicleID: this.vehicleID,
                    updateTime: new Date().getTime().toString(),
                    id: this.editRecordId
                }
                if (!data.nameID) {
                    MessageBox('提示', '请填写货物名称');
                    return;
                }
                if (!data.Num) {
                    MessageBox('提示', '请填写吨数');
                    return;
                }
                if (!data.startID) {
                    MessageBox('提示', '请填写起点');
                    return;
                }
                if (!data.endID) {
                    MessageBox('提示', '请填写终点');
                    return;
                }
                if (!data.vehicleID) {
                    MessageBox('提示', '请填写车号');
                    return;
                }
                api.editTransportation(data).then(res => {
                    console.log(res);
                    if (res.data.code == 0) {
                        MessageBox('提示', '修改成功');
                        this.editFlag = false;
                        this.clearData();
                    }
                })
            },
            /**
             * 删除记录
             */
            delRecord() {
                MessageBox.confirm('确定删除该条记录吗?').then(action => {
                    if (action == "confirm") {
                        let data = {id: this.editRecordId}
                        api.delTransportation(data).then(res => {
                            if (res.data.code == 0) {
                                MessageBox('提示', '删除成功');
                                this.editFlag = false;
                                this.clearData();
                            }
                        })
                    }
                });
            },
            /**
             * 清除运输记录数据
             */
            clearData() {
                this.nameID = "";
                this.name = "";
                this.startID = "";
                this.start = "";
                this.endID = "";
                this.end = "";
                this.Num = "";
                this.handingFee = "";
                this.roleFee = "";
                this.vehicleID = "";
                this.vehicleNo = "";
                this.editRecordId = "";
            },
            /**
             * 清除其他费用数据
             */
            clearOtherFeeData() {
                this.otherFeeNum = "";
                this.otherFeeName = "";
            },
            /**
             * 提交新的其他费用记录
             */
            newOtherFee() {
                let data = {
                    name: this.otherFeeName,
                    money: this.otherFeeNum,
                    time: new Date().getTime().toString(),
                    userId: localStorage.getItem("userId"),
                }
                if (!data.name) {
                    MessageBox('提示', '请填写其他费用名称');
                    return;
                }
                if (!data.money) {
                    MessageBox('提示', '请填写费用金额');
                    return;
                }
                api.addOtherFee(data).then(res => {
                    if (res.data.code == 0) {
                        MessageBox('提示', '添加成功');
                        this.clearOtherFeeData();
                    }
                })
            },
            /**
             * 点击修改其他费用
             * @param id 记录ID
             */
            editOtherFee(id) {
                this.otherFeeRecords.map(item => {
                    if (item.id == id) {
                        this.otherFeeName = item.name;
                        this.otherFeeNum = item.money;
                        this.editOtherFeeId = id;
                    }
                })
                this.selected = "1"
                this.editFlagOtherFee = true;
            },
            /**
             * 取消修改其他费用
             */
            cancelEditOF() {
                this.editFlagOtherFee = false;
                this.clearOtherFeeData();
            },
            /**
             * 保存修改其他费用
             */
            saveEditOF() {
                let data = {
                    name: this.otherFeeName,
                    money: this.otherFeeNum,
                    updateTime: new Date().getTime().toString(),
                    id: this.editOtherFeeId
                }
                if (!data.name) {
                    MessageBox('提示', '请填写其他费用名称');
                    return;
                }
                if (!data.money) {
                    MessageBox('提示', '请填写费用金额');
                    return;
                }
                api.editOtherFee(data).then(res => {
                    if (res.data.code == 0) {
                        MessageBox('提示', '修改成功');
                        this.editFlagOtherFee = false;
                        this.clearOtherFeeData();
                    }
                })
            },
            /**
             * 删除其他费用
             */
            delRecordOF() {
                MessageBox.confirm('确定删除该条记录吗?').then(action => {
                    if (action == "confirm") {
                        let data = {id: this.editOtherFeeId}
                        api.delOtherFee(data).then(res => {
                            if (res.data.code == 0) {
                                MessageBox('提示', '删除成功');
                                this.editFlagOtherFee = false;
                                this.clearOtherFeeData();
                            }
                        })
                    }
                });
            },
        },
        created() {

        }
    }
</script>
<style scoped lang="less">
    .driverPage {
        height: 100%;
        display: flex;
        flex-direction: column;
        position: relative;
        .mint-navbar {
            color: #fff;
            background-color: #666666;
            .avatar {
                height: 4.6rem;
                padding: 0.8rem 1rem;
                box-sizing: border-box;
                img {
                    height: 3rem;
                    border-radius: 15px;
                }
            }
            .mint-tab-item-label {
                font-size: 1.4rem !important;
            }
        }
        .mint-tab-container {
            flex: 1;
            padding: 1rem;
            .transportInfo, .otherInfo {
                overflow: hidden;
                padding-bottom: 2rem;
                border-bottom: 1px solid #E4E4E4;
                margin-bottom: 1rem;
                .oneInfo {
                    width: 50%;
                    float: left;
                    padding: 0 1rem;
                    box-sizing: border-box;
                    margin-bottom: 1rem;
                    p {
                        margin: 0 0 5px 0;
                        font-size: 2rem;
                    }
                    input {
                        width: 100%;
                        box-sizing: border-box;
                        padding: 3px 5px;
                        border-radius: 5px;
                        border: 1px solid #E4E4E4;
                        font-size: 1.6rem;
                    }
                }
                .saveOneInfo {
                    float: left;
                    width: 50%;
                    margin-left: 25%;
                    margin-top: 1.5rem;
                    color: #fff;
                    background-color: #666666;
                    text-align: center;
                    font-size: 2.0rem;
                    padding: 5px 0;
                    border-radius: 5px;
                    &:active {
                        background: darken(#666666, 6%);
                    }
                }
                .edifBtn {
                    width: 100%;
                    float: left;
                    margin-top: 1.5rem;
                    text-align: center;
                    font-size: 1.6rem;
                    display: flex;
                    justify-content: center;
                    div {
                        color: #fff;
                        background-color: #666666;
                        padding: 0 1rem;
                        border-radius: 5px;
                        margin-right: 1.5rem;
                        margin-left: 1.4rem;
                        line-height: 3.6rem;
                        height: 3.6rem;
                        box-sizing: border-box;
                        &:active {
                            background: darken(#666666, 6%);
                        }
                    }
                }
            }
            .otherInfo {
                border-bottom: 0;
            }
            h5 {
                font-size: 2.2rem;
                margin: 0 0 1rem;
            }
            table {
                width: 100%;
                font-size: 1.4rem;
                tbody {
                    td {
                        text-align: center;
                        line-height: 3rem;
                    }
                    .edit {
                        text-decoration: underline;
                        color: #C5A56C;
                    }
                }
            }
        }
    }

    .layerLC {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 9999;
        .layer {
            width: 100%;
            height: 100%;
            position: absolute;
            background-color: #000;
            opacity: 0.3;
        }
        .content {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: #fff;
            padding: 2rem;
            width: 70%;
            max-height: 70%;
            overflow: auto;
            .contentBox {
                width: 50%;
                float: left;
                padding: 1rem;
                box-sizing: border-box;
                p {
                    padding: 5px 10px;
                    height: 3rem;
                    margin: 0;
                    font-size: 1.6rem;
                    border: 1px solid #DDDDDD;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background-color: #f2f2f2;
                    border-radius: 5px;
                }
                p:active {
                    background: darken(#f2f2f2, 6%);
                }
            }
        }
        .noContentP {
            display: none;
        }
    }

    .noContent {
        .noContentP {
            display: block;
            text-align: center;
            font-size: 1.8rem;
        }
    }

    .mint-tab-container {
        overflow: scroll !important;
        .part {
            padding-top: 1rem;
            padding-bottom: 1.5rem;
            border-bottom: 1px solid #DDDDDD;
            p {
                font-size: 2rem;
                margin: 0 0 1rem;
                font-weight: bold;
            }
        }
        .part:last-child {
            border-bottom: 0;
        }
    }
</style>
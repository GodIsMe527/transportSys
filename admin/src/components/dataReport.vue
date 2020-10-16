<template>
    <div class="dataReport">
        <header>
            <!-- Form -->
            <el-button class="addIcon" type="success" @click="showLayer(0)">新增记录</el-button>
            <el-button type="success" @click="showAll()">显示全部</el-button>
            <el-button type="success" @click="showOpen()">仅显示启用</el-button>
            <el-button type="success" @click="showClose()">仅显示禁用</el-button>
            <el-dialog class="newRecord" :title="layerTitle" :visible.sync="dialogFormVisible">
                <el-form :model="form">
                    <el-form-item label="货物" label-width="80px">
                        <el-autocomplete
                                class="inline-input"
                                :fetch-suggestions="queryCargo"
                                v-model="form.cargoName"
                                placeholder="请输入内容"
                                @select="selectCargo"
                        ></el-autocomplete>
                    </el-form-item>
                    <el-form-item label="重量" label-width="80px">
                        <el-input type="number" v-model="form.num" placeholder="请输入重量"></el-input>
                    </el-form-item>
                    <el-form-item label="单价" label-width="80px">
                        <el-input type="number" v-model="form.price" placeholder="请输入单价"></el-input>
                    </el-form-item>
                    <el-form-item label="起点" label-width="80px">
                        <el-autocomplete
                                class="inline-input"
                                :fetch-suggestions="queryStartAddress"
                                placeholder="请输入起点"
                                v-model="form.startAddressName"
                                @select="selectStartAddress"
                        ></el-autocomplete>
                    </el-form-item>
                    <el-form-item label="终点" label-width="80px">
                        <el-autocomplete
                                class="inline-input"
                                :fetch-suggestions="queryEndAddress"
                                v-model="form.endAddressName"
                                placeholder="请输入终点"
                                @select="selectEndAddress"
                        ></el-autocomplete>
                    </el-form-item>
                    <el-form-item label="车号" label-width="80px">
                        <el-autocomplete
                                class="inline-input"
                                :fetch-suggestions="queryVehicle"
                                v-model="form.vehicleName"
                                placeholder="请输入车号"
                                @select="selectVehicle"
                        ></el-autocomplete>
                    </el-form-item>
                    <el-form-item label="司机" label-width="80px">
                        <el-autocomplete
                                class="inline-input"
                                :fetch-suggestions="queryDriver"
                                v-model="form.driverName"
                                placeholder="请输入司机"
                                @select="selectDriver"
                        ></el-autocomplete>
                    </el-form-item>
                    <el-form-item label="装卸车费" label-width="80px">
                        <el-input type="number" v-model="form.downFee" placeholder="请输入装卸车费"></el-input>
                    </el-form-item>
                    <el-form-item label="过路车费" label-width="80px">
                        <el-input type="number" v-model="form.roadFee" placeholder="请输入装卸车费"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="newRecord">确 定</el-button>
                </div>
            </el-dialog>
        </header>
        <filter-head ref="filterHead" @queryCommit="queryCommit"></filter-head>
        <el-table
                :data="recordList"
                stripe
                style="width: 100%">
            <el-table-column
                    prop="cargoLabel"
                    label="货物名称"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="weight"
                    label="重量"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="price"
                    label="单价"
                    width="180">
                <template slot-scope="scope">
                    <input type="tel" class="priceInput" v-model="inputPriceList[scope.row.priceModel]"
                           oninput="value=value.replace(/^\.+|[^\d.]/g,'')" @change="updatePrice(scope.row)"/>
                </template>
            </el-table-column>
            <el-table-column
                    prop="startAddressLabel"
                    label="起点">
            </el-table-column>
            <el-table-column
                    prop="endAddressLabel"
                    label="终点">
            </el-table-column>
            <el-table-column
                    prop="downFee"
                    label="装卸车费">
            </el-table-column>
            <el-table-column
                    prop="roadFee"
                    label="过路费">
            </el-table-column>
            <el-table-column
                    prop="vehicleLabel"
                    label="车号">
            </el-table-column>
            <el-table-column
                    prop="driverLabel"
                    label="司机">
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    width="100">
                <template slot-scope="scope">
                    <el-button @click="showLayer(1,scope.row)" type="text" size="small" v-if="scope.row.status!=0">
                        编辑
                    </el-button>
                    <el-button @click="delRecord(scope.row)" type="text" size="small">{{scope.row.status==0?'启用':'删除'}}
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                :page-size="pageParam.pageSize"
                :pager-count="11"
                layout="prev, pager, next"
                @current-change="getList"
                :current-page.sync="pageParam.currentPage"
                :total="pageParam.totalNum">
        </el-pagination>
    </div>
</template>

<script>
    import api from '../utils/api'
    import filterHead from "./common/filterHead.vue"

    export default {
        name: "dataReport",
        components: {
            filterHead
        },
        data() {
            return {
                tableData: [],
                operateObj: "",
                pageParam: {
                    currentPage: 1,    //当前页数
                    pageSize: 6,       //页容量
                    totalNum: 0,        //总数
                    totalPage: 0,        //总页数
                    status: 1,          //0表示禁用，1表示启用,2表示全部
                },
                layerTitle: "新增记录",
                dialogFormVisible: false,
                cargoName: "",
                startAddressName: "",
                endAddressName: "",
                vehicleName: "",
                driverName: "",
                form: {
                    cargo: "",
                    num: "",
                    price: "",
                    startAddress: "",
                    endAddress: "",
                    vehicle: "",
                    driver: "",
                    downFee: "",
                    roadFee: "",
                    cargoName: "",
                    startAddressName: "",
                    endAddressName: "",
                    vehicleName: "",
                    driverName: "",
                },
                cargoList: [],    //货物列表
                addressList: [],   //地址列表
                vehicleList: [],   //车辆列表
                driverList: [],   //车辆列表
                recordList: [],   //记录列表
                cargoListObj: {},    //货物列表对象
                addressListObj: {},   //地址列表对象
                vehicleListObj: {},   //车辆列表对象
                driverListObj: {},   //车辆列表对象
                recordListObj: {},   //记录列表对象
                state1: '',
                state2: '',
                start: "",        //过滤条件起点
                drivers: [{
                    value: 'aaa',
                    label: '老李'
                }, {
                    value: 'bbb',
                    label: '老王'
                }],   //过滤条件司机
                points: [{
                    value: 'ccc',
                    label: '北京'
                }, {
                    value: 'ddd',
                    label: '南京'
                }],    //过滤条件起始点
                driverD: "",       //过滤条件选择的
                startD: "",
                endD: "",
                status: 1,          //2选择全部、1可用、0禁用
                inputPriceList: [],       //加个输入框数组列表
                ads: ""
            }
        },
        created() {
            // this.getCargoList();
        },
        mounted() {
            this.init();
        },
        methods: {
            //初始化数据
            async init() {
                await this.getCargoList();
                await this.getAddressList();
                await this.getVehicleList();
                await this.getDriver();
                await this.getRecordList();
            },
            //显示所有
            showAll() {
                this.status = 2;
                this.getRecordList();
            },
            //显示可用
            showOpen() {
                this.status = 1;
                this.getRecordList()
            },
            //仅显示禁用
            showClose() {
                this.status = 0;
                this.getRecordList();
            },
            //新增/修改记录按钮
            showLayer(type, row) {
                this.operateObj = row;
                this.dialogFormVisible = true;
                if (type == 0) {
                    this.form.name = "";
                    this.layerTitle = "新增记录";
                } else {
                    this.form.cargo = this.operateObj.cargo;
                    this.form.cargoName = this.cargoListObj[this.operateObj.cargo].name;
                    this.form.num = this.operateObj.weight;
                    this.form.price = this.operateObj.price;
                    this.form.startAddress = this.operateObj.startAddress;
                    this.form.startAddressName = this.addressListObj[this.operateObj.startAddress].name;
                    this.form.endAddress = this.operateObj.endAddress;
                    this.form.endAddressName = this.addressListObj[this.operateObj.endAddress].name;
                    this.form.vehicle = this.operateObj.vehicle;
                    this.form.vehicleName = this.vehicleListObj[this.operateObj.vehicle].no;
                    this.form.driver = this.operateObj.driver;
                    this.form.driverName = this.driverListObj[this.operateObj.driver].userName;
                    this.form.downFee = this.operateObj.downFee;
                    this.form.roadFee = this.operateObj.roadFee;
                    this.layerTitle = "编辑记录";
                }
            },
            //选择页数时的事件
            getList() {
                this.getRecordList();
            },
            //查询货物
            queryCargo(queryString, cb) {
                let cargoList = [];
                this.cargoList.map(item => {
                    if (item.status == 1) {
                        item.value = item.name;
                        cargoList.push(item);
                    }
                });
                let results = queryString ? cargoList.filter(this.createFilter(queryString)) : cargoList;
                // 调用 callback 返回建议列表的数据
                cb(results);
            },
            //查询起点列表
            queryStartAddress(queryString, cb) {
                let addressList = [];
                this.addressList.map((item) => {
                    if (item.type == 1 || item.type == 0) {
                        item.value = item.name;
                        addressList.push(item);
                    }
                });
                let results = queryString ? addressList.filter(this.createFilter(queryString)) : addressList;
                // 调用 callback 返回建议列表的数据
                cb(results);
            },
            //查询终点列表
            queryEndAddress(queryString, cb) {
                let addressList = [];
                this.addressList.map((item) => {
                    if (item.type == 2 || item.type == 0) {
                        item.value = item.name;
                        addressList.push(item);
                    }
                });
                let results = queryString ? addressList.filter(this.createFilter(queryString)) : addressList;
                // 调用 callback 返回建议列表的数据
                cb(results);
            },
            //获取车辆列表
            queryVehicle(queryString, cb) {
                let vehicleList = [];
                console.log(queryString);
                this.vehicleList.map((item) => {
                    if (item.status == 1) {
                        item.value = item.no;
                        vehicleList.push(item);
                    }
                });
                let results = queryString ? vehicleList.filter(this.createFilter(queryString)) : vehicleList;
                // 调用 callback 返回建议列表的数据
                cb(results);
            },
            //获取人员列表
            queryDriver(queryString, cb) {
                let driverList = [];
                this.driverList.map((item) => {
                    if (item.type == 1) {
                        item.value = item.userName;
                        driverList.push(item);
                    }
                });
                console.log(this.driverList);
                let results = queryString ? driverList.filter(this.createFilter(queryString)) : driverList;
                // 调用 callback 返回建议列表的数据
                cb(results);
            },
            //过滤选择输入框内容
            createFilter(queryString) {
                return (restaurant) => {
                    return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
            //选择货物
            selectCargo(item) {
                this.form.cargo = item.id.toString();
                // this.form.cargoName = item;
            },
            //选择起点
            selectStartAddress(item) {
                this.form.startAddress = item.id;
            },
            //选择终点
            selectEndAddress(item) {
                this.form.endAddress = item.id;
            },
            //选择车辆
            selectVehicle(item) {
                this.form.vehicle = item.id;
            },
            //选择司机
            selectDriver(item) {
                this.form.driver = item.id;
            },
            //获取所有货物列表
            getCargoList() {
                let param = {
                    currentPage: this.pageParam.currentPage,          //当前页数
                    pageSize: 9999,       //页容量
                    status: 1
                };
                return new Promise((resolve, reject) => {
                    api.getCargoList(param).then(res => {
                        if (res.data.code == 0) {
                            this.cargoList = res.data.data;
                            this.cargoList.map(item => {
                                this.cargoListObj[item.id] = item;
                            });
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
                    currentPage: this.pageParam.currentPage,          //当前页数
                    pageSize: 9999,       //页容量
                    status: 1
                };
                return new Promise((resolve, reject) => {
                    api.getStartPointList(param).then(res => {
                        if (res.data.code == 0) {
                            this.addressList = res.data.data;
                            this.addressList.map(item => {
                                this.addressListObj[item.id] = item;
                            })
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
                    currentPage: this.pageParam.currentPage,          //当前页数
                    pageSize: 9999,       //页容量
                    status: 1
                };
                return new Promise((resolve, reject) => {
                    api.getVehicleList(param).then(res => {
                        if (res.data.code == 0) {
                            this.vehicleList = res.data.data;
                            this.vehicleList.map(item => {
                                this.vehicleListObj[item.id] = item;
                            });
                            resolve()
                        } else {
                            reject();
                        }
                    });
                })
            },
            //查询所有记录
            getRecordList() {
                let param = {
                    currentPage: this.pageParam.currentPage,          //当前页数
                    pageSize: this.pageParam.pageSize,       //页容量
                    status: this.status
                };
                let startP = this.$refs.filterHead.getStart();
                let endP = this.$refs.filterHead.getEnd();
                let driverP = this.$refs.filterHead.getDriverD();
                let startDP = this.$refs.filterHead.getStartD();
                let endDP = this.$refs.filterHead.getEndD();
                let vehicleD = this.$refs.filterHead.getVehicleD();
                let cargoD = this.$refs.filterHead.getCargoD();
                startP ? param.startP = startP : "";
                endP ? param.endP = endP : "";
                startDP ? param.startDP = new Date(startDP).getTime() / 1000 : "";
                endDP ? param.endDP = new Date(endDP).getTime() / 1000 : "";
                driverP ? param.driverP = driverP : "";
                vehicleD ? param.vehicleD = vehicleD : "";
                cargoD ? param.cargoD = cargoD : "";
                return new Promise((resolve, reject) => {
                    api.getRecordList(param).then(res => {
                        if (res.data.code == 0) {
                            this.recordList = res.data.data;
                            console.log(this.recordList);
                            this.inputPriceList = [];
                            this.recordList.map((item, index) => {
                                item.cargoLabel = this.cargoListObj[item.cargo].name;
                                item.startAddressLabel = this.addressListObj[item.startAddress].name;
                                item.endAddressLabel = this.addressListObj[item.endAddress].name;
                                item.vehicleLabel = this.vehicleListObj[item.vehicle].no;
                                item.driverLabel = this.driverListObj[item.driver].userName;
                                item.priceModel = "price" + index;
                                this.inputPriceList[item.priceModel] = item.price || 0;
                            });
                            this.recordList.map(item => {
                                this.recordListObj[item.id] = item;
                            });
                            console.log(this.inputPriceList);
                            this.pageParam.totalNum = res.data.total;
                            this.pageParam.totalPage = parseInt((this.pageParam.totalNum + this.pageParam.pageSize - 1) / this.pageParam.pageSize);
                            resolve();
                        } else {
                            reject();
                        }
                    })
                });
            },
            //查询所有司机列表
            getDriver() {
                let param = {
                    currentPage: this.pageParam.currentPage,          //当前页数
                    pageSize: 9999,       //页容量
                    type: 1
                };
                return new Promise((resolve, reject) => {
                    api.getUserList(param).then(res => {
                        if (res.data.code == 0) {
                            this.driverList = res.data.data;
                            this.driverList.map(item => {
                                this.driverListObj[item.id] = item;
                            });
                            resolve();
                        } else {
                            reject();
                        }
                    })
                });
            },
            //新建一条记录
            newRecord() {
                if (!this.form.cargo) {
                    this.$message.error("货物不能为空");
                    return false;
                }
                if (!this.form.num) {
                    this.$message.error("数量不能为空");
                    return false;
                }
                if (!this.form.price) {
                    this.$message.error("价格不能为空");
                    return false;
                }
                if (!this.form.startAddress) {
                    this.$message.error("起点不能为空");
                    return false;
                }
                if (!this.form.endAddress) {
                    this.$message.error("终点不能为空");
                    return false;
                }
                if (!this.form.vehicle) {
                    this.$message.error("车辆不能为空");
                    return false;
                }
                if (!this.form.driver) {
                    this.$message.error("司机不能为空");
                    return false;
                }
                console.log(this.form);
                if (this.layerTitle == "新增记录") {
                    api.newRecord(this.form).then(res => {
                        if (res.data.code == 0) {
                            this.$message({
                                message: '添加成功',
                                type: 'success'
                            });
                            this.clearUserDate();
                            this.getRecordList();
                        }
                    })
                } else {
                    this.form.id = this.operateObj.id;
                    api.editRecord(this.form).then(res => {
                        if (res.data.code == 0) {
                            this.$message({
                                message: '修改成功',
                                type: 'success'
                            });
                            console.log(this);
                            this.clearUserDate();
                            this.getRecordList();
                        }
                    })
                }
            },
            //清除新增记录数据
            clearUserDate() {
                this.form = {
                    cargo: "",
                    num: "",
                    price: "",
                    startAddress: "",
                    endAddress: "",
                    vehicle: "",
                    driver: "",
                    downFee: "",
                    roadFee: "",
                };
                this.dialogFormVisible = false;
            },
            //删除记录
            delRecord(item) {
                this.operateObj = item;
                let data = {
                    id: this.operateObj.id,
                    status: this.operateObj.status == 0 ? 1 : 0
                };
                api.delRecord(data).then(res => {
                    if (res.data.code == 0) {
                        this.getRecordList();
                        this.$message({
                            message: '修改成功',
                            type: 'success'
                        });
                    } else {
                        this.$message.error(data.message || "登陆失败");
                    }
                })
            },
            //编辑所有记录
            editRecord(item) {
                this.layerTitle = "编辑记录";
                console.log(item);
            },
            //修改价格
            changePrice(value, asd) {
                console.log(value);
                console.log("------");
                console.log(asd);
            },
            //查询按钮
            queryCommit() {
                this.getRecordList();
            },
            //更新记录价格
            updatePrice(item) {
                console.log(item);
                console.log(this.inputPriceList[item.priceModel]);
                if (!item) {
                    return;
                }
                let data = {
                    id: item.id,
                    price: this.inputPriceList[item.priceModel]
                };
                api.updatePrice(data).then(res => {
                    if (res.data.code == 0) {
                        // this.updatePrice();
                        // this.$message({
                        //     message: '修改成功',
                        //     type: 'success'
                        // });
                    } else {
                        this.$message.error(data.message || "登陆失败");
                    }
                })
            }
        }
    }
</script>

<style lang="less">
    .dataReport {
        header {
            margin-bottom: 18px;
        }
        .el-autocomplete {
            width: 100%;
        }
        .newRecord {
            .el-dialog {
                margin-top: 2vh !important;
                .el-dialog__body {
                    padding: 10px 20px 0;
                    input::-webkit-outer-spin-button,
                    input::-webkit-inner-spin-button {
                        -webkit-appearance: none;
                    }
                    input[type="number"] {
                        -moz-appearance: textfield;
                    }
                }
            }
        }
        .priceInput {
            width: 60%;
            border: 1px solid #ececec;
            line-height: 20px;
            height: 22px;
            padding-left: 5px;
        }
        .priceInput:focus {
            border: 1px solid #409EFF !important;
            outline: unset;
        }
    }
</style>
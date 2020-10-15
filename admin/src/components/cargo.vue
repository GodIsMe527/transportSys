<template>
    <div class="cargo">
        <header>
            <!-- Form -->
            <el-button class="addIcon" type="success" @click="showLayer(0)">新增货物</el-button>
            <el-button type="success" @click="showAll()">显示全部</el-button>
            <el-button type="success" @click="showOpen()">仅显示启用</el-button>
            <el-button type="success" @click="showClose()">仅显示禁用</el-button>
            <el-dialog :title="layerTitle" :visible.sync="dialogFormVisible">
                <el-form :model="form">
                    <el-form-item label="编号" label-width="60px">
                        <el-input v-model="form.name" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="newPoint">确 定</el-button>
                </div>
            </el-dialog>
        </header>
        <el-table
                :data="tableData"
                style="width: 100%">
            <el-table-column
                    prop="name"
                    label="货物名称">
            </el-table-column>
            <el-table-column
                    label="操作">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="showLayer(1,scope.row)">编辑</el-button>
                    <el-button type="text" size="small" @click="delUser(scope.row)">{{scope.row.status==0?'启用':'停用'}}
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

    export default {
        name: "cargo",
        data() {
            return {
                tableData: [],
                dialogFormVisible: false,
                form: {
                    name: '',
                },
                formLabelWidth: '120px',
                dialogVisible: false,   //删除提示框
                operateUser: "",    //要操作的地点
                layerTitle: "新增货物",
                pageParam: {
                    currentPage: 1,    //当前页数
                    pageSize: 5,       //页容量
                    totalNum: 0,        //总数
                    pageNum: 0,        //总页数
                    status: 1,          //0表示禁用，1表示启用,2表示全部
                },
            }
        },
        created() {
            this.getList();
        },
        methods: {
            //刷新货物数据
            getList() {
                let param = {
                    currentPage: this.pageParam.currentPage,          //当前页数
                    pageSize: this.pageParam.pageSize,       //页容量
                };
                if (this.pageParam.status != 2) {
                    param.status = this.pageParam.status;
                }
                api.getCargoList(param).then(res => {
                    if (res.data.code == 0) {
                        this.tableData = res.data.data;
                        this.pageParam.totalNum = res.data.total;
                        this.pageParam.pageNum = (this.pageParam.totalNum + this.pageParam.pageSize - 1) / this.pageParam.pageSize;
                    }
                })
            },
            //修改货物状态
            delUser(row) {
                this.operateUser = row;
                let data = {
                    id: this.operateUser.id,
                    status: this.operateUser.status == 0 ? 1 : 0
                };
                api.deleteCargo(data).then(res => {
                    if (res.data.code == 0) {
                        this.clearUserDate();
                        this.getList();
                        this.$message({
                            message: '修改成功',
                            type: 'success'
                        });
                    } else {
                        this.$message.error(data.message || "登陆失败");
                    }
                })
            },
            //新增/修改地点按钮
            showLayer(type, row) {
                this.operateUser = row;
                this.dialogFormVisible = true;
                if (type == 0) {
                    this.form.name = "";
                    this.layerTitle = "新增货物";
                } else {
                    this.form.type = this.operateUser.type;
                    this.layerTitle = "编辑货物";
                    this.form.name = row.name;
                }
            },
            //保存新增/修改车辆
            newPoint() {
                if (this.form.name) {
                    let data = {
                        name: this.form.name,
                    };
                    if (this.layerTitle === "新增货物") {
                        api.newCargo(data).then(res => {
                            if (res.data.code == 0) {
                                this.$message({
                                    message: '添加成功',
                                    type: 'success'
                                });
                                this.clearUserDate();
                                this.getList()
                            }
                        })
                    } else {
                        data.id=this.operateUser.id;
                        api.editCargo(data).then(res => {
                            if (res.data.code == 0) {
                                this.$message({
                                    message: '修改成功',
                                    type: 'success'
                                });
                                this.clearUserDate();
                                this.getList()
                            }
                        })
                    }
                } else {
                    this.$message.error("请输入货物名称");
                }
            },
            //清除新增用户数据
            clearUserDate() {
                this.form = {
                    name: '',
                };
                this.dialogFormVisible = false;
            },
            //显示全部
            showAll() {
                this.pageParam.currentPage = 1;
                this.pageParam.status = 2;
                this.getList();
            }, //仅显示启用
            showOpen() {
                this.pageParam.currentPage = 1;
                this.pageParam.status = 1;
                this.getList();
            },
            //仅显示禁用
            showClose() {
                this.pageParam.currentPage = 1;
                this.pageParam.status = 0;
                this.getList();
            },
        }
    }
</script>

<style lang="less">
    .cargo {
        header {
            margin-bottom: 50px;
            margin-top: 20px;
        }
        .addIcon span {
            position: relative;
            padding-left: 14px;
        }
        .addIcon span:before {
            content: '';
            position: absolute;
            left: -11px;
            top: 45%;
            transform: translateY(-50%);
            width: 25px;
            height: 25px;
            background: url("../assets/images/add.png") no-repeat;
            background-size: 100%;
        }
        .el-select {
            width: 100%;
        }
    }

    .el-pagination {
        display: flex;
        justify-content: center;
        margin-top: 100px;
    }
</style>
<template>
    <div class="userList">
        <header>
            <!-- Form -->
            <el-button class="addIcon" type="success" @click="newUserBtn">新增用户</el-button>
            <el-button type="success" @click="showAll()">显示全部</el-button>
            <el-button type="success" @click="showOpen()">仅显示启用</el-button>
            <el-button type="success" @click="showClose()">仅显示禁用</el-button>
            <el-dialog :title="layerTitle" :visible.sync="dialogFormVisible">
                <el-form :model="form">
                    <el-form-item label="姓名" label-width="60px">
                        <el-input v-model="form.name" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="电话" label-width="60px">
                        <el-input v-model="form.phone" autocomplete="off" maxlength="11"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" label-width="60px">
                        <el-input v-model="form.pwd" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="职位" label-width="60px">
                        <el-select v-model="form.type">
                            <el-option :label="item.label" :value="item.value" :key="item.value"
                                       v-for="item in types"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="newUser">确 定</el-button>
                </div>
            </el-dialog>
        </header>
        <el-table
                :data="tableData"
                style="width: 100%">
            <el-table-column
                    prop="userName"
                    label="姓名">
            </el-table-column>
            <el-table-column
                    prop="phone"
                    label="手机号">
            </el-table-column>
            <el-table-column
                    prop="status"
                    label="职位">
            </el-table-column>
            <el-table-column
                    label="操作">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="editUser(scope.row)">编辑</el-button>
                    <el-button type="text" size="small" @click="delUser(scope.row)">{{scope.row.type==0?'启用':'停用'}}
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                :page-size="pageParam.pageSize"
                :pager-count="11"
                layout="prev, pager, next"
                @current-change="getUserList"
                :current-page.sync="pageParam.currentPage"
                :total="pageParam.totalNum">
        </el-pagination>
    </div>
</template>

<script>
    import api from '../utils/api'

    export default {
        name: "monthData",
        data() {
            return {
                tableData: [],
                dialogFormVisible: false,
                form: {
                    name: '',
                    phone: '',
                    pwd: '',
                    type: 1
                },
                formLabelWidth: '120px',
                dialogVisible: false,   //删除提示框
                delUserID: "",    //要删除的用户id
                operateUser: "",    //要操作的地点
                layerTitle: "新增用户",
                pageParam: {
                    currentPage: 1,    //当前页数
                    pageSize: 5,       //页容量
                    totalNum: 0,        //总数
                    pageNum: 0,        //总页数
                    status: 1,          //0表示禁用，1表示启用,2表示全部
                },
                types: [
                    {
                        value: 1,
                        label: "司机"
                    },
                    {
                        value: 2,
                        label: "股东"
                    },
                    {
                        value: 3,
                        label: "管理员"
                    },
                ],     //人员类型
            }
        },
        created() {
            this.getUserList()
        },
        methods: {
            //刷新用户数据
            getUserList() {
                let param = {
                    currentPage: this.pageParam.currentPage,          //当前页数
                    pageSize: this.pageParam.pageSize,       //页容量
                };
                if (this.pageParam.status != 2) {
                    param.status = this.pageParam.status;
                }
                api.getUserList(param).then(res => {
                    if (res.data.code == 0) {
                        this.tableData = res.data.data;
                        this.tableData.map(item => {
                            switch (item.status) {
                                case "0":
                                    item.status = "注销";
                                    break;
                                case "1":
                                    item.status = "司机";
                                    break;
                                case "2":
                                    item.status = "股东";
                                    break;
                                case "3":
                                    item.status = "后台管理员";
                                    break;
                            }
                        })
                        this.pageParam.totalNum = res.data.total;
                        this.pageParam.pageNum = (this.pageParam.totalNum + this.pageParam.pageSize - 1) / this.pageParam.pageSize;
                    }
                })
            },
            //编辑用户
            editUser(row) {
                this.layerTitle = "修改用户";
                this.dialogFormVisible = true;
                this.operateUser = row;
                this.form = {
                    name: row.userName,
                    phone: row.phone,
                    pwd: '',
                    type: row.status
                }
            },
            //修改用户状态
            delUser(row) {
                this.operateUser = row;
                let data = {
                    id: this.operateUser.id,
                    type: this.operateUser.type == 0 ? 1 : 0
                };
                api.delUser(data).then(res => {
                    if (res.data.code == 0) {
                        this.clearUserDate();
                        this.getUserList();
                        this.$message({
                            message: '修改成功',
                            type: 'success'
                        });
                    } else {
                        this.$message.error(data.message || "登陆失败");
                    }
                })
            },
            //新增用户
            newUser() {
                let data = {
                    name: this.form.name,
                    phone: this.form.phone,
                    time: new Date().getTime().toString(),
                    type: this.form.type,
                };
                let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
                if (!this.form.name) {
                    this.$message({
                        message: '请选择姓名',
                        type: 'warning'
                    });
                    return false;
                }
                if (!myreg.test(this.form.phone)) {
                    this.$message({
                        message: '请输入正确的手机号',
                        type: 'warning'
                    });
                    return false;
                }
                if (this.form.pwd.length < 6 && this.layerTitle === "新增用户") {
                    this.$message({
                        message: '请输入至少6位数的密码',
                        type: 'warning'
                    });
                    return false;
                }
                if (this.form.type == "") {
                    this.$message({
                        message: '请选择职位',
                        type: 'warning'
                    });
                    return false;
                }
                if(this.form.pwd){
                    this.form.pwd = this.$md5(this.$md5(this.form.pwd));
                    data.pwd=this.form.pwd;
                }
                if (this.layerTitle === "新增用户") {
                    data.pwd=this.form.pwd;
                    api.newUser(data).then(res => {
                        if (res.data.code == 0) {
                            this.$message({
                                message: '添加成功',
                                type: 'success'
                            });
                            this.clearUserDate();
                            this.getUserList()
                        }
                    })
                } else {
                    data.id = this.operateUser.id;

                    api.editUser(data).then(res => {
                        if (res.data.code == 0) {
                            this.$message({
                                message: '修改成功',
                                type: 'success'
                            });
                            this.clearUserDate();
                            this.getUserList()
                        }
                    })
                }

            },
            //清除新增用户数据
            clearUserDate() {
                this.form = {
                    name: '',
                    phone: '',
                    pwd: '',
                    type: 1
                }
                this.dialogFormVisible = false;
            },
            //新建用户按钮
            newUserBtn() {
                this.layerTitle = "新增用户";
                this.dialogFormVisible = true;
            },
            //显示全部
            showAll() {
                this.pageParam.currentPage = 1;
                this.pageParam.status = 2;
                this.getUserList();
            },
            //仅显示启用
            showOpen() {
                this.pageParam.currentPage = 1;
                this.pageParam.status = 1;
                this.getUserList();
            },
            //仅显示禁用
            showClose() {
                this.pageParam.currentPage = 1;
                this.pageParam.status = 0;
                this.getUserList();
            },
        }
    }
</script>

<style lang="less">
    .userList {
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
</style>
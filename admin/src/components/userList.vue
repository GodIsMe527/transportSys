<template>
    <div>
        <header>
            <!-- Form -->
            <el-button type="success" @click="dialogFormVisible = true">新增用户</el-button>

            <el-dialog title="新增用户" :visible.sync="dialogFormVisible">
                <el-form :model="form">
                    <el-form-item label="姓名" label-width="60px">
                        <el-input v-model="form.name" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="电话" label-width="60px">
                        <el-input v-model="form.phone" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" label-width="60px">
                        <el-input v-model="form.pwd" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="职位" label-width="60px">
                        <el-select v-model="form.type">
                            <el-option label="司机" value="1"></el-option>
                            <el-option label="股东" value="2"></el-option>
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
                <el-button type="text" size="small" @click="editUser">编辑</el-button>
                <el-button type="text" size="small" @click="delUser">删除</el-button>
            </el-table-column>
        </el-table>
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
                    type: '1'
                },
                formLabelWidth: '120px'
            }
        },
        created() {
            this.getUserList()
        },
        methods: {
            //刷新用户数据
            getUserList(){
                api.getUserList().then(res => {
                    if (res.data.code == 0) {
                        this.tableData = res.data.data
                        this.tableData.map(item=>{
                            item.status=='1'?item.status='司机':item.status='股东'
                        })
                    }
                })
            },
            //编辑用户
            editUser() {

            },
            //删除用户
            delUser() {

            },
            //新增用户
            newUser() {
                let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
                if (!myreg.test(this.form.phone)) {
                    this.$message({
                        message: '请输入正确的手机号',
                        type: 'warning'
                    });
                    return false;
                }
                if (this.form.pwd.length < 6) {
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
                let data = {
                    name: this.form.name,
                    pwd: this.form.pwd,
                    phone: this.form.phone,
                    time: new Date().getTime().toString(),
                    type: this.form.type,
                }
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
            },
            //清除新增用户数据
            clearUserDate() {
                this.form = {
                    name: '',
                    phone: '',
                    pwd: '',
                    type: '1'
                }
                this.dialogFormVisible=false;
            }
        }
    }
</script>

<style scoped lang="less">
    .el-select {
        width: 100%;
    }
</style>
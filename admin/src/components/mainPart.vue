<template>
    <el-container style="height: 100vh">
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
            <el-menu router :default-openeds="['1','2']">
                <el-submenu index="1">
                    <template slot="title"><i class="el-icon-s-data"></i>数据查看</template>
                    <el-menu-item-group>
                        <el-menu-item index="/dataReport">数据报表统计</el-menu-item>
                        <el-menu-item index="/chartData">收益图形报表</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title"><i class="el-icon-menu"></i>信息维护</template>
                    <el-menu-item-group>
                        <el-menu-item index="/userList">人员列表</el-menu-item>
                        <el-menu-item index="/startPoint">地点维护</el-menu-item>
                        <el-menu-item index="/vehicle">车辆维护</el-menu-item>
                        <el-menu-item index="/cargo">货物维护</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
            </el-menu>
        </el-aside>
        <el-container>
            <el-header style="text-align: right; font-size: 12px">
                <span class="name">{{userName}}</span>
                <i class="el-icon-switch-button" style="margin-right: 15px" @click="quit"></i>
            </el-header>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    export default {
        name: "mainPart",
        data() {
            const item = {
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            };
            return {
                tableData: Array(20).fill(item),
                userName: localStorage.getItem("name"),
            }
        },
        methods: {
            quit() {
                // /login
                this.$router.push("/login");
                localStorage.setItem("name", "");
                localStorage.setItem("pwd","");
                localStorage.setItem("token", "");
            }
        }
    }
</script>

<style scoped>
    .el-header {
        background-color: #B3C0D1;
        color: #333;
        line-height: 60px;
    }

    .el-aside {
        color: #333;
    }

    .el-menu {
        height: 100%;
    }

    .name {
        margin-right: 10px;
    }
</style>
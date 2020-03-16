<template>
    <div>
        <el-form>
            <el-form-item label="用户手机号">
                <el-input v-model="phone"></el-input>
            </el-form-item>
            <el-form-item label="用户名称">
                <el-input v-model="name"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="pwd"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "monthData",
        data(){
            return {
                phone:"",
                name:"",
                pwd:"",
            }
        },
        methods:{
            onSubmit(){
                let params={"phone":this.phone,"name":this.name,"pwd":this.pwd}
                this.$http.post("/newUser",params).then(res=>{
                    console.log(res);
                })
            }
        }
    }
</script>

<style scoped>

</style>
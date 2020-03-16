<template>
    <div class="driverPage PageL">
            <mt-navbar v-model="selected">
                <mt-tab-item id="1">新增记录</mt-tab-item>
                <mt-tab-item id="2">今日记录</mt-tab-item>
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
                            <input type="text" v-model="name" @click="getName">
                        </div>
                        <div class="oneInfo">
                            <p>重量</p>
                            <input type="text" v-model="Num">
                        </div>
                        <div class="oneInfo">
                            <p>起点</p>
                            <input type="text" v-model="start">
                        </div>
                        <div class="oneInfo">
                            <p>终点</p>
                            <input type="text" v-model="end">
                        </div>
                        <div class="oneInfo">
                            <p>装卸车费</p>
                            <input type="text" v-model="handingFee">
                        </div>
                        <div class="oneInfo">
                            <p>过路费</p>
                            <input type="text" v-model="roleFee">
                        </div>
                        <div class="oneInfo">
                            <p>车号</p>
                            <input type="text" v-model="vehicleNo">
                        </div>
                        <div class="saveOneInfo">
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
                            <input type="text" v-model="otherFeeNum">
                        </div>
                        <div class="saveOneInfo">
                            提交
                        </div>
                    </div>
                </mt-tab-container-item>
                <mt-tab-container-item id="2">
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
                        <tr>
                            <td>12:50</td>
                            <td>煤</td>
                            <td>55.20</td>
                            <td>大齐</td>
                            <td>钱营</td>
                            <td>5525</td>
                            <td class="edit">修改</td>
                        </tr>
                        <tr>
                            <td>12:50</td>
                            <td>煤</td>
                            <td>55.20</td>
                            <td>大齐</td>
                            <td>钱营</td>
                            <td>5525</td>
                            <td class="edit">修改</td>
                        </tr>
                        <tr>
                            <td>12:50</td>
                            <td>煤</td>
                            <td>55.20</td>
                            <td>大齐</td>
                            <td>钱营</td>
                            <td>5525</td>
                            <td class="edit">修改</td>
                        </tr>
                        <tr>
                            <td>12:50</td>
                            <td>煤</td>
                            <td>55.20</td>
                            <td>大齐</td>
                            <td>钱营</td>
                            <td>5525</td>
                            <td class="edit">修改</td>
                        </tr>
                        <tr>
                            <td>12:50</td>
                            <td>煤</td>
                            <td>55.20</td>
                            <td>大齐</td>
                            <td>钱营</td>
                            <td>5525</td>
                            <td class="edit">修改</td>
                        </tr>
                        <tr>
                            <td>12:50</td>
                            <td>煤</td>
                            <td>55.20</td>
                            <td>大齐</td>
                            <td>钱营</td>
                            <td>5525</td>
                            <td class="edit">修改</td>
                        </tr>
                        <tr>
                            <td>12:50</td>
                            <td>煤</td>
                            <td>55.20</td>
                            <td>大齐</td>
                            <td>钱营</td>
                            <td>5525</td>
                            <td class="edit">修改</td>
                        </tr>
                        <tr>
                            <td>12:50</td>
                            <td>煤</td>
                            <td>55.20</td>
                            <td>大齐</td>
                            <td>钱营</td>
                            <td>5525</td>
                            <td class="edit">修改</td>
                        </tr>
                        <tr>
                            <td>12:50</td>
                            <td>煤</td>
                            <td>55.20</td>
                            <td>大齐</td>
                            <td>钱营</td>
                            <td>5525</td>
                            <td class="edit">修改</td>
                        </tr>
                        </tbody>
                    </table>
                </mt-tab-container-item>
            </mt-tab-container>
    </div>
</template>

<script>
    export default {
        name: "driver",
        data(){
            return {
                selected:"1",
                name:"",
                Num:"",
                start:"",
                end:"",
                handingFee:"",
                roleFee:"",
                otherFeeName:"",
                otherFeeNum:"",
                vehicleNo:"",
            }
        },
        methods:{
            getName(){
            }
        },
        created() {
        }
    }
</script>

<style scoped lang="less">
    .driverPage{
        height: 100%;
        display: flex;
        flex-direction: column;
        .mint-navbar{
            color: #fff;
            background-color: #666666;
            .avatar{
                height: 46px;
                padding: 8px 10px;
                box-sizing: border-box;
                img{
                    height: 30px;
                    border-radius: 15px;
                }
            }
            .mint-tab-item-label{
                font-size: 1.4rem!important;
            }
        }
        .mint-tab-container{
            flex: 1;
            padding: 15px;
            .transportInfo,.otherInfo{
                overflow: hidden;
                padding-bottom: 2rem;
                border-bottom: 1px solid #E4E4E4;
                margin-bottom: 1rem;
                .oneInfo{
                    width: 50%;
                    float: left;
                    padding: 0 10px;
                    box-sizing: border-box;
                    margin-bottom: 10px;
                    p{
                        margin: 0 0 5px 0;
                        font-size: 2rem;
                    }
                    input{
                        width: 100%;
                        box-sizing: border-box;
                        padding: 3px 5px;
                        border-radius: 5px;
                        border: 1px solid #E4E4E4;
                        font-size: 1.6rem;
                    }
                }
                .saveOneInfo{
                    float: left;
                    width: 50%;
                    margin-left:25%;
                    margin-top: 1.5rem;
                    color: #fff;
                    background-color: #666666;
                    text-align: center;
                    font-size: 2.0rem;
                    padding: 5px 0;
                    border-radius: 5px;
                }
            }
            .otherInfo{
                border-bottom: 0;
            }
            h5{
                font-size: 2.2rem;
                margin: 0 0 1rem;
            }
            table{
                width: 100%;
                font-size: 1.4rem;
                tbody{
                    td{
                        text-align: center;
                    }
                    .edit{
                        text-decoration: underline;
                        color: #C5A56C;
                    }
                }
            }
        }
    }
</style>
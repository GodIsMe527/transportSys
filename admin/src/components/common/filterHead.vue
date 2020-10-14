<template>
    <div class="filter">
        <div class="firstCondition" v-if="showDate">
            <div class="block">
                <span class="title">开始日期: </span>
                <el-date-picker
                        v-model="start"
                        type="date"
                        placeholder="开始日期">
                </el-date-picker>
            </div>
            <div class="block">
                <span class="title">结束日期: </span>
                <el-date-picker
                        v-model="end"
                        type="date"
                        placeholder="结束日期">
                </el-date-picker>
            </div>
            <div class="block">
                <el-button type="primary">提交</el-button>
            </div>
        </div>
        <div class="firstCondition secondCondition" v-if="showSecondCondition">
            <el-select v-model="driverD" filterable placeholder="选择司机" class="block">
                <el-option
                        v-for="item in drivers"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            <el-select v-model="cargoD" filterable placeholder="选择货物" class="block">
                <el-option
                        v-for="item in cargoes"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            <el-select v-model="startD" filterable placeholder="选择起点" class="block">
                <el-option
                        v-for="item in points"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            <el-select v-model="endD" filterable placeholder="选择终点" class="block">
                <el-option
                        v-for="item in points"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
        </div>
    </div>
</template>

<script>
    export default {
        name: "filterHead",
        mounted() {
            console.log("showDate" + this.showDate);
            console.log("showSecondCondition" + this.showSecondCondition);
        },
        props: {
            showDate: {
                type: Boolean,
                default: true
            },
            showSecondCondition: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                start: "",
                end: "",     //选择的起始日期
                drivers: [{
                    value: 'aaa',
                    label: '老李'
                }, {
                    value: 'bbb',
                    label: '老王'
                }],
                points: [{
                    value: 'ccc',
                    label: '北京'
                }, {
                    value: 'ddd',
                    label: '南京'
                }],
                cargoes: [{
                    value: 'bing',
                    label: '冰'
                }, {
                    value: 'huo',
                    label: '火'
                }],
                driverD: "",
                startD: "",
                endD: "",
                cargoD:"",
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
        }
    }

    .secondCondition {
        justify-content: center;
    }
</style>
<template>
    <div id="chartData">
        <div class="selectArea">
            <el-tag @click="changeArea(0)">日</el-tag>
            <el-tag type="success" @click="changeArea(1)">月</el-tag>
            <el-tag type="danger" @click="changeArea(2)">年</el-tag>
        </div>
        <filter-head ref="filterHead" :dateType="dateType" @queryCommit="queryCommit"></filter-head>
        <div ref="chartPart" style="width: 100%;height: 500px" v-show="queryType==0"></div>
        <div ref="chartPartMonth" style="width: 100%;height: 500px" v-show="queryType==1"></div>
        <div ref="chartPartYear" style="width: 100%;height: 500px" v-show="queryType==2"></div>
    </div>
</template>

<script>
    import filterHead from "./common/filterHead.vue"
    import api from '../utils/api'

    export default {
        name: "chartData",
        components: {
            filterHead
        },
        data() {
            return {
                myChart: {},
                myChartMonth: {},
                myChartYear: {},
                option: {},
                optionMonth: {},
                optionYear: {},
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
                driverD: "",
                startD: "",
                endD: "",
                startDateStr: "",
                endDateStr: "",
                startMonthStr: "",
                endMonthStr: "",
                startYearStr: "",
                endYearStr: "",
                queryType: 0,     //0、日  1、月  2、年
                dateType: "date",
                intervalMonth: 6,
                intervalYear: 10,
            }
        },
        methods: {
            //查询数据
            queryChartData(start, end) {
                let param = {
                    status: 1
                };
                let startP = this.$refs.filterHead.getStart();
                let endP = this.$refs.filterHead.getEnd();
                let driverP = this.$refs.filterHead.getDriverD();
                let vehicleD = this.$refs.filterHead.getVehicleD();
                let cargoD = this.$refs.filterHead.getCargoD();
                let startDP = "", endDP = "";
                startDP = start || (this.$refs.filterHead.getStartD() ? this.dateFormat(this.$refs.filterHead.getStartD()) : "");
                endDP = end || (this.$refs.filterHead.getEndD() ? this.dateFormat(this.$refs.filterHead.getEndD()) : "");
                startDP ? param.startDP = startDP : "";
                endDP ? param.endDP = endDP : "";
                param.dateType = this.queryType;
                if (!startDP || !endDP ) {
                    this.$message.error("请选择开始日期和结束日期");
                    return;
                }
                if (this.queryType == 0) {
                    if (!startDP && !endDP) {
                        param.startDP = this.startDateStr;
                        param.endDP = this.endDateStr;
                    }
                    if ((new Date(endDP).getTime() - new Date(startDP).getTime()) > 60 * 60 * 24 * 30 * 1000) {
                        this.$message.error("最多选择查看30天的日期");
                        return;
                    }
                } else if (this.queryType == 1) {
                    if (!startDP && !endDP) {
                        param.startDP = this.monthAddZero(2,this.startMonthStr);
                        param.endDP = this.monthAddZero(2,this.endMonthStr);
                    }
                    if ((new Date(endDP).getFullYear() - new Date(startDP).getFullYear()) > 6) {
                        this.$message.error("最多选择查看6个月的数据");
                        return;
                    }
                } else if (this.queryType == 2) {
                    if (!startDP && !endDP) {
                        param.startDP = this.startYearStr;
                        param.endDP = this.endYearStr;
                    }
                    if ((new Date(endDP).getFullYear() - new Date(startDP).getFullYear()) > 10) {
                        this.$message.error("最多选择查看6年的数据");
                        return;
                    }
                }
                // if ((!startDP && endDP) || (!endDP && startDP)) {
                startP ? param.startP = startP : "";
                endP ? param.endP = endP : "";
                driverP ? param.driverP = driverP : "";
                vehicleD ? param.vehicleD = vehicleD : "";
                cargoD ? param.cargoD = cargoD : "";
                return new Promise((resolve, reject) => {
                    api.queryChartData(param).then(res => {
                        if (res.data.code == 0) {
                            this.option.xAxis.data = [];
                            this.option.series[0].data = [];
                            if (res.data.data && res.data.data.length > 0) {
                                res.data.data.map(item => {
                                    this.option.xAxis.data.push(item.date.substr(5));
                                    this.option.series[0].data.push(item.num);
                                });
                            }
                            this.myChart.setOption(this.option);
                            resolve();
                        } else {
                            reject();
                        }
                    })
                });
            },
            queryCommit() {
                console.log(111);
                this.queryChartData();
            },
            //格式化日期
            dateFormat(date) {
                let dateTime = new Date(date);
                if (this.queryType == 0) {
                    return dateTime.getFullYear() + "-" + (dateTime.getMonth() + 1) + "-" + dateTime.getDate();
                } else if (this.queryType == 1) {
                    return dateTime.getFullYear() + "-" + (dateTime.getMonth() + 1);
                } else if (this.queryType == 2) {
                    return dateTime.getFullYear();
                }

            },
            changeArea(type) {
                this.queryType = type;
                switch (type) {
                    case 0:
                        this.dateType = "date";
                        break;
                    case 1:
                        this.dateType = "month";
                        this.$nextTick(() => {
                            if (Object.keys(this.myChartMonth).length === 0) {
                                this.myChartMonth = this.$echarts.init(this.$refs.chartPartMonth);
                                window.addEventListener('resize', () => {
                                    this.myChartMonth.resize();
                                });
                            }
                            this.myChartMonth.setOption(this.optionMonth);
                        })
                        break;
                    case 2:
                        this.dateType = "year";
                        this.$nextTick(() => {
                            if (Object.keys(this.myChartYear).length === 0) {
                                this.myChartYear = this.$echarts.init(this.$refs.chartPartYear);
                                window.addEventListener('resize', () => {
                                    this.myChartYear.resize();
                                });
                            }
                            this.myChartYear.setOption(this.optionYear);
                        })
                        break;
                }
                console.log(this.queryType);
            },
            //月份补0
            monthAddZero(length,num){
                return num.toString().padStart(length,"0")
            }

        },
        created() {
            let today = new Date();
            let startDay = new Date((today.getTime() - 60 * 60 * 24 * 1000));
            let beforeDay = new Date((today.getTime() - 60 * 60 * 24 * 10 * 1000));
            let currentMonth = startDay.getMonth() + 1, currentMonthYear = startDay.getFullYear();
            if (currentMonth < this.intervalMonth) {
                this.startMonthStr = (currentMonthYear - 1) + "-" +this.monthAddZero(2,currentMonth + this.intervalMonth) ;
            } else {
                this.startMonthStr = currentMonthYear + "-" + this.monthAddZero(2,currentMonth - this.intervalMonth);
            }
            this.startDateStr = beforeDay.getFullYear() + "-" + this.monthAddZero(2,beforeDay.getMonth() + 1) + "-" + beforeDay.getDate();
            this.endDateStr = currentMonthYear + "-" +this.monthAddZero(2,startDay.getMonth() + 1) + "-" + startDay.getDate();
            this.endMonthStr  = currentMonthYear + "-" + this.monthAddZero(2,startDay.getMonth() + 1);
            this.startYearStr = currentMonthYear - this.intervalYear;
            this.endYearStr = currentMonthYear - 1;
        },
        mounted() {
            this.myChart = this.$echarts.init(this.$refs.chartPart);
            this.option = {
                xAxis: {
                    type: 'category',
                    data: [],
                    axisLabel: {
                        color: '#000000',
                        fontSize: 10,//如果全部显示不开,可以选择字体大小
                        interval: 1,  //控制是否全部显示
                        rotate: 0//控制字体倾斜
                    },
                    axisTick: {
                        show: false
                    }
                },
                yAxis: {
                    type: 'value',
                    axisTick: {
                        show: false
                    }
                },
                series: [{
                    data: [],
                    type: 'bar',
                    showBackground: false,
                    itemStyle: {
                        normal: {
                            color: '#77b9f5',
                            label: {
                                show: true, //开启显示
                                position: 'top', //在上方显示
                                textStyle: { //数值样式
                                    color: '#c23531',
                                    fontSize: 10
                                }
                            }
                        }
                    },
                }]
            };
            this.optionMonth = {
                xAxis: {
                    type: 'category',
                    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12日'],
                    axisLabel: {
                        color: '#000000',
                        fontSize: 10,//如果全部显示不开,可以选择字体大小
                        interval: 1,  //控制是否全部显示
                        rotate: 0//控制字体倾斜
                    },
                    axisTick: {
                        show: false
                    }
                },
                yAxis: {
                    type: 'value',
                    axisTick: {
                        show: false
                    }
                },
                series: [{
                    data: [120, 200, 150, 80, 70, 110, 130, 150, 263, 270, 120, 200],
                    type: 'bar',
                    showBackground: false,
                    itemStyle: {
                        normal: {
                            color: '#77b9f5',
                            label: {
                                show: true, //开启显示
                                position: 'top', //在上方显示
                                textStyle: { //数值样式
                                    color: '#c23531',
                                    fontSize: 8
                                }
                            }
                        }
                    },
                }]
            };
            this.optionYear = {
                xAxis: {
                    type: 'category',
                    data: [],
                    axisLabel: {
                        color: '#000000',
                        fontSize: 10,//如果全部显示不开,可以选择字体大小
                        interval: 1,  //控制是否全部显示
                        rotate: 0//控制字体倾斜
                    },
                    axisTick: {
                        show: false
                    }
                },
                yAxis: {
                    type: 'value',
                    axisTick: {
                        show: false
                    }
                },
                series: [{
                    data: [],
                    type: 'bar',
                    showBackground: false,
                    itemStyle: {
                        normal: {
                            color: '#77b9f5',
                            label: {
                                show: true, //开启显示
                                position: 'top', //在上方显示
                                textStyle: { //数值样式
                                    color: '#c23531',
                                    fontSize: 8
                                }
                            }
                        }
                    },
                }]
            };
            this.myChart.setOption(this.option);
            window.addEventListener('resize', () => {
                this.myChart.resize();
            });
            this.queryChartData(this.startDateStr, this.endDateStr);
            this.$refs.filterHead.setStartD(this.startMonthStr);
            this.$refs.filterHead.setEndD(this.endMonthStr);
        }
    }
</script>

<style scoped lang="less">
    #chartData {
        width: 100%;
        height: 100%;
        .selectArea {
            text-align: right;
            .el-tag {
                margin-right: 20px;
                margin-bottom: 24px;
                padding: 0 30px;
                cursor: pointer;
            }
        }
    }
</style>
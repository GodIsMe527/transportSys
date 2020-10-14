<template>
    <div>
        <p @click="change">点我开始变</p>
        <p @click="getValue">点我获取值</p>
        <filter-head ref="filterHead"></filter-head>
        <div ref="chartPart" style="width: 100%;height: 500px"></div>
    </div>
</template>

<script>
    import filterHead from "./common/filterHead.vue"

    export default {
        name: "chartData",
        components: {
            filterHead
        },
        data() {
            return {
                myChart: {},
                option: {},
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
            }
        },
        methods: {
            change() {
                this.option = {
                    xAxis: {
                        type: 'category',
                        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: [820, 932, 901, 934, 1290, 1330, 1320],
                        type: 'line',
                        smooth: true
                    }]
                };
                this.myChart.setOption(this.option, true);
            },
            getValue() {
                console.log(this.$refs.filterHead.getStart());
            },
        },
        mounted() {
            this.myChart = this.$echarts.init(this.$refs.chartPart);
            this.option = {
                xAxis: {
                    type: 'category',
                    data: ['1日', '2日', '3日', '4日', '5日', '6日', '7日', '8日', '9日', '10日', '11日', '12日', '13日', '14日', '15日', '16日', '17日', '18日',
                        '19日', '20日', '21日', '22日', '23日', '24日', '25日', '26日', '27日', '28日', '29日', '30日']
                },
                yAxis: {
                    type: 'value'
                },

                series: [{
                    data: [120, 200, 150, 80, 70, 110, 130, 150, 263, 270, 120, 200, 150, 80, 70, 110, 130, 150, 263, 270, 120, 200, 150, 80, 70, 110, 130, 150, 263, 270],
                    type: 'bar',
                    showBackground: true,
                    backgroundStyle: {
                        // color: '#77b9f5'
                        color: '#e7e7e7'
                    },
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
            this.myChart.setOption(this.option);
            window.addEventListener('resize', () => {
                this.myChart.resize();
            });
        }
    }
</script>

<style scoped lang="less">
    #data {
        width: 100%;
        height: 100%;
    }
</style>
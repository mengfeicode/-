<template>
    <div class="lineCharts">
        <div id="lineCharts" class="" style="width: 100%;height:450px;"></div>
    </div>
</template>

<script>
    import * as echarts from 'echarts';
    
    export default {
        mounted(){
            this.myChart = echarts.init(document.getElementById('lineCharts'));
            this.initData();
        },
        props: {
          lineData:{
            title:'',   //标题
            data:[],    //每条线代表的意思
            xAxis:[],   //x轴定义
            series:[]   //具体的信息
          }
        },
        methods: {
            initData(){
              let option = {
                title: {
                    text: this.lineData.title
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: this.lineData.data
                },
                grid: {
                    left: '3%',
                    right: '10%',
                    bottom: '3%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: this.lineData.xAxis
                },
                yAxis: {
                    type: 'value'
                },
                series: this.lineData.series
              };
              this.myChart.setOption(option);
            }
        },
    }
</script>


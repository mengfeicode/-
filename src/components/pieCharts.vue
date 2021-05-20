<template>
    <div class="pieCharts">
        <div id="pieCharts" class="" style="width: 100%;height:450px;"></div>
    </div>
</template>

<script>
    import * as echarts from 'echarts';
    
    export default {
        mounted(){
            var that = this;
            //网速有时候慢，所以设置1s
            setTimeout(function(){
                that.myChart = echarts.init(document.getElementById('pieCharts'),'light');
                that.initData();
            },1000)
        },
        props: {
            pieData:{
                title:'',
                series:[],
            }
        },
        methods: {
            initData(){
                const option = {
                    title : {
                        text: this.pieData.title,
                        subtext: '',
                        x:'center'
                    },
                    series: this.pieData.series
                }
                this.myChart.setOption(option);
            }
        },
    }
</script>


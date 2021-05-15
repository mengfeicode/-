<template>
    <div class="pieCharts">
        <div id="pieCharts" class="" style="width: 100%;height:450px;"></div>
    </div>
</template>

<script>
    import * as echarts from 'echarts';
    
    export default {
        mounted(){
            this.myChart = echarts.init(document.getElementById('pieCharts'),'light');
            this.initData();
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


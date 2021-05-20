<template>
    <div class="histogramH">
        <div id="histogramH" class="" style="width: 100%;height:450px;"></div>
    </div>
</template>

<script>
    import * as echarts from 'echarts';
    
    export default {
        mounted(){
            var that = this;
            //网速有时候慢，所以设置1s
            setTimeout(function(){
                let myChart = echarts.init(document.getElementById('histogramH'));
                const option = {
                    title: {
                        text: that.histogramData.title,
                        x:'center'
                    },
                    yAxis: {
                        type: 'category',
                        data: that.histogramData.xData
                    },
                    xAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: that.histogramData.yData,
                        type: 'bar',
                        showBackground: true,
                        backgroundStyle: {
                            color: 'rgba(180, 180, 180, 0.2)'
                        }
                    }]
                };
                option && myChart.setOption(option);
            },1000)
        },
        props: {
            histogramData:{
                title:'',
                series:[],
            }
        },
    }
</script>


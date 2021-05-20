<template>
    <div class="mulLineCharts">
        <div id="mulLineCharts" class="" style="width: 100%;height:450px;margin-top:50px;"></div>
    </div>
</template>

<script>    
    import * as echarts from 'echarts'

    export default {
      props: {
        myData:{
          data:[],   //后端返回的实际数据
          title:'',
        },
      },
      data(){
        return {
          myChart:'',
          option:'',
        }
      },
      mounted(){
        let chartDom = document.getElementById('mulLineCharts');
        this.myChart = echarts.init(chartDom);
        this.$nextTick(function(){
          this.run(this.myData.data)
          this.option && this.myChart.setOption(this.option);
        })
        
      },
      methods:{
        run(_rawData) {
          this.option = {
            dataset: [{
              id: 'dataset_raw',
              source: _rawData
            }, {
              id: 'max_line',
              fromDatasetId: 'dataset_raw',
              transform: {
                type: 'filter',
                config: {
                  and: [
                    { dimension: 'date', gte: 20200516 },
                    { dimension: 'type', '=': 'max' }
                  ]
                }
              }
            }, {
              id: 'min_line',
              fromDatasetId: 'dataset_raw',
              transform: {
                type: 'filter',
                config: {
                  and: [
                    { dimension: 'date', gte: 20200516  },
                    { dimension: 'type', '=': 'min' }
                  ]
                }
              }
            }, {
              id: 'avg_line',
              fromDatasetId: 'dataset_raw',
              transform: {
                type: 'filter',
                config: {
                  and: [
                    // { dimension: 'date', gte: 20200516  },
                    { dimension: 'type', '=': 'avg' }
                  ]
                }
              }
            }],
            title: {
              text: this.myData.title
            },
            tooltip: {
              trigger: 'axis'
            },
            xAxis: {
              type: 'category',
              nameLocation: 'right'
            },
            yAxis: {
              name: this.myData.yName
            },
            series: [{
              type: 'line',
              datasetId: 'max_line',
              showSymbol: false,
              encode: {
                x: 'date',
                y: 'Value',
                itemName: 'date',
                tooltip: ['Value'],
              }
            }, {
              type: 'line',
              datasetId: 'min_line',
              showSymbol: false,
              encode: {
                x: 'date',
                y: 'Value',
                itemName: 'date',
                tooltip: ['Value'],
              }
            }, {
              type: 'line',
              datasetId: 'avg_line',
              showSymbol: false,
              encode: {
                x: 'date',
                y: 'Value',
                itemName: 'date',
                tooltip: ['Value'],
              }
            }]
          };
          this.myChart.setOption(this.option);
        }
      }
    }


</script>


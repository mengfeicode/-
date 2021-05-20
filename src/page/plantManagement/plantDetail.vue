<template>
    <div>
        <head-top></head-top>
				<el-row style="margin-top: 100px;">
					<el-col :span="12">
						<pie-charts :pieData='pieData'></pie-charts>
					</el-col>
					<el-col :span="12">
						<histogram :histogramData='histogramData'></histogram>
					</el-col>
				</el-row>
				<el-row style="margin-top: 100px;">
					<el-col :span="12">
						<line-charts :lineData='lineData'></line-charts>
					</el-col>
					<el-col :span="12">
						<el-col :span="12">
							<histogram-h :histogramData='histogramData'></histogram-h>
						</el-col>
					</el-col>
				</el-row>
				
				222
    </div>
</template>

<script>
	import headTop from '@/components/headTop'
	import {plantInfo} from '@/api/request.js'
	import pieCharts from '@/components/pieCharts.vue'
	import histogram from '@/components/histogram.vue'
	// import lineCharts from '@/components/lineCharts.vue'
	// import histogramH from '@/components/histogramH.vue'
    export default {
    	data(){
    		return {
    			pieData:{
						title:'农产品种类种植面积占比',
            series:[{
							// name: '访问来源',
							type: 'pie',
							radius: '55%',
							data:[]
						}]
					},
					histogramData:{
						title:'',
						xData:[],
						yData:[]
					},
					// lineData:{
					// 	title:"",
					// 	data:[ '视频广告', '直接访问', '搜索引擎'],
					// 	xAxis:['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
					// 	series:[
					// 		{
					// 				name: '视频广告',
					// 				type: 'line',
					// 				stack: '总量',
					// 				data: [150, 232, 201, 154, 190, 330, 410]
					// 		},
					// 		{
					// 				name: '直接访问',
					// 				type: 'line',
					// 				stack: '总量',
					// 				data: [320, 332, 301, 334, 390, 330, 320]
					// 		},
					// 		{
					// 				name: '搜索引擎',
					// 				type: 'line',
					// 				stack: '总量',
					// 				data: [820, 932, 901, 934, 1290, 1330, 1320]
					// 		}
					// 	]
					// },
				}
    	},
    	components: {
    		headTop,
				pieCharts,
				histogram,
				// lineCharts,
				// histogramH
    	},
    	mounted(){

    	},
    	created(){
				this.$nextTick(function(){
					plantInfo().then((res) => {
					//饼图
					this.pieData.series[0].data = res.data[0].values;
					//柱状图
					this.histogramData.title = res.data[1].graphName;
					this.histogramData.xData = this.getArr(res.data[1].values)[0]
					this.histogramData.yData = this.getArr(res.data[1].values)[1]
					// //折线图
					// this.lineData.title = res.data[2].graphName;
					// console.log(this.histogramData)
				})
				})
			},
			methods:{
				getArr(arr){
					let res1 = [];
					let res2 = []
					for(let item of arr){
						res1.push(item.name)
						res2.push(item.value)
					}
					return [res1, res2]
				}
			}
    }
</script>


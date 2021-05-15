<template>
    <div>
        <head-top></head-top>
				<el-row style="margin-top: 100px;">
					<el-col :span="12">
						<pie-charts :pieData='pieData'></pie-charts>
					</el-col>
					<el-col :span="12">
						<line-charts :lineData='lineData'></line-charts>
					</el-col>
				</el-row>
				<el-row style="margin-top: 100px;">
					<el-col :span="12">
						<pie-charts :pieData='pieData'></pie-charts>
					</el-col>
					<el-col :span="12">

					</el-col>
				</el-row>
				
				222
    </div>
</template>

<script>
	import headTop from '@/components/headTop'
	import pieCharts from '@/components/pieCharts.vue'
	import lineCharts from '@/components/lineCharts.vue'
    export default {
    	data(){
    		return {
    			pieData:{
						title:'面积占比',
            series:[{
							// name: '访问来源',
							type: 'pie',
							radius: '55%',
							data:[
								{value:235, name:'视频广告'},
								{value:274, name:'联盟广告'},
								{value:310, name:'邮件营销'},
								{value:335, name:'直接'},
								{value:400, name:'搜索引擎'}
							]
						}]
					},
					lineData:{
						title:"种植状态",
						data:[ '视频广告', '直接访问', '搜索引擎'],
						xAxis:['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
						series:[
							{
									name: '视频广告',
									type: 'line',
									stack: '总量',
									data: [150, 232, 201, 154, 190, 330, 410]
							},
							{
									name: '直接访问',
									type: 'line',
									stack: '总量',
									data: [320, 332, 301, 334, 390, 330, 320]
							},
							{
									name: '搜索引擎',
									type: 'line',
									stack: '总量',
									data: [820, 932, 901, 934, 1290, 1330, 1320]
							}
						]
					},
				}
    	},
    	components: {
    		headTop,
				pieCharts,
				lineCharts
    	},
    	mounted(){
    	},
    	methods: {
    		
    	}
    }
</script>

<style lang="less">
	@import '../../style/mixin';
	
</style>

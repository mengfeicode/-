<template>
    <div>
        <head-top></head-top>
		<section class="data_section">
			<el-row>
				<el-col :span='18'>
					<header class="section_title">当前环境指标</header>
						<el-row :gutter="20" style="margin-bottom: 10px;">
								<el-col :span="6"><div class="data_list today_head"><span class="data_num head">空气温度</span></div></el-col>
								<el-col :span="6"><div class="data_list"><span class="data_num">{{adminCount}}</span> ℃</div></el-col>
								<el-col :span="6"><div class="data_list"><span class="data_num">质量状况：</span></div></el-col>
								<el-col :span="3"><div class="data_list"><span class="data_num">优</span></div></el-col>
						</el-row>
						<el-row :gutter="20" style="margin-bottom: 10px;">
								<el-col :span="6"><div class="data_list all_head"><span class="data_num head">空气湿度</span></div></el-col>
								<el-col :span="6"><div class="data_list"><span class="data_num">{{adminCount}}</span> %</div></el-col>
								<el-col :span="6"><div class="data_list"><span class="data_num">质量状况：</span></div></el-col>
								<el-col :span="3"><div class="data_list"><span class="data_num">优</span></div></el-col>
						</el-row>
						<el-row :gutter="20"  style="margin-bottom: 10px;">
								<el-col :span="6"><div class="data_list all_head"><span class="data_num head">二氧化碳浓度</span></div></el-col>
								<el-col :span="6"><div class="data_list"><span class="data_num">{{adminCount}}</span> %</div></el-col>
								<el-col :span="6"><div class="data_list"><span class="data_num">质量状况：</span></div></el-col>
								<el-col :span="3"><div class="data_list"><span class="data_num">优</span></div></el-col>
						</el-row>
						<el-row :gutter="20"  style="margin-bottom: 10px;">
								<el-col :span="6"><div class="data_list all_head"><span class="data_num head">光照度</span></div></el-col>
								<el-col :span="6"><div class="data_list"><span class="data_num">{{adminCount}}</span> %</div></el-col>
								<el-col :span="6"><div class="data_list"><span class="data_num">质量状况：</span></div></el-col>
								<el-col :span="3"><div class="data_list"><span class="data_num">优</span></div></el-col>
						</el-row>
						<el-row :gutter="20"  style="margin-bottom: 10px;">
								<el-col :span="6"><div class="data_list all_head"><span class="data_num head">土壤温度</span></div></el-col>
								<el-col :span="6"><div class="data_list"><span class="data_num">{{adminCount}}</span> %</div></el-col>
								<el-col :span="6"><div class="data_list"><span class="data_num">质量状况：</span></div></el-col>
								<el-col :span="3"><div class="data_list"><span class="data_num">优</span></div></el-col>
						</el-row>
						<el-row :gutter="20"  style="margin-bottom: 10px;">
								<el-col :span="6"><div class="data_list all_head"><span class="data_num head">土壤湿度</span></div></el-col>
								<el-col :span="6"><div class="data_list"><span class="data_num">{{adminCount}}</span> %</div></el-col>
								<el-col :span="6"><div class="data_list"><span class="data_num">质量状况：</span></div></el-col>
								<el-col :span="3"><div class="data_list"><span class="data_num">优</span></div></el-col>
						</el-row>
				</el-col>
				<el-col :span='6'>
					<iframe width="280" height="300" frameborder="0" scrolling="no" hspace="0" src="https://i.tianqi.com/?c=code&a=getcode&id=55&icon=1"></iframe>
				</el-col>
			</el-row>
			
			
		</section>
		<!-- <tendency :sevenDate='sevenDate' :sevenDay='sevenDay'></tendency> -->
    </div>
</template>

<script>
	import headTop from '../components/headTop'
	// import tendency from '../components/tendency' 
	import dtime from 'time-formater'
	import {userCount, orderCount, getUserCount, getOrderCount, adminDayCount, adminCount} from '@/api/getData'
    export default {
    	data(){
    		return {
					environmentData:[],
    			userCount: null,
    			orderCount: null,
                adminCount: null,
                allUserCount: null,
                allOrderCount: null,
                allAdminCount: null,
    			sevenDay: [],
    			sevenDate: [[],[],[]],
    		}
    	},
    	components: {
    		headTop,
    		// tendency,
    	},
    	mounted(){
    		this.initData();
    		for (let i = 6; i > -1; i--) {
    			const date = dtime(new Date().getTime() - 86400000*i).format('YYYY-MM-DD')
    			this.sevenDay.push(date)
    		}
    		this.getSevenData();
    	},
        computed: {

        },
    	methods: {
    		async initData(){
    			const today = dtime().format('YYYY-MM-DD')
    			Promise.all([userCount(today), orderCount(today), adminDayCount(today), getUserCount(), getOrderCount(), adminCount()])
    			.then(res => {
    				this.userCount = res[0].count;
    				this.orderCount = res[1].count;
                    this.adminCount = res[2].count;
                    this.allUserCount = res[3].count;
                    this.allOrderCount = res[4].count;
                    this.allAdminCount = res[5].count;
    			}).catch(err => {
    				console.log(err)
    			})
    		},
    		async getSevenData(){
    			const apiArr = [[],[],[]];
    			this.sevenDay.forEach(item => {
    				apiArr[0].push(userCount(item))
    				apiArr[1].push(orderCount(item))
                    apiArr[2].push(adminDayCount(item))
    			})
    			const promiseArr = [...apiArr[0], ...apiArr[1], ...apiArr[2]]
    			Promise.all(promiseArr).then(res => {
    				const resArr = [[],[],[]];
					res.forEach((item, index) => {
						if (item.status == 1) {
							resArr[Math.floor(index/7)].push(item.count)
						}
					})
					this.sevenDate = resArr;
    			}).catch(err => {
    				console.log(err)
    			})
    		}
    	}
    }
</script>

<style lang="less">
	@import '../style/mixin';
	.data_section{
		padding: 20px;
		margin-bottom: 40px;
		.section_title{
			text-align: center;
			font-size: 30px;
			margin-bottom: 10px;
		}
		.data_list{
			text-align: center;
			font-size: 14px;
			color: #666;
            border-radius: 6px;
            background: #E5E9F2;
            .data_num{
                color: #333;
                font-size: 26px;

            }
            .head{
                border-radius: 6px;
                font-size: 22px;
                padding: 4px 0;
                color: #fff;
                display: inline-block;
            }
        }
        .today_head{
            background: #FF9800;
        }
        .all_head{
            background: #20A0FF;
        }
	}
    .wan{
        .sc(16px, #333)
    }
</style>

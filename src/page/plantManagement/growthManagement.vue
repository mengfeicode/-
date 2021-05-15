<template>
    <div>
        <head-top></head-top>
        <el-row style="margin-top: 50px;">
					<el-col :span="20" :offset="2">
						<!-- 查询信息开始 -->
						<el-form :model="formData" ref="growthManagement" label-width="150px">
							<el-row>
								<el-col :span='8'>
									<el-form-item label="农产品名称">
										<el-input v-model="formData.cropName"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span='8'>
									<el-form-item label="种植状态">
										<el-select v-model="formData.status" placeholder="请选择">
											<el-option v-for="item in operOptions" :key="item.value" :label="item.label" :value="item.value">
											</el-option>
										</el-select>
									</el-form-item>
								</el-col>
								<el-col :span='8'>
									<el-form-item label="操作人">
										<el-select v-model="formData.operator" placeholder="请选择">
											<el-option v-for="item in personOptions" :key="item.value" :label="item.label" :value="item.value">
											</el-option>
										</el-select>
									</el-form-item>
								</el-col>
							</el-row>
							<el-row>
								<el-col :span='12'>
									<el-form-item label="操作日期">
										<el-date-picker v-model="formData.operaDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyyMMdd"></el-date-picker>
									</el-form-item>
								</el-col>
								<el-col :span='6'>
									<el-form-item label="农产品类型">
										<el-select v-model="formData.cropType" placeholder="请选择">
											<el-option v-for="item in planttype" :key="item.value" :label="item.label" :value="item.value">
											</el-option>
										</el-select>
									</el-form-item>
								</el-col>
								<el-col :span='4'>
									<el-form-item class="button_submit">
										<el-button type="primary" @click="submitForm('formData')">查询</el-button>
									</el-form-item>
								</el-col>
							</el-row>
						</el-form>
						<!-- 查询信息结束 -->
						<!-- 展示信息开始 -->
						<el-table :data="tableData" style="margin-top:25px;" highlight-current-row>
    					<el-table-column prop="plantNo" label="农产品编号" align="center"></el-table-column>
    					<el-table-column prop="plantName" label="名称" align="center"></el-table-column>
							<el-table-column prop="plantType" label="农产品类型"></el-table-column>
							<el-table-column prop="plantStatus" label="最新种植状态" align="center"></el-table-column>
							<el-table-column prop="operaDate" label="时间" align="center"></el-table-column>
							<el-table-column prop="personOpera" label="操作人" width="100" align="center"></el-table-column>
							<el-table-column fixed="right" label="生长周期管理" width="260" min-width="200" align="center">
								<template slot-scope="scope">
									<el-button @click="addOpera = true" type="text" size="small">添加操作</el-button>
									<el-button @click="showInfo = true" type="text" size="small">显示详情</el-button>
								</template>
							</el-table-column>
						</el-table>
						<!-- 展示信息结束 -->
						<!-- 添加操作弹出框开始 -->
						<el-dialog title="请添加对应的操作：" :visible.sync="addOpera"  width="50%" center>
							<el-row>
								<el-col :span="12" :offset="5">
									<el-form :model="addplantData" label-width="80px" align='left'>
										<el-form-item label="操作类型">
											<el-select v-model="addplantData.operaType" placeholder="请选择">
												<el-option v-for="item in operOptions" :key="item.value" :label="item.label" :value="item.value">
												</el-option>
											</el-select>
										</el-form-item>
										<el-form-item label="具体操作">
											<el-input type="textarea" v-model="addplantData.operaDes"></el-input>
										</el-form-item>
										<el-form-item label="操作人">
											<el-select v-model="addplantData.personOpera" placeholder="请选择">
												<el-option v-for="item in personOptions" :key="item.value" :label="item.label" :value="item.value">
												</el-option>
											</el-select>
										</el-form-item>
									</el-form>
								</el-col>
							</el-row>
							<span slot="footer" class="dialog-footer">
								<el-button @click="addOpera = false">取 消</el-button>
								<el-button type="primary" @click="addOpera = false">确 定</el-button>
							</span>
						</el-dialog>
            <!-- 添加操作弹出框结束 -->
						<!-- 显示详情弹出框开始 -->
						<el-dialog title="请添加对应的操作：" :visible.sync="showInfo"  width="50%" center>
								 <div class="radio">排序：
									<el-radio-group v-model="reverse">
										<el-radio :label="true">倒序</el-radio>
										<el-radio :label="false">正序</el-radio>
									</el-radio-group>
								</div>
								<el-timeline :reverse="reverse" style="margin-top:20px;">
									<el-timeline-item v-for="(activity, index) in activities" :key="index" :timestamp="activity.timestamp" placement="top">
										{{activity.content}}
										<el-card>
											<h4>{{activity.content}}</h4>
											<p>{{activity.person}} 提交于 {{activity.timestamp}}</p>
										</el-card>
									</el-timeline-item>
								</el-timeline>
						</el-dialog>
						<!-- 显示详情弹出框结束 -->
					</el-col>
  		</el-row>
    </div>
</template>

<script>
    import headTop from '@/components/headTop'
    import {baseUrl, baseImgPath} from '@/config/env'
		import {operation ,person ,status ,plantTypes} from '../constant.js'
		import {cropQry} from '@/api/request.js'
    export default {
    	data(){
    		return {
    			formData: {
						cropName:'test',		//农产品名称
						status:'',		//种植状态
						operator:'',		//操作人
						operaDate:[],		//操作日期
						cropType:'',		//农产品类型
					},
					
					tableData:[{
						plantNo:'1' ,		//农产品编号
						plantName:'11',		//农产品名称
						plantType: '22',		//类型
						plantStatus:'44',		//最新种植状态
						operaDate: '33',		//时间
						personOpera:'55',		//操作人
					}],
					addOpera: false,
					showInfo: false,
					planttype: [],
					value: '',
					personOptions: [],
					reverse: true,
					activities: [{
						content: '活动按期开始',
						timestamp: '2018-04-15',
						person:'王一'
					}, {
						content: '通过审核',
						timestamp: '2018-04-13',
						person:'王一'
					}, {
						content: '创建成功',
						timestamp: '2018-04-11',
						person:'王一'
					}],
					addplantData:{
						operaType:'',//添加的操作类型
						operaDes:'',
						personOpera:''
					},
					person: '王一',
					status:[],
				}
    	},
    	components: {
    		headTop,
    	},
    	mounted(){
    		// this.initData();
    	},
    	methods: {
			},
			created() {
				this.operOptions = operation();
				this.personOptions = person();
				this.status = status();
				this.planttype = plantTypes();
				let obj = {
						"cropName":"白",
						"status":"播种",
						"operator":"李四",
						"minOperatorTime":20210514,
						"maxOperatorTime":20210518,
						"cropType":"蔬菜"
				}
				cropQry(obj).then(res => {
					console.log(res)
				})

			},
		}
</script>

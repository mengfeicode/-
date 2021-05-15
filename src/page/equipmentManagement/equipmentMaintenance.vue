<template>
    <div>
        <head-top></head-top>
        <el-row style="margin-top: 50px;">
					<el-col :span="20" :offset="2">
						<!-- 查询信息开始 -->
						<el-form :model="formData" ref="equipmentMaintenance" label-width="150px">
							<el-row>
								<el-col :span='8'>
									<el-form-item label="设备名称">
										<el-input v-model="formData.name"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span='8'>
									<el-form-item label="设备状态">
										<el-select v-model="formData.status" placeholder="请选择">
											<el-option v-for="item in operMerOptions" :key="item.value" :label="item.label" :value="item.value">
											</el-option>
										</el-select>
									</el-form-item>
								</el-col>
								<el-col :span='8'>
									<el-form-item label="操作人">
										<el-select v-model="formData.person" placeholder="请选择">
											<el-option v-for="item in personOptions" :key="item.value" :label="item.label" :value="item.value">
											</el-option>
										</el-select>
									</el-form-item>
								</el-col>
							</el-row>
							<el-row>
								<el-col :span='8'>
									<el-form-item label="操作日期">
										<el-date-picker type="date" placeholder="选择日期" v-model="formData.date" style="width: 100%;"></el-date-picker>
									</el-form-item>
								</el-col>
								<el-col :span='8'>
									<el-form-item class="button_submit">
										<el-button type="primary" @click="submitForm('formData')">查询</el-button>
									</el-form-item>
								</el-col>
							</el-row>
						</el-form>
						<!-- 查询信息结束 -->
						<!-- 展示信息开始 -->
						<el-table :data="tableData" style="margin-top:25px;" highlight-current-row>
    					<el-table-column prop="no" label="设备编号" align="center"></el-table-column>
    					<el-table-column prop="name" label="名称" align="center"></el-table-column>
							<el-table-column prop="type" label="类型"></el-table-column>
							<el-table-column prop="status" label="最新状态" align="center"></el-table-column>
							<el-table-column prop="date" label="时间" align="center"></el-table-column>
							<el-table-column prop="person" label="操作人" width="100" align="center"></el-table-column>
							<el-table-column fixed="right" label="设备管理" width="260" min-width="200" align="center">
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
									<el-form :model="addData" label-width="80px" align='left'>
										<el-form-item label="操作类型">
											<el-select v-model="addData.type" placeholder="请选择">
												<el-option v-for="item in operMerOptions" :key="item.value" :label="item.label" :value="item.value">
												</el-option>
											</el-select>
										</el-form-item>
										<el-form-item label="具体操作">
											<el-input type="textarea" v-model="addData.des"></el-input>
										</el-form-item>
										<el-form-item label="操作人">
											<el-select v-model="addData.person" placeholder="请选择">
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
		import {operMerOptions ,person } from '../constant.js'
    export default {
    	data(){
    		return {
    			formData: {
						name:'test',		//名称
						status:'',		//状态
						person:'',		//操作人
						date:'',		//操作日期
					},
					tableData:[{
						no:'1' ,		//编号
						name:'11',		//名称
						type: '22',		//类型
						status:'44',		//最新状态
						date: '33',		//时间
						person:'55',		//操作人
					}],
					addOpera: false,
					showInfo: false,
					operMerOptions: [],
					// value: '',
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
					addData:{
						type:'',//添加的操作类型
						des:'',
						person:''
					},
					operMerOptions:[]
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
				this.operMerOptions = operMerOptions();
				this.personOptions = person();
			},
		}
</script>

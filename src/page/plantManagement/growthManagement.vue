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
										<el-select v-model="formData.status" placeholder="请选择" clearable>
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
										<el-date-picker v-model="operaDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyyMMdd"></el-date-picker>
									</el-form-item>
								</el-col>
								<el-col :span='6'>
									<el-form-item label="农产品类型">
										<el-select v-model="formData.cropType" placeholder="请选择" clearable>
											<el-option v-for="item in planttype" :key="item.value" :label="item.label" :value="item.value">
											</el-option>
										</el-select>
									</el-form-item>
								</el-col>
								<el-col :span='4'>
									<el-form-item class="button_submit">
										<el-button type="primary" @click="submitForm()">查询</el-button>
									</el-form-item>
								</el-col>
							</el-row>
						</el-form>
						<!-- 查询信息结束 -->
						<!-- 展示信息开始 -->
						<el-table :data="tableData" style="margin-top:25px;" highlight-current-row>
    					<el-table-column prop="cropId" label="农产品编号" align="center"></el-table-column>
    					<el-table-column prop="cropName" label="名称" align="center"></el-table-column>
							<el-table-column prop="cropType" label="农产品类型"></el-table-column>
							<el-table-column prop="status" label="最新种植状态" align="center"></el-table-column>
							<el-table-column prop="operateTime" label="时间" align="center"></el-table-column>
							<el-table-column prop="operator" label="操作人" width="100" align="center"></el-table-column>
							<el-table-column fixed="right" label="生长周期管理" width="260" min-width="200" align="center">
								<template slot-scope="scope">
									<el-button @click="addButton(scope.row)" type="text" size="small">添加操作</el-button>
									<el-button @click="showDetail(scope.row)" type="text" size="small">显示详情</el-button>
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
											<el-select v-model="addplantData.status" placeholder="请选择">
												<el-option v-for="item in operOptions" :key="item.value" :label="item.label" :value="item.value">
												</el-option>
											</el-select>
										</el-form-item>
										<el-form-item label="具体操作">
											<el-input type="textarea" v-model="addplantData.operation"></el-input>
										</el-form-item>
										<el-form-item label="操作人">
											<el-select v-model="addplantData.operator" placeholder="请选择">
												<el-option v-for="item in personOptions" :key="item.value" :label="item.label" :value="item.value">
												</el-option>
											</el-select>
										</el-form-item>
									</el-form>
								</el-col>
							</el-row>
							<span slot="footer" class="dialog-footer">
								<el-button @click="addOpera = false">取 消</el-button>
								<el-button type="primary" @click="addOperaSubmit()">确 定</el-button>
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
									<el-timeline-item v-for="(activity, index) in activities" :key="index" :timestamp="activity.operateTime" placement="top">
										{{activity.status}}
										<el-card>
											<h4 style="margin:5px 0 10px 0">{{activity.operation}}</h4>
											<p>{{activity.operator}} 提交于 {{activity.operateTime | formatData}}</p>
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
		import {operation ,person ,plantTypes} from '../constant.js'
		import {cropQry ,plantCycleAdd ,plantCycleQryByCropId} from '@/api/request.js'
    export default {
    	data(){
    		return {
    			formData: {
						cropName:'',		//农产品名称
						status:'',		//种植状态
						operator:'',		//操作人
						minOperatorTime:'',		//操作日期
						maxOperatorTime:'',
						cropType:'',		//农产品类型
					},
					operaDate:[],
					tableData:[{
						cropId:'' ,		//农产品编号
						cropName:'',		//农产品名称
						cropType: '',		//类型
						status:'',		//最新种植状态
						operateTime: '',		//时间
						operator:'',		//操作人
					}],
					addOpera: false,
					showInfo: false,
					planttype: [],
					value: '',
					personOptions: [],
					reverse: true,
					activities: [],		//时间线
					addplantData:{		//添加操作
						status:'',//添加的操作类型
						operation:'',
						operator:''
					},
					person: '',
					status:[],
				}
    	},
    	components: {
    		headTop,
    	},
    	mounted(){
    		this.submitForm(this.formData);
    	},
    	methods: {
				//查询
				submitForm(){
					if(this.operaDate && this.operaDate.length != 0){
						this.formData.minOperatorTime = this.operaDate[0];
						this.formData.maxOperatorTime = this.operaDate[1];
					}
					cropQry(this.formData).then(res => {
						this.tableData = res.data;
					})
				},
				//点击添加操作页面
				addButton(row){
					this.addOpera = true;
					this.addplantData.cropId = row.cropId;
				},
				addOperaSubmit(){
					this.addOpera = false;
					plantCycleAdd(this.addplantData).then(res => {
						this.$message(res.msg);
					})
				},
				showDetail(row){
					this.showInfo = true;
					plantCycleQryByCropId(row.cropId).then(res => {
						this.activities = res.data;
						this.$message(res.msg);
					})
				}
			},
			filters: {
				formatData: function (value) {
					return value.substring(0,4) + '年' + value.substring(4,6) + '月' + value.substring(6) + '日'
				}
			},
			created() {
				this.operOptions = operation();
				this.personOptions = person();
				this.planttype = plantTypes();

			},
		}
</script>

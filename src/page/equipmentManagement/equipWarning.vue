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
							<el-table-column fixed="right" label="设备告警" width="260" min-width="200" align="center">
								<template slot-scope="scope">
									<el-button @click="showWarning = true" type="text" size="small">告警详情</el-button>
								</template>
							</el-table-column>
						</el-table>
						<!-- 展示信息结束 -->
						<!-- 弹出框开始 -->
						<el-dialog title="设备告警详情如下：" :visible.sync="showWarning"  width="50%" center>
							<el-row>
								<el-col :span="12" :offset="5">
									<el-form :model="warningData" label-width="150px" align='left'>
										<el-form-item label="设备名称">
											<el-input v-model="warningData.name"></el-input>
										</el-form-item>
										<el-form-item label="设备阈值（最低）">
											<el-input v-model="warningData.lowData"></el-input>
										</el-form-item>
										<el-form-item label="设备阈值（最高）">
											<el-input type="textarea" v-model="warningData.highData"></el-input>
										</el-form-item>
										<el-form-item label="告警详情">
											<el-input type="textarea" v-model="warningData.des"></el-input>
										</el-form-item>
									</el-form>
								</el-col>
							</el-row>
							<span slot="footer" class="dialog-footer">
								<el-button type="primary" @click="showWarning = false">确 定</el-button>
							</span>
						</el-dialog>
            <!-- 弹出框结束 -->
					</el-col>
  		</el-row>
    </div>
</template>

<script>
    import headTop from '@/components/headTop'
		import {operMerOptions} from '../constant.js'
    export default {
    	data(){
    		return {
    			formData: {
						name:'test',		//名称
						status:'',		//状态
					},
					tableData:[{
						no:'1' ,		//编号
						name:'11',		//农产品名称
						type: '22',		//类型
						status:'44',		//最新状态
						date: '33',		//时间
						person:'55',		//操作人
					}],
					showWarning: false,
					operMerOptions: [],
					warningData:{
						name:'1',		//名称
						des:'2',		//描述
						lowData:'3',		//低值
						highData:'4'		//高值
					},
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
			},
		}
</script>

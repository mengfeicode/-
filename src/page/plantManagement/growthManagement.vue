<template>
    <div>
        <head-top></head-top>
        <el-row style="margin-top: 50px;">
					<el-col :span="20" :offset="2">
						<!-- 查询信息开始 -->
						<el-form :model="formData" ref="growthManagement" label-width="110px">
							<el-row>
								<el-col :span='5'>
									<el-form-item label="农作物名称">
										<el-input v-model="formData.name"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span='5'>
									<el-form-item label="种植状态">
										<el-select v-model="plantStatus" placeholder="请选择">
											<el-option v-for="item in status" :key="item.value" :label="item.label" :value="item.value">
											</el-option>
										</el-select>
									</el-form-item>
								</el-col>
								<el-col :span='6'>
									<el-form-item label="负责人">
										<el-select v-model="person" placeholder="请选择">
											<el-option v-for="item in personOptions" :key="item.value" :label="item.label" :value="item.value">
											</el-option>
										</el-select>
									</el-form-item>
								</el-col>
								<el-col :span='8'>
									<el-form-item label="农作物分类序号" prop="name" label-width="150px">
										<el-input v-model="formData.name"></el-input>
									</el-form-item>
								</el-col>
							</el-row>
							<el-row>
								<el-form-item class="button_submit">
									<el-button type="primary" @click="submitForm('formData')">查询</el-button>
								</el-form-item>
							</el-row>
						</el-form>
						<!-- 查询信息结束 -->
						<!-- 展示信息开始 -->
						<el-table :data="tableData" style="width: 100%;margin-top:25px;" highlight-current-row>
							<el-table-column type="index" width="55"></el-table-column>
    					<el-table-column prop="name" label="名称"></el-table-column>
    					<el-table-column prop="name" label="编号"></el-table-column>
							<el-table-column prop="province" label="种植日期"></el-table-column>
							<el-table-column prop="city" label="种植状态"></el-table-column>
							<el-table-column prop="address" label="负责人"></el-table-column>
							<el-table-column fixed="right" label="添加操作" width="100">
								<template slot-scope="scope">
									<el-button @click="addOpera = true" type="text" size="small">添加操作</el-button>
								</template>
							</el-table-column>
							<el-table-column fixed="right" label="生长周期展示" width="100">
								<template slot-scope="scope">
									<el-button @click="showInfo = true" type="text" size="small">显示详情</el-button>
								</template>
							</el-table-column>
						</el-table>
						<!-- 展示信息结束 -->
						<!-- 添加操作弹出框开始 -->
						<el-dialog title="请添加对应的操作：" :visible.sync="addOpera"  width="50%" center>
								<el-select v-model="value" placeholder="请选择" style="width:100px;margin-bottom:20px;">
										<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
										</el-option>
									</el-select>
							<el-table :data="tableData" style="width: 100%" max-height="250" highlight-current-row>
								<el-table-column type="index" width="55"></el-table-column>
								<el-table-column prop="name" label="名称"></el-table-column>
								<el-table-column prop="name" label="编号"></el-table-column>
								<el-table-column prop="province" label="种植日期"></el-table-column>
								<el-table-column prop="city" label="种植状态"></el-table-column>
								<el-table-column prop="address" label="负责人"></el-table-column>
							</el-table>
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
								<el-timeline :reverse="reverse">
									<el-timeline-item
										v-for="(activity, index) in activities"
										:key="index"
										:timestamp="activity.timestamp">
										{{activity.content}}
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
    import {cityGuess, addPlant, searchplace, foodCategory} from '@/api/getData'
    import {baseUrl, baseImgPath} from '@/config/env'
    export default {
    	data(){
    		return {
    			formData: {
						name:'test'
					},
					tableData:[{
						date:'1' ,
						name:'11',
						province: '22',
						city: '33',
						address:'44'
					},{
						date:'1' ,
						name:'11',
						province: '22',
						city: '33',
						address:'44'
					},{
						date:'1' ,
						name:'11',
						province: '22',
						city: '33',
						address:'44'
					},{
						date:'1' ,
						name:'11',
						province: '22',
						city: '33',
						address:'44'
					},{
						date:'1' ,
						name:'11',
						province: '22',
						city: '33',
						address:'44'
					},{
						date:'1' ,
						name:'11',
						province: '22',
						city: '33',
						address:'44'
					}],
					baseUrl,
					baseImgPath,
					addOpera: false,
					showInfo: false,
					options: [{
						value: '01',
						label: '除草'
					}, {
						value: '02',
						label: '施肥'
					}, {
						value: '03',
						label: '施药'
					}, {
						value: '04',
						label: '锄地'
					}, {
						value: '05',
						label: '修剪'
					}],
					value: '',
					personOptions: [{
						value: '01',
						label: '王一'
					},{
						value: '02',
						label: '李二'
					},{
						value: '03',
						label: '张三'
					}],
					person: '王一',
					plantStatus:'正常生长',
					status:[{
						value: '01',
						label: '正常生长'
					},{
						value: '02',
						label: '已收割'
					}],
					reverse: true,
        activities: [{
          content: '活动按期开始',
          timestamp: '2018-04-15'
        }, {
          content: '通过审核',
          timestamp: '2018-04-13'
        }, {
          content: '创建成功',
          timestamp: '2018-04-11'
        }]
				}					
    	},
    	components: {
    		headTop,
    	},
    	mounted(){
    		// this.initData();
    	},
    	methods: {
			}
		}
</script>
